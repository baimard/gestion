import { showMessage } from "@nextcloud/dialogs";
import { baseUrl } from "./modules/mainFunction.js";
import { generateFacturXmlRequest } from "./modules/ajaxRequest.js";
import { csrfHeaders } from "./modules/csrf.js";

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
    const trigger = event.target.closest(".downloadDocumentPdf, .downloadFacturX, .downloadFacturXml, .sendDocumentMail");

    if (!trigger || trigger.dataset.loading === "true") {
      return;
    }

    event.preventDefault();
    trigger.closest(".document-actions")?.removeAttribute("open");
    trigger.dataset.loading = "true";
    trigger.setAttribute("aria-busy", "true");

    let format = "pdf";
    if (trigger.classList.contains("downloadFacturX")) {
      format = "facturx";
    } else if (trigger.classList.contains("downloadFacturXml")) {
      format = "xml";
    }

    const action = trigger.classList.contains("sendDocumentMail")
      ? sendDocumentByMail(trigger.dataset.url)
      : downloadFromDetailPage(trigger.dataset.url, format);

    action
      .catch(error => {
        console.error("Direct PDF generation error:", error);
        showMessage(error.message || t("gestion", "The operation could not be completed."));
      })
      .finally(() => {
        delete trigger.dataset.loading;
        trigger.removeAttribute("aria-busy");
      });
  });
}

async function sendDocumentByMail(detailUrl) {
  const statusResponse = await fetch(baseUrl + "/personal-mail/status", {
    headers: csrfHeaders()
  });
  const status = statusResponse.ok ? await statusResponse.json() : { available: false };

  if (!status.available) {
    showMailPrerequisites();
    return;
  }

  showMessage(t("gestion", "Preparing the email…"));
  return withPreparedDocument(detailUrl, async sourceDocument => {
    const pdfElement = sourceDocument.getElementById("pdf");
    const pdfName = pdfElement.getAttribute("data-name");
    const isInvoice = Boolean(sourceDocument.getElementById("factureid"));
    const type = isInvoice ? t("gestion", "Invoice") : t("gestion", "Quote");
    const name = (isInvoice ? t("gestion", "INVOICE") : t("gestion", "QUOTE")) + "_" + pdfName + ".pdf";
    const recipient = sourceDocument.getElementById("mail")?.textContent?.trim() || "";
    const element = sourceDocument.querySelector("#PDFcontent").cloneNode(true);
    element.querySelectorAll("[data-html2canvas-ignore]").forEach(node => node.remove());

    const email = await showMailConfirmation({
      from: status.account?.address || status.account?.label || "",
      to: recipient,
      subject: type + " " + pdfName,
      body: t("gestion", "Hello,\n\nPlease find your document attached.\n\nKind regards.")
    });

    if (email === null) {
      return;
    }

    const response = await fetch(baseUrl + "/personal-mail/send", {
      method: "POST",
      headers: csrfHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        html: element.outerHTML,
        name,
        to: email.to,
        subject: email.subject,
        body: email.body
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || t("gestion", "Email sending failed."));
    }
    showMailSentConfirmation();
  });
}

function showMailConfirmation(email) {
  return new Promise(resolve => {
    const dialog = document.createElement("dialog");
    dialog.className = "gestion-mail-dialog";

    const form = document.createElement("form");
    form.method = "dialog";
    form.className = "gestion-mail-dialog-form";

    const title = document.createElement("h2");
    title.textContent = t("gestion", "Send document by email");
    form.appendChild(title);

    const createField = (labelText, value, readOnly, multiline = false) => {
      const label = document.createElement("label");
      label.textContent = labelText;
      const field = multiline ? document.createElement("textarea") : document.createElement("input");
      field.value = value;
      field.readOnly = readOnly;
      field.required = true;
      if (multiline) field.rows = 8;
      label.appendChild(field);
      form.appendChild(label);
      return field;
    };

    createField(t("gestion", "Sender email"), email.from, true);
    const recipient = createField(t("gestion", "Recipient email"), email.to, true);
    const subject = createField(t("gestion", "Subject"), email.subject, false);
    const body = createField(t("gestion", "Message"), email.body, false, true);

    const actions = document.createElement("div");
    actions.className = "gestion-mail-dialog-actions";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = t("gestion", "Cancel");
    const send = document.createElement("button");
    send.type = "submit";
    send.className = "primary";
    send.textContent = t("gestion", "Send");
    actions.append(cancel, send);
    form.appendChild(actions);
    dialog.appendChild(form);
    document.body.appendChild(dialog);

    let submitted = false;
    cancel.addEventListener("click", () => dialog.close());
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      submitted = true;
      dialog.close();
    });
    dialog.addEventListener("close", () => {
      const result = submitted ? {
        to: recipient.value,
        subject: subject.value.trim(),
        body: body.value
      } : null;
      dialog.remove();
      resolve(result);
    }, { once: true });

    dialog.showModal();
    subject.focus();
  });
}

function showMailSentConfirmation() {
  showMessage(t("gestion", "The email was sent successfully."));
}

function showMailPrerequisites() {
  const title = t("gestion", "Email sending unavailable");
  const message = t("gestion", "To use this function, the Nextcloud Mail application must be installed and enabled. You must also configure a personal default email account and verify that it is connected and able to send messages.");

  if (window.OC?.dialogs?.alert) {
    window.OC.dialogs.alert(message, title);
  } else {
    window.alert(title + "\n\n" + message);
  }
}

function withPreparedDocument(detailUrl, callback) {
  const frame = document.createElement("iframe");
  frame.hidden = true;
  frame.setAttribute("aria-hidden", "true");
  frame.title = t("gestion", "Document preparation");

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Timed out while preparing the document")), 30000);
    const ready = () => {
      const sourceDocument = frame.contentDocument;
      if (sourceDocument?.documentElement.dataset.gestionDocumentReady !== "true") return;
      window.clearTimeout(timeout);
      Promise.resolve(callback(sourceDocument)).then(resolve).catch(reject);
    };
    frame.addEventListener("load", () => {
      const sourceDocument = frame.contentDocument;
      if (!sourceDocument) return reject(new Error("Unable to load the document"));
      sourceDocument.addEventListener("gestion:document-ready", ready, { once: true });
      ready();
    }, { once: true });
    frame.addEventListener("error", () => reject(new Error("Unable to load the document")), { once: true });
    frame.src = detailUrl;
    document.body.appendChild(frame);
  }).finally(() => frame.remove());
}

function downloadFromDetailPage(detailUrl, format) {
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
      let generation;
      if (format === "facturx") {
        generation = captureFacturX(frameDocument);
      } else if (format === "xml") {
        generation = captureFacturXml(frameDocument);
      } else {
        generation = capture(null, frameDocument);
      }

      generation.then(resolve).catch(reject);
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
export function captureFacturX(sourceDocument = document) {
  showMessage(t("gestion", "Generating the electronic invoice…"));

  const pdfElement  = sourceDocument.getElementById("pdf");
  const facturxBtn  = sourceDocument.getElementById("facturx");
  const pdfName     = pdfElement.getAttribute("data-name");
  const folder      = sourceDocument.getElementById("theFolder").value;
  const pdfFolder   = pdfElement.getAttribute("data-folder");
  const factureId   = parseInt(facturxBtn.getAttribute("data-factureid"), 10);

  // Clone du contenu sans les boutons (data-html2canvas-ignore)
  const element       = sourceDocument.querySelector("#PDFcontent");
  const clonedElement = element.cloneNode(true);
  clonedElement.querySelectorAll('[data-html2canvas-ignore]').forEach(el => el.remove());
  const htmlContent = clonedElement.outerHTML;

  const name = t("gestion", "INVOICE") + "_" + pdfName + "_facturx.pdf";

  return fetch(baseUrl + '/generateFacturX', {
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
export function captureFacturXml(sourceDocument = document) {
  showMessage(t("gestion", "Generating Factur-X XML…"));

  const pdfElement = sourceDocument.getElementById("pdf");
  const facturxBtn = sourceDocument.getElementById("facturx-xml");
  const pdfName    = pdfElement.getAttribute("data-name");
  const folder     = sourceDocument.getElementById("theFolder").value;
  const pdfFolder  = pdfElement.getAttribute("data-folder");
  const factureId  = parseInt(facturxBtn.getAttribute("data-factureid"), 10);

  const xmlFileName = t("gestion", "INVOICE") + "_" + pdfName + "_facturx.xml";

  return generateFacturXmlRequest(factureId, xmlFileName, folder + "/" + pdfFolder + "/");
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
