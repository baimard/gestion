import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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

  document.querySelector(".bootstrap-iso").style.width = "1200px";
  document.querySelector(".bootstrap-iso").style.paddingRight = "20px";
  document.querySelector(".bootstrap-iso").style.paddingLeft = "20px";
  
  html2canvas(document.querySelector(".bootstrap-iso"), {
    scrollY: -window.scrollY,
    dpi: 600,
  }).then((canvas) => {
    var data = genPDF(canvas.toDataURL("image/jpg"), canvas);
    afterCapturefunction(data);
  });

  document.querySelector(".bootstrap-iso").style.width = "";
  document.querySelector(".bootstrap-iso").style.paddingRight = "";
  document.querySelector(".bootstrap-iso").style.paddingLeft = "";
}

function genPDF(imgData, canvas) {
  const doc = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position += heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  var pdf = btoa(doc.output());

  var n = "";
  var to = $("#to").val().split(";");
  var Cc = $("#Cc").val().split(";");
  var subject = $("#subject").val();
  var body = $("#body").val();

  if ($("#factureid").length) {
    n = t("gestion", "INVOICE") + "_" + $("#pdf").data("name");
  } else {
    n = t("gestion", "QUOTE") + "_" + $("#pdf").data("name");
  }

  var myData = { name: n, subject: subject, body: body, to: JSON.stringify(to), Cc : JSON.stringify(Cc), content: pdf, folder: $("#theFolder").val() + "/" + $("#pdf").data("folder") + "/" };

  return myData;
}