import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import {generateUrl} from "@nextcloud/router";
import { showMessage } from "@nextcloud/dialogs";

var baseUrl = generateUrl('/apps/gestion');

var saveNextcloud = function(myData){
  $.ajax({
    url: baseUrl + '/savePDF',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(myData)
  }).done(function (response) {
    showMessage(t('gestion', 'Save in') + " " + $("#theFolder").val()+"/"+ $("#pdf").data("folder"));
  }).fail(function (response, code) {
    showMessage(t('gestion', 'There is an error'));
    error(response);
  });
}

var sendMail = function(myData){
  $.ajax({
    url: baseUrl + '/sendPDF',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(myData)
  }).done(function (response) {
    showMessage(t('gestion', 'Mail sended'));
  }).fail(function (response, code) {
    showMessage(t('gestion', 'There is an error'));
    error(response);
  });
}   

$('body').on('click', '#pdf', function(){
    showMessage(t('gestion', 'Creation in progress …'));
    capture(saveNextcloud);
});

$('body').on('click', '#mail', function(){
  showMessage(t('gestion', 'Creation in progress …'));
  capture(sendMail);
});

function capture(afterCapturefunction) {
    $('.bootstrap-iso').css('width', '900px')
    $('.bootstrap-iso').css('padding-right', '20px')
    $('.bootstrap-iso').css('padding-left', '20px')
    html2canvas($('.bootstrap-iso')[0], {
        scrollY: -window.scrollY,
        dpi: 600,
    }).then((canvas) => {
        var data = genPDF(canvas.toDataURL("image/png"), canvas);
        afterCapturefunction(data);
    });
    $('.bootstrap-iso').css('width', '')
    $('.bootstrap-iso').css('padding-right', '')
    $('.bootstrap-iso').css('padding-left', '')
}

function genPDF(imgData, canvas){
    
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
      to [$('#mail').text()] = $('#nomprenom').text()
      var subject = ""

      if($("#factureid").length){
        n = "FACTURE_" + $("#pdf").data("name");
        subject = t('gestion', 'Your invoice')
      }else{
        n = "DEVIS_" + $("#pdf").data("name");
        subject = t('gestion', 'Your quote')
      }
      //['test@cybercorp.fr' => 'test test']
      var myData = {name: n, subject: subject, to: JSON.stringify(to), content: pdf,folder: $("#theFolder").val()+"/"+ $("#pdf").data("folder")+"/"};
      return myData;
    //doc.save('devis.pdf');
}

