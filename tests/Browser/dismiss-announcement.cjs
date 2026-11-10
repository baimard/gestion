// Unrelated UI scenarios dismiss the real announcement before exercising their feature.
module.exports = async function dismissAnnouncement(page) {
    await page.waitForLoadState('domcontentloaded');
    const dialog = page.locator('#modalConfig');
    if (await dialog.count() && await dialog.getAttribute('data-announcement-version')) {
        await dialog.locator('.modalClose').click();
        await dialog.waitFor({state: 'hidden'});
    }
};
