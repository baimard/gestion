import { showMessage } from "@nextcloud/dialogs";
import { baseUrl } from "./modules/mainFunction.js";
import { generateFacturXmlRequest } from "./modules/ajaxRequest.js";
import { csrfHeaders } from "./modules/csrf.js";

export function sendMail(myData) {
  fetch(baseUrl + "/sendPDF", {
    method: "POST",
    headers: csrfHeaders({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(myData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(() => {
    showMessage(t("gestion", "Email sent"));
  })
  .catch(() => {
    showMessage(t("gestion", "Is your global mail server configured in Nextcloud?"));
  });
}

export function capture(afterCapturefunction, sourceDocument = document) {
  showMessage(t("gestion", "Creation in progress …"));
  
  const pdfElement = sourceDocument.getElementById("pdf");
  const pdfName = pdfElement.getAttribute("data-name");
  
  const folder = sourceDocument.getElementById("theFolder").value;
  const pdfFolder = pdfElement.getAttribute("data-folder");
  
  const element = sourceDocument.querySelector("#PDFcontent");
  const clonedElement = element.cloneNode(true);
  clonedElement.querySelectorAll('[data-html2canvas-ignore]').forEach(el => el.remove());
  const htmlContent = clonedElement.outerHTML;
  
  let name = "";
  if (sourceDocument.getElementById("factureid")) {
    name = t("gestion", "INVOICE") + "_" + pdfName + ".pdf";
  } else {
    name = t("gestion", "QUOTE") + "_" + pdfName + ".pdf";
  }
  
  return fetch(baseUrl + '/generatePDF', {
    method: 'POST',
    headers: csrfHeaders({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      html: htmlContent,
      name: name,
      folder: folder + "/" + pdfFolder + "/"
    })
  })
  .then(response => {
    if (!response.ok) throw new Error("Server error");
    return response.blob();
  })
  .then(blob => {
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  
    showMessage(t("gestion", "PDF has been created."));
  })
  .catch(error => {
    console.error("Errors during PDF generation :", error);
    showMessage(t("gestion", "Error when creating PDF."));
  });
}

/**
 * Bind the direct PDF action used by quote and invoice lists.
 *
 * The detail page is loaded in a hidden same-origin frame because it enriches
 * the server-rendered document with customer, product, total and configuration
 * data before the existing PDF endpoint is called.
 */
export function bindDirectPdfDownloads() {
  document.addEventListener("click", event => {
    const trigger = event.target.closest(".downloadDocumentPdf");

    if (!trigger || trigger.dataset.loading === "true") {
      return;
    }

    event.preventDefault();
    trigger.closest(".document-actions")?.removeAttribute("open");
    trigger.dataset.loading = "true";
    trigger.setAttribute("aria-busy", "true");

    downloadPdfFromDetailPage(trigger.dataset.url)
      .catch(error => {
        console.error("Direct PDF generation error:", error);
        showMessage(t("gestion", "Error when creating PDF."));
      })
      .finally(() => {
        delete trigger.dataset.loading;
        trigger.removeAttribute("aria-busy");
      });
  });
}

function downloadPdfFromDetailPage(detailUrl) {
  showMessage(t("gestion", "Creation in progress …"));

  const frame = document.createElement("iframe");
  frame.hidden = true;
  frame.setAttribute("aria-hidden", "true");
  frame.title = t("gestion", "PDF generation");

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error("Timed out while preparing the document"));
    }, 30000);

    const documentIsReady = () => {
      const frameDocument = frame.contentDocument;

      if (frameDocument?.documentElement.dataset.gestionDocumentReady !== "true") {
        return;
      }

      window.clearTimeout(timeout);
      capture(null, frameDocument).then(resolve).catch(reject);
    };

    frame.addEventListener("load", () => {
      const frameDocument = frame.contentDocument;

      if (!frameDocument) {
        window.clearTimeout(timeout);
        reject(new Error("Unable to load the document"));
        return;
      }

      frameDocument.addEventListener("gestion:document-ready", documentIsReady, { once: true });
      documentIsReady();
    }, { once: true });

    frame.addEventListener("error", () => {
      window.clearTimeout(timeout);
      reject(new Error("Unable to load the document"));
    }, { once: true });

    frame.src = detailUrl;
    document.body.appendChild(frame);
  }).finally(() => {
    frame.remove();
  });
}

/**
 * Génère et télécharge un PDF Factur-X (EN 16931) pour la facture courante.
 * Le fichier est aussi sauvegardé dans Nextcloud.
 */
export function captureFacturX() {
  showMessage(t("gestion", "Generating the electronic invoice…"));

  const pdfElement  = document.getElementById("pdf");
  const facturxBtn  = document.getElementById("facturx");
  const pdfName     = pdfElement.getAttribute("data-name");
  const folder      = document.getElementById("theFolder").value;
  const pdfFolder   = pdfElement.getAttribute("data-folder");
  const factureId   = parseInt(facturxBtn.getAttribute("data-factureid"), 10);

  // Clone du contenu sans les boutons (data-html2canvas-ignore)
  const element       = document.querySelector("#PDFcontent");
  const clonedElement = element.cloneNode(true);
  clonedElement.querySelectorAll('[data-html2canvas-ignore]').forEach(el => el.remove());
  const htmlContent = clonedElement.outerHTML;

  const name = t("gestion", "INVOICE") + "_" + pdfName + "_facturx.pdf";

  fetch(baseUrl + '/generateFacturX', {
    method: 'POST',
    headers: csrfHeaders({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      html:      htmlContent,
      name:      name,
      folder:    folder + "/" + pdfFolder + "/",
      factureId: factureId
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw new Error(err.message || "Server error"); });
    }
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
    showMessage(t("gestion", "Electronic invoice generated and saved."));
  })
  .catch(error => {
    console.error("Factur-X error:", error);
    showMessage(t("gestion", "Error generating the electronic invoice: ") + error.message);
  });
}

/**
 * Génère et télécharge uniquement le XML Factur-X (CII EN 16931) pour la facture courante.
 * Le fichier est aussi sauvegardé dans Nextcloud.
 */
export function captureFacturXml() {
  showMessage(t("gestion", "Generating Factur-X XML…"));

  const pdfElement = document.getElementById("pdf");
  const facturxBtn = document.getElementById("facturx-xml");
  const pdfName    = pdfElement.getAttribute("data-name");
  const folder     = document.getElementById("theFolder").value;
  const pdfFolder  = pdfElement.getAttribute("data-folder");
  const factureId  = parseInt(facturxBtn.getAttribute("data-factureid"), 10);

  const xmlFileName = t("gestion", "INVOICE") + "_" + pdfName + "_facturx.xml";

  generateFacturXmlRequest(factureId, xmlFileName, folder + "/" + pdfFolder + "/");
}

/**
 * Génère le PDF Factur-X courant et l'envoie Ã  Iopole.
 */
export function sendFacturXToIopole() {
  showMessage(t("gestion", "Sending the electronic invoice to Iopole"));

  const pdfElement = document.getElementById("pdf");
  const facturxBtn = document.getElementById("facturx-iopole");
  const pdfName = pdfElement.getAttribute("data-name");
  const factureId = parseInt(facturxBtn.getAttribute("data-factureid"), 10);

  const element = document.querySelector("#PDFcontent");
  const clonedElement = element.cloneNode(true);
  clonedElement.querySelectorAll('[data-html2canvas-ignore]').forEach(el => el.remove());
  const htmlContent = clonedElement.outerHTML;

  const name = t("gestion", "INVOICE") + "_" + pdfName + "_facturx.pdf";

  fetch(baseUrl + '/sendFacturXToIopole', {
    method: 'POST',
    headers: csrfHeaders({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      html: htmlContent,
      name: name,
      factureId: factureId
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw new Error(err.message || "Server error"); });
    }
    return response.json();
  })
  .then(data => {
    showMessage(t("gestion", "Invoice sent to Iopole! Identifier: ") + data.iopoleInvoiceId);
  })
  .catch(error => {
    console.error("Iopole error:", error);
    showMessage(t("gestion", "Error sending to Iopole: ") + error.message);
  });
}
