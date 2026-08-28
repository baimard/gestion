// import "@nextcloud/dialogs/dist/index.css";
import "../css/mycss.less";

import { addShareUser, configuration, createCompany, deleteCompany, delShareUser, updateDBConfiguration} from "./modules/ajaxRequest.js";
import { globalConfiguration, parseConfigurationResponse } from "./modules/mainFunction.js";
import "./listener/main_listener";
import { setCurrencyList, setFormatList } from "./modules/list.js";
import { csrfHeaders } from "./modules/csrf.js";

const providerUrl = () => OC.generateUrl('/apps/gestion/einvoice/provider');

document.addEventListener('DOMContentLoaded', function() {
    globalConfiguration(false);
    initializeConfigurationSectionNavigation();

    const providerSelect = document.getElementById('einvoice_provider');
    const providerSave = document.getElementById('save_einvoice_provider');

    if (providerSelect) {
        providerSelect.addEventListener('change', updateProviderVisibility);
    }

    if (providerSave) {
        providerSave.addEventListener('click', saveElectronicInvoiceProvider);
    }
    
    var HelpSection = document.getElementById("HelpSection");
    HelpSection.addEventListener("click", function(){
        var modal = document.getElementById("ConfigurationHelp");
        modal.style.display = "block";
    });

    var openModalButton = document.getElementById('open_configuration_modal');
    if (openModalButton) {
        openModalButton.addEventListener('click', function() {
            var modal = document.getElementById("configuration_modal");
            if (modal) {
                modal.style.display = "block";
            }

            configuration(loadConfigurationDT);
            loadElectronicInvoiceProvider();
        });
    }

    var submitEmail = document.getElementById("submitEmail");
    if (submitEmail) {
        submitEmail.addEventListener('click', function() {
            addShareUser(document.getElementById("emailInput").value);
        });
    }

    document.querySelectorAll(".deleteShareUser").forEach(function(deleteShareUser) {
        deleteShareUser.addEventListener('click', function() {
            delShareUser(this.getAttribute('data-uid'));
        });
    });

    var newCompany = document.getElementById("newCompany");
    if (newCompany) {
        newCompany.addEventListener("click", function() { createCompany(); });
    }

    var deleteCompanyButton = document.getElementById("deleteCompany");
    if (deleteCompanyButton) {
        deleteCompanyButton.addEventListener("click", function() { deleteCompany(); });
    }

    document.body.addEventListener('focusout', callUpdateDBConfiguration);
    document.body.addEventListener('keydown', function(e) {
        if(e.key === "Enter") callUpdateDBConfiguration(e);
    });
    document.body.addEventListener('change', callUpdateDBConfiguration);

    function callUpdateDBConfiguration(e){
        if (e.target.classList.contains('editableConfiguration') || e.target.classList.contains('editableConfigurationSelect')) {
            updateDBConfiguration(
                e.target.getAttribute('data-table'),
                e.target.getAttribute('data-column'),
                e.target.value,
                e.target.getAttribute('data-id')
            );
        }
    }
});

function initializeConfigurationSectionNavigation() {
    const sectionsContainer = document.querySelector('.configuration-sections');
    const links = [...document.querySelectorAll('.configuration-section-link')];
    if (!sectionsContainer || links.length === 0) return;

    const setActiveLink = (activeLink) => {
        links.forEach(link => link.classList.toggle('active', link === activeLink));
    };

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const section = document.querySelector(link.getAttribute('href'));
            if (!section) return;
            setActiveLink(link);
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            section.focus({ preventScroll: true });
        });
    });

    sectionsContainer.addEventListener('scroll', () => {
        const containerTop = sectionsContainer.getBoundingClientRect().top;
        const currentSection = [...sectionsContainer.querySelectorAll('.configuration-section')]
            .filter(section => section.getBoundingClientRect().top <= containerTop + 32)
            .pop() || sectionsContainer.querySelector('.configuration-section');
        const currentLink = links.find(link => link.getAttribute('href') === `#${currentSection?.id}`);
        if (currentLink) setActiveLink(currentLink);
    }, { passive: true });
}

function updateProviderVisibility() {
    const provider = document.getElementById('einvoice_provider')?.value || '';
    const iopole = document.getElementById('einvoice-provider-iopole');
    if (iopole) iopole.style.display = provider === 'iopole' ? 'block' : 'none';
}

async function loadElectronicInvoiceProvider() {
    const status = document.getElementById('einvoice_provider_status');
    try {
        const response = await fetch(providerUrl(), {
            method: 'GET',
            headers: csrfHeaders({ 'Accept': 'application/json' })
        });
        if (!response.ok) throw new Error(await response.text());

        const payload = await response.json();
        const config = payload.configuration || {};
        const credentials = config.credentials || {};

        document.getElementById('einvoice_provider').value = config.provider || '';
        document.getElementById('iopole_client_id').value = credentials.client_id || '';
        document.getElementById('iopole_client_secret').value = credentials.client_secret || '';
        document.getElementById('iopole_customer_id').value = credentials.customer_id || '';
        document.getElementById('iopole_base_url').value = credentials.base_url || '';
        document.getElementById('iopole_auth_url').value = credentials.auth_url || '';
        updateProviderVisibility();
        if (status) status.textContent = config.configured ? t('gestion', 'Platform configured') : '';
    } catch (error) {
        if (status) status.textContent = t('gestion', 'Unable to load platform configuration');
        console.error(error);
    }
}

async function saveElectronicInvoiceProvider() {
    const status = document.getElementById('einvoice_provider_status');
    const provider = document.getElementById('einvoice_provider').value;
    const credentials = provider === 'iopole' ? {
        client_id: document.getElementById('iopole_client_id').value,
        client_secret: document.getElementById('iopole_client_secret').value,
        customer_id: document.getElementById('iopole_customer_id').value,
        base_url: document.getElementById('iopole_base_url').value,
        auth_url: document.getElementById('iopole_auth_url').value,
    } : {};

    if (status) status.textContent = t('gestion', 'Saving…');

    try {
        const response = await fetch(providerUrl(), {
            method: 'POST',
            headers: csrfHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ provider, credentials }),
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.message || 'Unable to save provider configuration');
        if (status) status.textContent = payload.configured || provider === ''
            ? t('gestion', 'Saved')
            : t('gestion', 'Some required fields are missing');
    } catch (error) {
        if (status) status.textContent = error.message;
        console.error(error);
    }
}

function safeValue(value) {
    return value === null || value === undefined || value === "" ? "-" : value;
}

function loadConfigurationDT(response) {
    const data = parseConfigurationResponse(response);

    data.forEach(function (myresp) {
        const textFields = [
            'entreprise', 'nom', 'prenom', 'adresse', 'legal_one', 'legal_two',
            'telephone', 'mail', 'tva_default', 'facture_prefixe', 'city_name',
            'zip_code', 'vat_number', 'iban', 'logo_width', 'logo_header_width',
            'logo_footer_width'
        ];

        textFields.forEach((field) => {
            const element = document.getElementById(field);
            if (element) element.value = safeValue(myresp[field]);
        });

        setCurrencyList(myresp.devise, document.getElementById("currency"));
        setFormatList(myresp.format, document.getElementById("format"));

        document.getElementById("mentions_default").value = safeValue(myresp.mentions_default).replace(/\&amp;/g, "&");

        [...textFields, 'currency', 'format', 'mentions_default'].forEach(function (field) {
            const element = document.getElementById(field);
            if (element) element.setAttribute("data-id", myresp.id);
        });
    });
}
