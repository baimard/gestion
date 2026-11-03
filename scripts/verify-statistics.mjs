import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../src/js/modules/statistics.js', import.meta.url), 'utf8');
const { groupTurnover } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
const result = groupTurnover([
    { y: '2025', m: '12', total: '49.99' },
    { y: '2026', m: '2', total: '27.40' },
    { y: '2026', m: '1', total: '0.10' },
    { y: '2026', m: '2', total: '0.20' },
    { y: '2026', m: '13', total: '999.99' },
]);
assert.deepEqual(result.map(row => row.year), [2026, 2025]);
assert.equal(result[0].months[0], 0.10);
assert.equal(result[0].months[1], 27.60);
assert.equal(result[0].months[2], 0);
assert.equal(result[0].total, 27.70);
assert.equal(result[1].total, 49.99);
assert.equal(result[0].months.length, 12);
assert.deepEqual(groupTurnover([]), []);
console.log('Statistics retain cents, sum months accurately and sort years independently of response order.');
