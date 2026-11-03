// Run against a disposable instance with a standard user and an accessible fixture contact.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
    const base = process.env.NEXTCLOUD_TEST_URL || 'http://127.0.0.1:8080';
    const user = process.env.NEXTCLOUD_TEST_USER;
    const password = process.env.NEXTCLOUD_TEST_PASSWORD;
    const email = process.env.NEXTCLOUD_TEST_CONTACT_EMAIL;
    assert.ok(user && password && email, 'Set explicit test user/password and fixture contact email.');
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await context.route('**/personal-mail/send', route => route.abort());
        await context.route('**/sendFacturXToIopole', route => route.abort());
        await page.goto(`${base}/index.php/apps/gestion/config`);
        await page.locator('[name=user]').fill(user);
        await page.locator('[name=password]').fill(password);
        await page.getByRole('button', { name: 'Log in', exact: true }).click();
        await page.waitForURL('**/apps/gestion/**');
        const profile = await page.evaluate(async () => (await (await fetch('/ocs/v2.php/cloud/user?format=json', { headers: { 'OCS-APIRequest': 'true', requesttoken: OC.requestToken } })).json()).ocs.data);
        assert.ok(Array.isArray(profile.groups) && !profile.groups.includes('admin'), 'This regression must run as a non-administrator.');
        const api = (path, data, method = 'POST', invalidToken = false) => page.evaluate(async ({ path, data, method, invalidToken }) => {
            const response = await fetch(OC.generateUrl('/apps/gestion' + path), {
                method, headers: { 'Content-Type': 'application/json', requesttoken: invalidToken ? 'invalid-test-token' : OC.requestToken },
                ...(data ? { body: JSON.stringify(data) } : {}),
            });
            return { status: response.status, data: await response.json() };
        }, { path, data, method, invalidToken });
        const contacts = await api('/client/contacts', null, 'GET');
        assert.equal(contacts.status, 200);
        const contact = contacts.data.find(row => row.mail === email);
        assert.ok(contact, 'The private fixture contact must be accessible.');
        await api('/isconfig', null, 'GET');
        await page.goto(`${base}/index.php/apps/gestion/`);
        await page.locator('#importContact').click();
        const dialog = page.locator('.gestion-contact-dialog[open]');
        await dialog.getByRole('searchbox').fill(email);
        await dialog.locator('.gestion-contact-list-item').filter({ hasText: email }).click();
        const imported = page.waitForResponse(response => response.url().endsWith('/client/import-contact') && response.request().method() === 'POST');
        await dialog.getByRole('button', { name: 'Import customer', exact: true }).click();
        assert.equal((await imported).status(), 200);
        await page.waitForFunction(email => document.querySelector('table.tabledt')?.textContent.includes(email), email);
        const clients = JSON.parse((await api('/getClients', null, 'PROPFIND')).data);
        assert.equal(clients.filter(row => row.mail === email).length, 1);
        const duplicate = await api('/client/import-contact', { contactId: contact.id });
        assert.equal(duplicate.status, 409);
        assert.equal((await api('/client/import-contact', { contactId: 'inaccessible-contact' })).status, 404);
        assert.equal((await api('/client/import-contact', { contactId: contact.id }, 'POST', true)).status, 412);
        assert.equal((await api('/history', null, 'GET')).status, 200);
        assert.equal((await api('/personal-mail/status', null, 'GET')).status, 200);
        const backup = await api('/backup', {});
        assert.equal(backup.status, 200);
        assert.ok(JSON.parse(backup.data.backup).tables.configuration.every(company => company.id_nextcloud === user));
        assert.equal((await api('/restore', { content: backup.data.backup, confirm: false })).status, 200);
        const anonymous = await browser.newContext();
        const denied = await anonymous.request.get(`${base}/index.php/apps/gestion/client/contacts`, { maxRedirects: 0, headers: { Accept: 'application/json' } });
        assert.ok([401, 403, 302, 303].includes(denied.status()));
        await anonymous.close();
        assert.deepEqual(errors, []);
        console.log('Non-admin browser checks passed: real private contact selected and imported, duplicate/inaccessible contact rejected, CSRF and login required, history/backup/restore preview/Mail status accessible. No delivery.');
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exit(1); });
