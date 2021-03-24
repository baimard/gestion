import $ from 'jquery';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

$('body').on('click', '#pdf', function(){
    capture();
});


function capture() {
    $('.bootstrap-iso').css('width', '900px')
    html2canvas($('.bootstrap-iso')[0], {
        scrollY: -window.scrollY,
        dpi: 600,
    }).then((canvas) => {
        genPDF(canvas.toDataURL("image/png"), canvas);
    });
    $('.bootstrap-iso').css('width', '')
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

    doc.save('devis.pdf');
}