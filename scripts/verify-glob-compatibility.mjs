import assert from 'node:assert/strict';
import { processGlobFilter } from '../node_modules/webdav/dist/node/response.js';
import { ESLint } from 'eslint';

const files = ['/Documents/invoice.pdf', '/Documents/quote.pdf', '/Documents/readme.txt', '/Documents/.private.pdf', '/Archive/report.PDF'].map(filename => ({ filename }));
assert.deepEqual(processGlobFilter(files, '*.pdf').map(file => file.filename), ['/Documents/invoice.pdf', '/Documents/quote.pdf']);
assert.deepEqual(processGlobFilter(files, '/Documents/{invoice,quote}.pdf').map(file => file.filename), ['/Documents/invoice.pdf', '/Documents/quote.pdf']);
assert.deepEqual(processGlobFilter(files, '**/invoice.?df').map(file => file.filename), ['/Documents/invoice.pdf']);
assert.deepEqual(processGlobFilter(files, '**/*.csv'), []);
const eslint = new ESLint();
assert.equal(await eslint.isPathIgnored('src/js/client.js'), false);
assert.equal(await eslint.isPathIgnored('node_modules/example/index.js'), true);
const result = await eslint.lintText('unknownSecurityFixture();', { filePath: 'src/js/fixture.js' });
assert.ok(result[0].messages.some(message => message.ruleId === 'no-undef'));
console.log('WebDAV glob filtering and ESLint configuration matching work with minimatch 11.');
