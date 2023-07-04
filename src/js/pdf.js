import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { showMessage } from "@nextcloud/dialogs";
import { baseUrl } from "./modules/mainFunction.mjs";

export function sendMail(myData) {
  $.ajax({
    url: baseUrl + "/sendPDF",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(myData)
  }).done(function () {
    showMessage(t("gestion", "Email sent"));
  }).fail(function () {
    showMessage(t("gestion", "Is your global mail server configured in Nextcloud?"));
  });
}

export function capture(afterCapturefunction) {
  showMessage(t("gestion", "Creation in progress …"));

  $(".bootstrap-iso").css("width", "1200px");
  $(".bootstrap-iso").css("padding-right", "20px");
  $(".bootstrap-iso").css("padding-left", "20px");
  
  html2canvas($(".bootstrap-iso")[0], {
    scrollY: -window.scrollY,
    dpi: 600,
  }).then((canvas) => {
    var data = genPDF(canvas.toDataURL("image/jpg"), canvas);
    afterCapturefunction(data);
  });

  $(".bootstrap-iso").css("width", "");
  $(".bootstrap-iso").css("padding-right", "");
  $(".bootstrap-iso").css("padding-left", "");
}

function genPDF(imgData, canvas) {

  var doc = new jsPDF("p", "mm");
  var imgWidth = 210;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
  var position = 0;

  doc.addImage(imgData, "JPG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position += heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(imgData, "JPG", 0, position, imgWidth, imgHeight);
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
  console.log(pdf);
  return myData;
  //doc.save('devis.pdf');
}

