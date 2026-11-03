/** Aggregate in cents so the annual total equals the twelve displayed amounts. */
export function groupTurnover(rows) {
    const years = new Map();
    for (const row of rows) {
        const year = Number(row.y), month = Number(row.m), total = Number(row.total);
        if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12 || !Number.isFinite(total)) continue;
        if (!years.has(year)) years.set(year, Array(12).fill(0));
        years.get(year)[month - 1] += Math.round(total * 100);
    }
    return [...years].sort(([a], [b]) => b - a).map(([year, cents]) => ({ year, months: cents.map(value => value / 100), total: cents.reduce((sum, value) => sum + value, 0) / 100 }));
}

export function renderTurnover(rows, formatter) {
    const groups = groupTurnover(rows);
    const body = document.querySelector('#Statistical tbody');
    const status = document.getElementById('statistics-status');
    const region = document.querySelector('.gestion-statistics-scroll');
    body.replaceChildren();
    status.hidden = groups.length > 0;
    region.hidden = groups.length === 0;
    status.textContent = t('gestion', 'No turnover to display yet.');
    for (const group of groups) {
        const row = document.createElement('tr');
        const heading = document.createElement('th');
        heading.scope = 'row';
        heading.textContent = String(group.year);
        row.appendChild(heading);
        for (const amount of [...group.months, group.total]) {
            const cell = document.createElement('td');
            cell.textContent = formatter.format(amount);
            if (amount === 0) cell.className = 'gestion-zero-amount';
            row.appendChild(cell);
        }
        body.appendChild(row);
    }
}
