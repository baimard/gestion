// Local SVG icons use the same 24px geometry and theme colour as Nextcloud.
// No font downloads or external requests are required.
const paths = {
    more_horiz: 'M5 12h1M11 12h1M17 12h1',
    home: 'M3 10 12 3l9 7v11h-6v-7H9v7H3z',
    menu_open: 'M3 6h18M3 12h12M3 18h18m-1-9-3 3 3 3',
    chevron_right: 'm9 5 7 7-7 7',
    question_mark: 'M8 7a4 4 0 1 1 6 3.5c-2 1-2 2-2 3.5M12 18v1',
    delete: 'M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7',
    content_copy: 'M8 8h13v13H8zM16 3H3v13',
    download: 'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4',
    mail: 'M3 5h18v14H3zm0 0 9 7 9-7',
    open_in_new: 'M14 3h7v7M21 3 10 14M10 3H3v18h18v-7',
    receipt_long: 'M5 3h14v18l-3-2-4 2-4-2-3 2zM8 8h8M8 12h8M8 16h5',
    data_object: 'M8 3H5v6l-2 3 2 3v6h3M16 3h3v6l2 3-2 3v6h-3',
    check: 'm4 12 5 5L20 6',
    gavel: 'm14 3 7 7-4 4-7-7zM3 20l10-10M2 22h12',
    drag_indicator: 'M9 5v1M15 5v1M9 11v1M15 11v1M9 17v1M15 17v1',
    person_add: 'M9 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8M2 21v-3c0-6 14-6 14 0v3M20 6v8M16 10h8',
    store: 'M3 10h18v11H3zM2 10l2-7h16l2 7M9 21v-7h6v7',
};
function replaceIcons(root) {
    const nodes = root.matches?.('.material-symbols,.material-symbols-outlined') ? [root] : [];
    nodes.push(...root.querySelectorAll?.('.material-symbols,.material-symbols-outlined') || []);
    for (const node of nodes) {
        const pathData = paths[node.textContent.trim()];
        if (!pathData || node.dataset.localIcon) continue;
        node.dataset.localIcon = 'true';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox','0 0 24 24');
        svg.setAttribute('width','20'); svg.setAttribute('height','20'); svg.setAttribute('aria-hidden','true');
        const path = document.createElementNS(svg.namespaceURI, 'path');
        path.setAttribute('d',pathData); path.setAttribute('fill','none'); path.setAttribute('stroke','currentColor');
        path.setAttribute('stroke-width','1.7'); path.setAttribute('stroke-linecap','round'); path.setAttribute('stroke-linejoin','round');
        svg.append(path); node.replaceChildren(svg);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    replaceIcons(document.body);
    const observer = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) replaceIcons(node);
    })));
    observer.observe(document.body, {subtree:true,childList:true});
});
