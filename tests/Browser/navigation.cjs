const dismissAnnouncement = require('./dismiss-announcement.cjs');
// Opt-in read-only navigation checks on a disposable Nextcloud instance.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
    const base = process.env.NEXTCLOUD_TEST_URL || 'http://127.0.0.1:8080';
    assert.ok(process.env.NEXTCLOUD_TEST_USER && process.env.NEXTCLOUD_TEST_PASSWORD, 'Set disposable-instance credentials.');
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    try {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${base}/index.php/apps/gestion/config`);
        await page.locator('[name=user]').fill(process.env.NEXTCLOUD_TEST_USER);
        await page.locator('[name=password]').fill(process.env.NEXTCLOUD_TEST_PASSWORD);
        await page.locator('button[type=submit]').click();
        await page.waitForURL('**/apps/gestion/**');
        await dismissAnnouncement(page);
        const toggle = page.locator('.gestion-navigation-toggle');
        const navigation = page.locator('#app-navigation');
        const close = page.locator('.gestion-navigation-close');
        const ready = () => page.waitForFunction(() => document.querySelector('.gestion-navigation-toggle')?.dataset.navigationToggleInitialized === 'true');
        const assertClosed = async () => {
            assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
            assert.equal(await navigation.isVisible(), false);
            assert.equal(await page.locator('#app-content').evaluate(el => el.inert), false);
            assert.equal(await page.locator('.gestion-navigation-backdrop').isVisible(), false);
        };
        const open = async () => {
            await toggle.tap();
            const rect = await navigation.boundingBox();
            const viewport = page.viewportSize();
            assert.ok(rect && rect.x >= 0 && rect.x + rect.width <= viewport.width && rect.y >= 0 && rect.height > 100, JSON.stringify(rect));
            assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
            assert.equal(await page.locator('#app-content').evaluate(el => el.inert), true);
            assert.equal(await close.evaluate(el => document.activeElement === el), true);
        };
        await ready();
        for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }, { width: 768, height: 1024 }, { width: 1023, height: 768 }]) {
            await page.setViewportSize(viewport);
            await assertClosed();
            await open();
            await close.tap();
            await assertClosed();
            assert.equal(await toggle.evaluate(el => document.activeElement === el), true);
            await open();
            await page.touchscreen.tap(viewport.width - 8, 90);
            await assertClosed();
            await open();
            await page.keyboard.press('Escape');
            await assertClosed();
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        }
        await page.setViewportSize({ width: 390, height: 844 });
        // Click real links: a CSS class alone does not prove a menu works.
        for (const suffix of ['/devis', '/facture', '/produit', '/statistique', '/legalnotice', '/config']) {
            await open();
            const link = navigation.locator(`a[href$="${suffix}"]`).first();
            const url = await link.getAttribute('href');
            await Promise.all([page.waitForEvent('domcontentloaded'), link.tap()]);
            assert.equal(new URL(page.url()).pathname, new URL(url, base).pathname);
            await ready();
            await assertClosed();
        }
        await open();
        await navigation.locator('#about').tap();
        await page.locator('dialog[open], .modal[style*="display: block"]').first().waitFor();
        await assertClosed();
        await page.keyboard.press('Escape');
        await page.reload();
        await ready();
        await open();
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.waitForFunction(() => !document.getElementById('app-content').inert);
        assert.equal(await navigation.isVisible(), true);
        assert.equal(await page.locator('.gestion-navigation-backdrop').isVisible(), false);
        await toggle.click();
        assert.equal(await navigation.isVisible(), false);
        await toggle.click();
        assert.equal(await navigation.isVisible(), true);
        await page.setViewportSize({ width: 390, height: 844 });
        await assertClosed();
        assert.deepEqual(errors, []);
        console.log('Navigation passed: visible panel, touch links, scrolling, close button, backdrop, Escape/focus, background isolation, five mobile sizes and desktop transitions.');
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exit(1); });
