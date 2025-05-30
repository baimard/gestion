import { showMessage } from "@nextcloud/dialogs";
import { baseUrl } from "./modules/mainFunction.js";

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
  
    showMessage(t("gestion", "PDF créé avec succès."));
  })
  .catch(error => {
    console.error("Erreur lors de la génération du PDF :", error);
    showMessage(t("gestion", "Erreur lors de la création du PDF."));
  });
}