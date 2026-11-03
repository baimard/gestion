const {chromium}=require('playwright');const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{
const fixture=JSON.parse(fs.readFileSync(process.env.NEXTCLOUD_TEST_FIXTURE || '/tmp/gestion-e2e-fixture.json'));
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});const context=await browser.newContext({viewport:{width:1400,height:1000}});const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));
let mailRequests=0,iopoleRequests=0;
await context.route('**/personal-mail/status',r=>r.fulfill({json:{available:true,account:{address:'sender@example.test'}}}));
// Delivery endpoints are intercepted: these tests never send mail or contact Iopole.
await context.route('**/personal-mail/send',r=>{mailRequests++;return r.fulfill({status:400,json:{message:'Simulated delivery failure.',documentLocked:true}})});
await context.route('**/sendFacturXToIopole',r=>{iopoleRequests++;return r.fulfill({status:400,json:{message:'Simulated platform failure.',documentLocked:true}})});
await page.goto('http://127.0.0.1:8080/index.php/apps/gestion/config');if(page.url().includes('login')){await page.locator('[name=user]').fill(process.env.NEXTCLOUD_TEST_USER);await page.locator('[name=password]').fill(process.env.NEXTCLOUD_TEST_PASSWORD);await page.getByRole('button',{name:'Log in',exact:true}).click();await page.waitForURL('**/apps/gestion/**');}
await page.evaluate(async id=>{await fetch(OC.generateUrl('/apps/gestion/updateSession'),{method:'POST',headers:{'Content-Type':'application/json',requesttoken:OC.requestToken||oc_requesttoken},body:JSON.stringify({companyID:String(id)})})},fixture.company);
await page.goto(`http://127.0.0.1:8080/index.php/apps/gestion/devis/${fixture.quote}/show`);await page.waitForFunction(()=>document.documentElement.dataset.gestionDocumentReady==='true');
assert.match(await page.locator('.gestion-document-toolbar [role=status]').innerText(),/cannot be edited or deleted/);
assert.equal(await page.locator('.gestion-document-toolbar a').getAttribute('href'),'https://baimard.github.io/gestion/document_lifecycle.html');
assert.equal(await page.locator('#PDFcontent .gestion-lock-information').count(),0);
await page.goto('http://127.0.0.1:8080/index.php/apps/gestion/devis');await page.locator('.document-actions').first().locator('summary').click();await page.locator('.sendDocumentMail').first().click();await page.locator('dialog[open] #mail-lock-warning').waitFor();
assert.match(await page.locator('#mail-lock-warning').innerText(),/before the delivery attempt/);assert.match(await page.locator('#mail-lock-warning').innerText(),/If delivery fails/);
await page.locator('dialog[open]').getByRole('button',{name:'Cancel',exact:true}).click();assert.equal(mailRequests,0);
await page.locator('.document-actions').first().locator('summary').click();await page.locator('.sendDocumentMail').first().click();await page.locator('dialog[open] #mail-lock-warning').waitFor();await page.locator('dialog[open]').getByRole('button',{name:'Send',exact:true}).click();await page.getByText(/The document is now permanently locked/).first().waitFor();assert.equal(mailRequests,1);
const invoice=await page.evaluate(async id=>{let r=await fetch(OC.generateUrl('/apps/gestion/facture/insert'),{method:'POST',headers:{'Content-Type':'application/json',requesttoken:OC.requestToken||oc_requesttoken},body:JSON.stringify({devisId:id})});return r.json()},fixture.quote);assert.ok(invoice.id);
// Supply only the frontend Iopole button in the test HTML, without configuring real credentials.
await context.route(`**/facture/${invoice.id}/show`,async r=>{const response=await r.fetch();let html=await response.text();html=html.replace('<table id="produits"',`<button type="button" id="facturx-iopole" data-factureid="${invoice.id}">Send to Iopole</button><table id="produits"`);await r.fulfill({response,body:html})});
await page.goto(`http://127.0.0.1:8080/index.php/apps/gestion/facture/${invoice.id}/show`);await page.waitForFunction(()=>document.documentElement.dataset.gestionDocumentReady==='true');await page.locator('#facturx-iopole').click();await page.locator('dialog[open] #iopole-lock-warning').waitFor();await page.locator('dialog[open]').getByRole('button',{name:'Cancel',exact:true}).click();assert.equal(iopoleRequests,0);
await page.locator('#facturx-iopole').click();await page.locator('dialog[open]').getByRole('button',{name:'Finalize and send',exact:true}).click();await page.getByText(/Simulated platform failure/).first().waitFor();assert.equal(iopoleRequests,1);assert.match(await page.locator('body').innerText(),/If delivery failed, you can retry/);
assert.deepEqual(errors,[]);await browser.close();console.log('Lock messaging: persistent notice + guide, excluded from PDF, email and Iopole pre-send warnings, cancel sends nothing, failed-delivery lock notice. No external delivery.');
})().catch(e=>{console.error(e);process.exit(1)});
