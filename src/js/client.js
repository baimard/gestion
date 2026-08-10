// import "@nextcloud/dialogs/dist/index.css";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "../css/mycss.less";
import "./listener/main_listener";

import DataTable from "datatables.net";
import { globalConfiguration, optionDatatable } from "./modules/mainFunction.js";
import { Client } from "./objects/client.js";
import { baseUrl } from "./modules/mainFunction.js";
import { csrfHeaders } from "./modules/csrf.js";
import { showError, showSuccess } from "@nextcloud/dialogs";

document.addEventListener("DOMContentLoaded", function () {
    globalConfiguration();
    const clientTable = new DataTable(".tabledt",optionDatatable);
    Client.loadClientDT(clientTable);
    document.getElementById("importContact")?.addEventListener("click", () => openContactImport(clientTable));
});

async function openContactImport(clientTable) {
    try {
        const response = await fetch(baseUrl + "/client/contacts", { headers: csrfHeaders() });
        if (!response.ok) throw new Error(t("gestion", "Unable to load Nextcloud contacts."));
        const contacts = await response.json();
        if (contacts.length === 0) throw new Error(t("gestion", "No Nextcloud contact is available."));

        const dialog = document.createElement("dialog");
        dialog.className = "gestion-contact-dialog";
        const form = document.createElement("form");
        const title = document.createElement("h2");
        title.textContent = t("gestion", "Import a Nextcloud contact");
        const search = document.createElement("input");
        search.type = "search";
        search.placeholder = t("gestion", "Search contacts");
        const select = document.createElement("select");
        select.size = Math.min(10, contacts.length);
        const render = pattern => {
            select.replaceChildren();
            contacts.filter(contact => JSON.stringify(contact).toLowerCase().includes(pattern.toLowerCase())).forEach(contact => {
                const option = document.createElement("option");
                option.value = contact.id;
                option.textContent = [contact.displayName, contact.entreprise, contact.mail].filter(Boolean).join(" — ");
                select.appendChild(option);
            });
            if (select.options.length) select.selectedIndex = 0;
        };
        render("");
        search.addEventListener("input", () => render(search.value));
        const actions = document.createElement("div");
        actions.className = "gestion-contact-dialog-actions";
        const cancel = document.createElement("button");
        cancel.type = "button";
        cancel.textContent = t("gestion", "Cancel");
        const submit = document.createElement("button");
        submit.type = "button";
        submit.className = "primary";
        submit.textContent = t("gestion", "Import customer");
        actions.append(cancel, submit);
        form.append(title, search, select, actions);
        dialog.appendChild(form);
        document.body.appendChild(dialog);
        cancel.addEventListener("click", () => dialog.close());
        dialog.addEventListener("close", () => dialog.remove(), { once: true });
        const importSelectedContact = async () => {
            if (!select.value) return;
            submit.disabled = true;
            submit.textContent = t("gestion", "Importing…");
            try {
                const importResponse = await fetch(baseUrl + "/client/import-contact", {
                    method: "POST",
                    headers: csrfHeaders({ "Content-Type": "application/json" }),
                    body: JSON.stringify({ id: select.value })
                });
                if (!importResponse.ok) {
                    const result = await importResponse.json().catch(() => ({}));
                    throw new Error(result.message || t("gestion", "Unable to import this contact."));
                }
                dialog.close();
                Client.loadClientDT(clientTable);
                showSuccess(t("gestion", "Contact imported as a customer."));
            } catch (error) {
                submit.disabled = false;
                submit.textContent = t("gestion", "Import customer");
                showError(error.message);
            }
        };
        submit.addEventListener("click", importSelectedContact);
        select.addEventListener("dblclick", importSelectedContact);
        dialog.showModal();
        search.focus();
    } catch (error) {
        showError(error.message);
    }
}
