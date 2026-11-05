// Opt-in: creates fictional data only in a dedicated disposable store-demo account.
const { chromium, request } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
    const user = process.env.NEXTCLOUD_TEST_USER;
    const password = process.env.NEXTCLOUD_TEST_PASSWORD;
    const base = (process.env.NEXTCLOUD_BASE_URL || 'http://127.0.0.1:8080').replace(/\/$/, '');
    assert.ok(user?.startsWith('gestion-store-demo-') && password, 'Use a new disposable gestion-store-demo-* account and explicit credentials.');
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    try {
        const page = await browser.newPage();
        await page.goto(base + '/index.php/apps/gestion/config');
        await page.locator('[name=user]').fill(user);
        await page.locator('[name=password]').fill(password);
        await page.locator('button[type=submit]').click();
        await page.waitForURL('**/apps/gestion/**');
        const api = (path, data, method = 'POST') => page.evaluate(async ({ path, data, method }) => {
            const response = await fetch(OC.generateUrl('/apps/gestion' + path), {
                method, headers: { 'Content-Type': 'application/json', requesttoken: OC.requestToken },
                ...(data ? { body: JSON.stringify(data) } : {}),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(path + ': ' + response.status + ' ' + JSON.stringify(result));
            return result;
        }, { path, data, method });
        const read = async path => JSON.parse(await api(path, null, 'PROPFIND'));
        const update = async (table, id, values) => {
            for (const [column, data] of Object.entries(values)) await api('/update', { table, id, column, data });
        };
        await api('/createCompany', null, 'PUT');
        await page.reload();
        const company = await page.locator('#CurrentCompany-select').evaluate(el => Math.max(...[...el.options].map(o => Number(o.value))));
        await api('/updateSession', { companyID: String(company) });
        await page.reload();
        await api('/isconfig', null, 'GET');
        const year = new Date().getUTCFullYear();
        for (const [column, data] of Object.entries({ entreprise: 'Atelier Horizon', prenom: 'Alex', nom: 'Morgan', adresse: '12 rue des Ateliers', zip_code: '33000', city_name: 'Bordeaux', mail: 'hello@atelier-horizon.example', telephone: '+33 0 00 00 00 00', legal_one: 'Demo company — fictional data', legal_two: '', vat_number: '', mentions_default: 'Payment by bank transfer within 30 days.', facture_prefixe: `INV-${year}-`, auto_invoice_number: '1', logo_width: '96', logo_height: '96' })) {
            await api('/updateConfiguration', { column, data });
        }
        const clients = [];
        const names = [['Northwood Studio', 'Emma', 'Reed'], ['Bluebird Consulting', 'Noah', 'Martin'], ['Studio Juniper', 'Mia', 'Laurent'], ['Lumen Atelier', 'Leo', 'Bernard'], ['Oak & Co', 'Alice', 'Moreau'], ['Riverstone Agency', 'Oscar', 'Petit']];
        for (const [entreprise, prenom, nom] of names) {
            await api('/client/insert', {});
            const id = Math.max(...(await read('/getClients')).map(r => Number(r.id)));
            await update('client', id, { entreprise, prenom, nom, legal_one: 'Demo customer', adresse: '24 avenue des Jardins', zip_code: '44000', city_name: 'Nantes', country_code: 'FR', mail: prenom.toLowerCase() + '@customer.example', telephone: '+33 0 00 00 00 00' });
            clients.push(id);
        }
        const products = [];
        for (const [reference, description, price] of [
            ['WEB-DESIGN', 'Website design — visual identity and responsive layouts', '480'],
            ['WEB-DEV', 'Website development — accessible pages and integrations', '650'],
            ['HOSTING', 'Managed hosting — daily backups, monitoring and updates', '59'],
            ['CONSULTING', 'Consulting and project planning — hourly service', '85'],
            ['MAINTENANCE', 'Monthly website maintenance and technical support', '120'],
            ['TRAINING', 'Team training — managing your website with confidence', '260'],
        ]) {
            await api('/produit/insert', {});
            const id = Math.max(...(await read('/getProduits')).map(r => Number(r.id)));
            await update('produit', id, { reference, description, prix_unitaire: price, vat: '20', vat_category: 'S' });
            products.push(id);
        }
        const invoices = [];
        for (let i = 0; i < 25; i++) {
            await api('/devis/insert', {});
            const quote = Math.max(...(await read('/getDevis')).map(r => Number(r.id)));
            const date = `${year - (i < 12 ? 1 : 0)}-${String(i % 12 + 1).padStart(2, '0')}-15`;
            await update('devis', quote, { id_client: String(clients[i % clients.length]), num: `QUO-${date.slice(0, 4)}-${String(i + 1).padStart(3, '0')}`, date, version: '1.0', delay: '30', comment: 'A tailored digital experience for your business.', mentions: 'Ready to send' });
            for (let j = 0; j < 2; j++) {
                await api('/insertProduitDevis', { id: String(quote) });
                const lines = JSON.parse(await api('/getProduitsById', { numdevis: String(quote) }));
                const id = Math.max(...lines.map(r => Number(r.pdid)));
                await update('produit_devis', id, { produit_id: String(products[(i + j) % products.length]), quantite: String(j + 1), discount: j ? '5' : '0' });
            }
            if (i < 24) {
                const invoice = (await api('/facture/insert', { devisId: quote })).id;
                await update('facture', invoice, { date_paiement: date, type_paiement: '58', status_paiement: i % 5 ? '1' : '0' });
                invoices.push(invoice);
            }
        }
        for (const id of invoices.slice(0, 2)) await api('/documents/lock', { table: 'facture', id: Number(id) });
        const logo = await page.evaluate(() => {
            const canvas = document.createElement('canvas'); canvas.width = 192; canvas.height = 192;
            const ctx = canvas.getContext('2d'); ctx.fillStyle = '#e7f3fc'; ctx.fillRect(0, 0, 192, 192);
            ctx.fillStyle = '#00679e'; ctx.font = 'bold 100px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('H', 96, 132);
            return canvas.toDataURL('image/png').split(',')[1];
        });
        const dav = await request.newContext({ httpCredentials: { username: user, password } });
        try {
            const folder = base + '/remote.php/dav/files/' + encodeURIComponent(user) + '/.gestion/';
            assert.ok([201, 405].includes((await dav.fetch(folder, { method: 'MKCOL' })).status()));
            assert.ok((await dav.put(folder + company + 'logo.png', { data: Buffer.from(logo, 'base64'), headers: { 'Content-Type': 'image/png' } })).ok());
        } finally { await dav.dispose(); }
        console.log(`NEXTCLOUD_TEST_COMPANY_ID=${company}`);
        console.log('Fictional store demo ready: 6 customers, 6 products, 25 quotes, 24 invoices, two years of statistics. No external delivery.');
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
