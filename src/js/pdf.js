import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { showMessage } from "@nextcloud/dialogs";
import { baseUrl } from "./modules/mainFunction.mjs";

export function sendMail(myData) {
  $.ajax({
    url: baseUrl + '/sendPDF',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(myData)
  }).done(function (response) {
    showMessage(t('gestion', 'Email sent'));
  }).fail(function (response, code) {
    showMessage(t('gestion', 'Is your global mail server configured in Nextcloud?'));
  });
}

export function capture(afterCapturefunction) {
  showMessage(t('gestion', 'Creation in progress …'));

  $('.bootstrap-iso').css('width', '1000px')
  $('.bootstrap-iso').css('padding-right', '20px')
  $('.bootstrap-iso').css('padding-left', '20px')
  
  
  html2canvas($('.bootstrap-iso')[0], {
    scrollY: -window.scrollY,
    dpi: 600,
  }).then((canvas) => {
    var data = genPDF(canvas.toDataURL("image/png"), canvas);
    afterCapturefunction(data);
  });

    // html2canvas($('.bootstrap-iso')[0], {
    //   onrendered: function(canvas){
    //     canvas.toBlob(function(blob){
    //       var urlCreator = window.URL || window.webkitURL;
    //       var imageUrl = urlCreator.createObjectURL(blob);
    //       var img = new Image();
    //       img.src = imageUrl;
    //       var data = genPDF(img, canvas);
    //       afterCapturefunction(data);
    //     })
    //   }
    // })


  $('.bootstrap-iso').css('width', '')
  $('.bootstrap-iso').css('padding-right', '')
  $('.bootstrap-iso').css('padding-left', '')
}

function genPDF(imgData, canvas) {

  var doc = new jsPDF('p', 'mm');
  var imgWidth = 210;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
  var position = 0;

  doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position += heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  var pdf = btoa(doc.output());
  var n = ""
  var to = {};
  to[$('#mail').text()] = $('#nomprenom').text()
  var subject = $("#subject").val()
  var body = $("#body").val()

  if ($("#factureid").length) {
    n = "FACTURE_" + $("#pdf").data("name");
  } else {
    n = "DEVIS_" + $("#pdf").data("name");
  }

  var myData = { name: n, subject: subject, body: body, to: JSON.stringify(to), content: pdf, folder: $("#theFolder").val() + "/" + $("#pdf").data("folder") + "/" };

  return myData;
  //doc.save('devis.pdf');
}

