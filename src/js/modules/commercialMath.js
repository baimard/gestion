/** Amounts in a line are rounded to cents before VAT grouping, like Factur-X. */
export function lineTotal(line) {
    const discount = Number(line.discount || 0);
    if (!Number.isFinite(discount) || discount < 0 || discount > 100) throw new Error('Invalid discount');
    return Math.round((Number(line.quantite) * Number(line.prix_unitaire) * (1 - discount / 100) + Number.EPSILON) * 100) / 100;
}
