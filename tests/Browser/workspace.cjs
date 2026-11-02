const {chromium}=require('playwright');const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
 const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8080/index.php/apps/gestion/config');
 if(page.url().includes('login')){await page.locator('input[name=user]').fill(process.env.NEXTCLOUD_TEST_USER);await page.locator('input[name=password]').fill(process.env.NEXTCLOUD_TEST_PASSWORD);await page.getByRole('button',{name:'Log in',exact:true}).click();await page.waitForURL('**/apps/gestion/**');}
 await page.waitForTimeout(600);
 await page.locator('input[name=price_decimals]').fill('4');await page.locator('#gestion-precision button').click();
 await page.waitForTimeout(400);await page.reload();await page.waitForTimeout(500);assert.equal(await page.locator('input[name=price_decimals]').inputValue(),'4');
 await page.locator('[data-open-history]').click();await page.locator('dialog[open] .gestion-history li').first().waitFor();assert.ok((await page.locator('dialog[open]').innerText()).includes(process.env.NEXTCLOUD_TEST_USER));
 await page.locator('dialog[open]').getByRole('button',{name:'Close',exact:true}).click();
 const dlPromise=page.waitForEvent('download');await page.locator('[data-backup]').click();const download=await dlPromise;const content=fs.readFileSync(await download.path(),'utf8');const backup=JSON.parse(content);assert.equal(backup.format,'gestion-backup');assert.ok(backup.tables.configuration.length>0);
 await page.locator('[data-restore-file]').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(content)});await page.getByRole('button',{name:'Restore into new companies'}).waitFor();
 const preview=await page.locator('dialog[open]').innerText();assert.match(preview,/New companies will be created/);await page.locator('dialog[open]').getByRole('button',{name:'Close',exact:true}).click();
 await page.locator('[data-restore-file]').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('===client===\n1;2')});await page.waitForTimeout(400);assert.equal(await page.locator('dialog[open]').count(),0);
 await page.locator('input[name=price_decimals]').fill('2');await page.locator('#gestion-precision button').click();await page.waitForTimeout(300);
 await page.setViewportSize({width:390,height:844});await page.locator('.gestion-navigation-toggle').click();assert.ok(await page.locator('#app').evaluate(el=>el.classList.contains('gestion-mobile-navigation-open')));await page.keyboard.press('Escape');assert.equal(await page.locator('#app').evaluate(el=>el.classList.contains('gestion-mobile-navigation-open')),false);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
 await page.goto('http://127.0.0.1:8080/index.php/apps/gestion/');await page.waitForTimeout(400);if(page.url().endsWith('/config')) {await page.goto('http://127.0.0.1:8080/index.php/apps/gestion/');await page.waitForTimeout(400);}await page.locator('#importContact').click();await page.waitForTimeout(400);
 assert.deepEqual(errors,[]);console.log('Browser checks passed: decimal persistence, actor history, real backup download, restore preview/cancel, legacy format rejection, mobile navigation/Escape, viewport overflow, contact dialog.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
