// Opt-in on a disposable Nextcloud instance, with two ordinary test accounts.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

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
    const centered = async page => {
        const b = await page.locator('#gestion-announcement').evaluate(el => {
            const r = el.getBoundingClientRect();
            return {x:r.x,y:r.y,w:r.width,h:r.height,vw:innerWidth,vh:innerHeight,overflow:el.scrollWidth > el.clientWidth};
        });
        assert.ok(Math.abs(b.x+b.w/2-b.vw/2)<2 && Math.abs(b.y+b.h/2-b.vh/2)<2, JSON.stringify(b));
        assert.equal(b.overflow,false);
    };
    try {
        const aContext = await browser.newContext({viewport:{width:1440,height:900}});
        const a = await login(aContext, alice);
        await a.locator('#gestion-announcement[open]').waitFor();
        assert.match(await a.locator('#gestion-announcement').innerText(), /Qonto/);
        assert.match(await a.locator('#gestion-announcement a').getAttribute('href'), /^mailto:contact@cybercorp\.fr\?/);
        await centered(a);
        for (const viewport of [{width:390,height:844},{width:844,height:390},{width:320,height:568}]) {
            await a.setViewportSize(viewport);
            await centered(a);
        }
        await a.reload();
        await a.locator('#gestion-announcement[open]').waitFor();
        if (process.env.NEXTCLOUD_TEST_SCREENSHOT) await a.screenshot({path:process.env.NEXTCLOUD_TEST_SCREENSHOT});
        assert.equal((await api(a, '/announcements/acknowledge', {version:'3.4.9'})).status,400);
        assert.equal((await api(a, '/announcements/acknowledge', {version:'3.4.8'},false)).status,412);
        const company = await a.locator('#CurrentCompany-select').inputValue();
        const share = await api(a, '/addShareUser', {email:bobEmail});
        assert.equal(share.data.status,'success',JSON.stringify(share));
        await a.route('**/announcements/acknowledge', route => route.fulfill({status:503,contentType:'application/json',body:'{}'}));
        await a.locator('[data-dismiss-announcement]').click();
        await a.waitForFunction(() => !document.querySelector('[data-dismiss-announcement]').disabled);
        assert.ok(await a.locator('#gestion-announcement[open]').isVisible());
        await a.unroute('**/announcements/acknowledge');
        await a.locator('[data-dismiss-announcement]').click();
        await a.locator('#gestion-announcement').waitFor({state:'detached'});
        await a.reload();
        assert.equal(await a.locator('#gestion-announcement').count(),0);
        const bContext = await browser.newContext({viewport:{width:390,height:844}});
        const b = await login(bContext,bob);
        await b.locator('#gestion-announcement[open]').waitFor();
        assert.equal(await b.locator('#CurrentCompany-select').inputValue(),company, 'Both users access the same company');
        await b.keyboard.press('Escape');
        await b.locator('#gestion-announcement').waitFor({state:'detached'});
        await b.reload();
        assert.equal(await b.locator('#gestion-announcement').count(),0);
        const fresh = await browser.newContext();
        const again = await login(fresh,alice);
        assert.equal(await again.locator('#gestion-announcement').count(),0,'Acknowledgement survives a new browser session');
        const anonymous = await browser.newContext();
        const unauthenticated = await anonymous.request.post(base+'/index.php/apps/gestion/announcements/acknowledge',{data:{version:'3.4.8'},maxRedirects:0});
        assert.ok([303,401,412].includes(unauthenticated.status()),String(unauthenticated.status()));
        assert.equal((await api(a,'/deleteCompany',{},true,'DELETE')).status,200);
        assert.deepEqual(errors,[]);
        console.log('Announcement checks passed: two ordinary users sharing a company, independent acknowledgement, reload without dismissal, persistence, invalid version, CSRF/login required, retry after failure, Close/Escape, desktop/mobile centering. No email sent.');
    } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
