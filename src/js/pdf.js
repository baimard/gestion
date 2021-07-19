import $ from 'jquery';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

import {generateUrl} from "@nextcloud/router";
import { showMessage } from "@nextcloud/dialogs";

var baseUrl = generateUrl('/apps/gestion');

$('body').on('click', '#pdf', function(){
    showMessage("Generation en cours ...");
    capture();
});


function capture() {
    $('.bootstrap-iso').css('width', '900px')
    $('.bootstrap-iso').css('padding-right', '20px')
    $('.bootstrap-iso').css('padding-left', '20px')
    // console.log(html2canvas($('.bootstrap-iso')[0]))
    html2canvas($('.bootstrap-iso')[0], {
        scrollY: -window.scrollY,
        dpi: 600,
    }).then((canvas) => {
        genPDF(canvas.toDataURL("image/png"), canvas);
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
      if($("#factureid").length){
        n = "/FACTURE_" + $("#pdf").data("name");
      }else{
        n = "/DEVIS_" + $("#pdf").data("name");
      }

      var myData = {content: pdf,folder: $("#theFolder").val()+"/"+ $("#pdf").data("folder"), name: n};

      $.ajax({
          url: baseUrl + '/savePDF',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(myData)
      }).done(function (response) {
        //   console.log('canvas response');
        showMessage('Sauvegarde dans : <a href="' + $("#theFolder").val()+"/"+ $("#pdf").data("folder") + '">ici</a>');
      }).fail(function (response, code) {
        showMessage('Il y a une erreur');
          error(response);
      });

    //doc.save('devis.pdf');
}

