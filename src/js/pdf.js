import { showMessage } from "@nextcloud/dialogs";
import { baseUrl } from "./modules/mainFunction.js";
import { generateFacturXmlRequest } from "./modules/ajaxRequest.js";

export function sendMail(myData) {
  fetch(baseUrl + "/sendPDF", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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

export function capture(afterCapturefunction) {
  showMessage(t("gestion", "Creation in progress …"));
  
  const pdfElement = document.getElementById("pdf");
  const pdfName = pdfElement.getAttribute("data-name");
  
  const folder = document.getElementById("theFolder").value;
  const pdfFolder = pdfElement.getAttribute("data-folder");
  
  const element = document.querySelector("#PDFcontent");
  const clonedElement = element.cloneNode(true);
  clonedElement.querySelectorAll('[data-html2canvas-ignore]').forEach(el => el.remove());
  const htmlContent = clonedElement.outerHTML;
  
  let name = "";
  if (document.getElementById("factureid")) {
    name = t("gestion", "INVOICE") + "_" + pdfName + ".pdf";
  } else {
    name = t("gestion", "QUOTE") + "_" + pdfName + ".pdf";
  }
  
  fetch(baseUrl + '/generatePDF', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'requesttoken': OC.requestToken
    },
    body: JSON.stringify({
      html: htmlContent,
      name: name,
      folder: folder + "/" + pdfFolder + "/"
    })
  })
  .then(response => {
    if (!response.ok) throw new Error("Erreur serveur");
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
 * Génère et télécharge un PDF Factur-X (EN 16931) pour la facture courante.
 * Le fichier est aussi sauvegardé dans Nextcloud.
 */
export function captureFacturX() {
  showMessage(t("gestion", "Génération de la facture électronique…"));

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
    headers: {
      'Content-Type': 'application/json',
      'requesttoken': OC.requestToken
    },
    body: JSON.stringify({
      html:      htmlContent,
      name:      name,
      folder:    folder + "/" + pdfFolder + "/",
      factureId: factureId
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw new Error(err.message || "Erreur serveur"); });
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
    showMessage(t("gestion", "Facture électronique générée et sauvegardée."));
  })
  .catch(error => {
    console.error("Erreur Factur-X :", error);
    showMessage(t("gestion", "Erreur lors de la génération de la facture électronique : ") + error.message);
  });
}

/**
 * Génère et télécharge uniquement le XML Factur-X (CII EN 16931) pour la facture courante.
 * Le fichier est aussi sauvegardé dans Nextcloud.
 */
export function captureFacturXml() {
  showMessage(t("gestion", "Génération du XML Factur-X…"));

  const pdfElement = document.getElementById("pdf");
  const facturxBtn = document.getElementById("facturx-xml");
  const pdfName    = pdfElement.getAttribute("data-name");
  const folder     = document.getElementById("theFolder").value;
  const pdfFolder  = pdfElement.getAttribute("data-folder");
  const factureId  = parseInt(facturxBtn.getAttribute("data-factureid"), 10);

  const xmlFileName = t("gestion", "INVOICE") + "_" + pdfName + "_facturx.xml";

  generateFacturXmlRequest(factureId, xmlFileName, folder + "/" + pdfFolder + "/");
}
