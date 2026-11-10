const dismissAnnouncement = require('./dismiss-announcement.cjs');
// Opt-in against a disposable Nextcloud instance after documents.cjs created its fixture.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
    const base = process.env.NEXTCLOUD_TEST_URL || 'http://127.0.0.1:8080';
    const fixture = JSON.parse(fs.readFileSync(process.env.NEXTCLOUD_TEST_FIXTURE || '/tmp/gestion-e2e-fixture.json'));
    assert.ok(process.env.NEXTCLOUD_TEST_USER && process.env.NEXTCLOUD_TEST_PASSWORD, 'Set explicit disposable-instance credentials.');
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await context.route('**/personal-mail/send', route => route.abort());
        await context.route('**/sendFacturXToIopole', route => route.abort());
        await page.goto(`${base}/index.php/apps/gestion/config`);
        await page.locator('[name=user]').fill(process.env.NEXTCLOUD_TEST_USER);
        await page.locator('[name=password]').fill(process.env.NEXTCLOUD_TEST_PASSWORD);
        await page.getByRole('button', { name: 'Log in', exact: true }).click();
        await page.waitForURL('**/apps/gestion/**');
        await dismissAnnouncement(page);
        const api = (path, data, method = 'POST') => page.evaluate(async ({ path, data, method }) => {
            const response = await fetch(OC.generateUrl('/apps/gestion' + path), {
                method, headers: { 'Content-Type': 'application/json', requesttoken: OC.requestToken },
                ...(data ? { body: JSON.stringify(data) } : {}),
            });
            return { status: response.status, text: await response.text() };
        }, { path, data, method });
        assert.equal((await api('/updateSession', { companyID: String(fixture.company) })).status, 200);
        const config = await api('/getConfiguration', null, 'PROPFIND');
        assert.equal(config.status, 200);
        assert.ok(!config.text.includes('einvoice_provider_config'));
        const provider = JSON.parse((await api('/einvoice/provider', null, 'GET')).text).configuration;
        assert.ok(!Object.hasOwn(provider.credentials, 'client_secret'));
        const payload = '<img data-security-fixture src=x onerror="alert(1)">';
        const poison = async route => {
            const response = await route.fetch();
            const rows = JSON.parse(await response.json());
            for (const row of rows) for (const field of ['entreprise', 'nom', 'prenom', 'adresse', 'mail', 'reference', 'description', 'comment']) if (field in row) row[field] = payload;
            await route.fulfill({ response, json: JSON.stringify(rows) });
        };
        await context.route('**/getClients', poison);
        await page.goto(`${base}/index.php/apps/gestion/`);
        await page.waitForFunction(() => document.querySelector('#clientDT')?.textContent.includes('data-security-fixture') || document.querySelector('table')?.textContent.includes('data-security-fixture'));
        assert.equal(await page.locator('img[data-security-fixture]').count(), 0);
        await context.route('**/clientbyiddevis', poison);
        await context.route('**/getProduitsById', poison);
        await page.goto(`${base}/index.php/apps/gestion/devis/${fixture.quote}/show`);
        await page.waitForFunction(() => document.documentElement.dataset.gestionDocumentReady === 'true');
        assert.equal(await page.locator('img[data-security-fixture]').count(), 0);
        assert.match(await page.locator('#entreprise').textContent(), /<img/);
        assert.match(await page.locator('#produits').textContent(), /<img/);
        const html = await page.locator('#PDFcontent').evaluate(element => {
            const clone = element.cloneNode(true);
            clone.querySelectorAll('[data-html2canvas-ignore]').forEach(node => node.remove());
            const logo = document.createElement('img');
            logo.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aD1sAAAAASUVORK5CYII=';
            clone.appendChild(logo);
            return clone.outerHTML;
        });
        const folder = await page.locator('#theFolder').inputValue();
        const pdf = await api('/generatePDF', { html, name: 'security-fixture.pdf', folder: folder + '/security-check/' });
        assert.equal(pdf.status, 200, pdf.text.slice(0, 500));
        assert.ok(pdf.text.startsWith('%PDF-'));
        for (const src of ['file:///etc/passwd', 'https://example.test/image.png', 'http://127.0.0.1/private']) {
            const rejected = await api('/generatePDF', { html: `<img src="${src}">`, name: 'blocked.pdf', folder });
            assert.equal(rejected.status, 400);
        }
        assert.deepEqual(errors, []);
        console.log('Security browser checks passed: stored text stays text, configuration redacts secrets, real PDF with embedded logo succeeds, external/local PDF resources rejected. No mail or Iopole delivery.');
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exit(1); });
