import DataTable from 'datatables.net';
import { Client } from '../../objects/client.js';

export function showContactSelect() {
    Client.loadContactSelect();
}

export function importSelectedContact(selectElement) {
    Client.importSelectedContact(new DataTable('.tabledt'), selectElement);
}
