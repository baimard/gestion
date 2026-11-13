// Opt-in on a disposable Nextcloud instance, with two ordinary test accounts.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const french = require('../../l10n/fr.json').translations;

(async () => {
    const base = process.env.NEXTCLOUD_TEST_URL || 'http://127.0.0.1:8080';
    const alice = process.env.NEXTCLOUD_TEST_USER;
    const bob = process.env.NEXTCLOUD_SECOND_TEST_USER;
    const password = process.env.NEXTCLOUD_TEST_PASSWORD;
    const bobEmail = process.env.NEXTCLOUD_SECOND_TEST_EMAIL;
    assert.ok(alice && bob && password && bobEmail, 'Provide two fresh disposable accounts, their shared test password and the second account email.');
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    const errors = [];
    const login = async (context, user) => {
        const page = await context.newPage();
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(base + '/index.php/apps/gestion/config');
        await page.locator('[name=user]').fill(user);
        await page.locator('[name=password]').fill(password);
        await page.locator('button[type=submit]').click();
        await page.waitForURL('**/apps/gestion/**');
        return page;
    };
    const api = (page, path, data, token = true, method = 'POST') => page.evaluate(async ({path, data, token, method}) => {
        const response = await fetch(OC.generateUrl('/apps/gestion' + path), {
            method, headers: {'Content-Type': 'application/json', ...(token ? {requesttoken: OC.requestToken} : {})},
            body: JSON.stringify(data),
        });
        return {status: response.status, data: await response.json().catch(() => null)};
    }, {path, data, token, method});
    const modalFits = async page => {
        const b = await page.locator('#modalConfig .modal-content').evaluate(el => {
            const r = el.getBoundingClientRect();
            return {x:r.x,y:r.y,w:r.width,h:r.height,vw:innerWidth,vh:innerHeight,overflow:el.scrollWidth > el.clientWidth};
        });
        assert.ok(Math.abs(b.x+b.w/2-b.vw/2)<2 && b.x >= 0 && b.x+b.w <= b.vw+1, JSON.stringify(b));
        assert.equal(b.overflow,false);
    };
    try {
        const aContext = await browser.newContext({viewport:{width:1440,height:900}});
        const a = await login(aContext, alice);
        await a.locator('#modalConfig').waitFor();
        assert.match(await a.locator('#gestion-announcement').innerText(), /Qonto/);
        assert.match(await a.locator('#gestion-announcement').innerText(), /France/);
        assert.equal(await a.locator('dialog#gestion-announcement').count(),0);
        assert.equal(await a.locator('#modalConfig #gestion-announcement').count(),1);
        assert.match(await a.locator('#modalConfig h2').first().innerText(), /GESTION.*3\.4\.8/);
        assert.ok((await a.locator('#gestion-announcement').innerText()).includes(french['Beta testing is open only to users based in France.']));
        assert.match(await a.locator('#gestion-announcement a').getAttribute('href'), /^mailto:contact@cybercorp\.fr\?/);
        await modalFits(a);
        await a.locator('#modalConfig .modalClose').focus();
        await a.keyboard.press('Shift+Tab');
        assert.equal(await a.evaluate(() => document.activeElement.closest('.modal')?.id),'modalConfig');
        await a.keyboard.press('Tab');
        assert.equal(await a.evaluate(() => document.activeElement.classList.contains('modalClose')),true);
        for (const viewport of [{width:390,height:844},{width:844,height:390},{width:320,height:568}]) {
            await a.setViewportSize(viewport);
            await modalFits(a);
        }
        await a.reload();
        await a.locator('#modalConfig').waitFor();
        if (process.env.NEXTCLOUD_TEST_SCREENSHOT) await a.screenshot({path:process.env.NEXTCLOUD_TEST_SCREENSHOT});
        assert.equal((await api(a, '/announcements/acknowledge', {version:'3.4.9'})).status,400);
        assert.equal((await api(a, '/announcements/acknowledge', {version:'3.4.8'},false)).status,412);
        const company = await a.locator('#CurrentCompany-select').inputValue();
        const share = await api(a, '/addShareUser', {email:bobEmail});
        assert.equal(share.data.status,'success',JSON.stringify(share));
        await a.route('**/announcements/acknowledge', route => route.fulfill({status:503,contentType:'application/json',body:'{}'}));
        await a.locator('#modalConfig .modalClose').click();
        await a.waitForFunction(() => !document.querySelector('#modalConfig').dataset.acknowledging);
        assert.ok(await a.locator('#modalConfig').isVisible());
        await a.unroute('**/announcements/acknowledge');
        await a.locator('#modalConfig .modalClose').click();
        await a.locator('#modalConfig').waitFor({state:'hidden'});
        await a.reload();
        assert.equal(await a.locator('#modalConfig').isVisible(),false);
        await a.setViewportSize({width:1440,height:900});
        await a.locator('#about').click();
        await a.locator('#modalConfig').waitFor({state:'visible'});
        assert.match(await a.locator('#gestion-announcement').innerText(), /France/);
        assert.equal(await a.locator('#modalConfig').getAttribute('data-announcement-version'),'');
        await a.keyboard.press('Escape');
        await a.locator('#modalConfig').waitFor({state:'hidden'});
        await a.locator('#HelpSection').click();
        await a.locator('#ConfigurationHelp').waitFor({state:'visible'});
        await a.locator('#ConfigurationHelp .modalClose').click();
        await a.locator('#ConfigurationHelp').waitFor({state:'hidden'});
        const bContext = await browser.newContext({viewport:{width:390,height:844}});
        const b = await login(bContext,bob);
        await b.locator('#modalConfig').waitFor();
        assert.match(await b.locator('#gestion-announcement').innerText(), /Beta testing is open only to users based in France\./);
        assert.equal((await api(b,'/updateSession',{companyID:String(company)})).status,200);
        await b.reload();
        await b.locator('#modalConfig').waitFor();
        assert.equal(await b.locator('#CurrentCompany-select').inputValue(),company, 'Both users access the same company');
        await b.keyboard.press('Escape');
        await b.locator('#modalConfig').waitFor({state:'hidden'});
        await b.reload();
        assert.equal(await b.locator('#modalConfig').isVisible(),false);
        const fresh = await browser.newContext();
        const again = await login(fresh,alice);
        assert.equal(await again.locator('#modalConfig').isVisible(),false,'Acknowledgement survives a new browser session');
        const anonymous = await browser.newContext();
        const unauthenticated = await anonymous.request.post(base+'/index.php/apps/gestion/announcements/acknowledge',{data:{version:'3.4.8'},maxRedirects:0});
        assert.ok([303,401,412].includes(unauthenticated.status()),String(unauthenticated.status()));
        assert.equal((await api(a,'/deleteCompany',{},true,'DELETE')).status,200);
        assert.deepEqual(errors,[]);
        console.log('Announcement checks passed: two ordinary users sharing a company, independent acknowledgement, reload without dismissal, persistence, invalid version, CSRF/login required, retry after failure, Close/Escape, same release modal, France notice, About reopening, desktop/mobile layout. No email sent.');
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
