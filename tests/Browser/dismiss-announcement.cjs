// Unrelated UI scenarios dismiss the real announcement before exercising their feature.
module.exports = async function dismissAnnouncement(page) {
    await page.waitForLoadState('domcontentloaded');
    const dialog = page.locator('#gestion-announcement');
    if (await dialog.count()) {
        await dialog.locator('[data-dismiss-announcement]').click();
        await dialog.waitFor({state: 'detached'});
    }
};
