import $ from 'jquery';

import {generateUrl} from "@nextcloud/router";
var baseUrl = generateUrl('/apps/gestion');

$('body').on('click', '.menu', function(){
    $('#menu-'+this.dataset.menu).toggleClass('open');
});

$('body').on('click', '.editable', function(){
    $(this).attr('contenteditable', 'true');
});

$('body').on('blur', '.editable', function(){
    updateDB($(this).data('table'), $(this).data('column'), $(this).text(), $(this).data('id'));
    $(this).attr('contenteditable', 'false');
    $(this).removeAttr('contenteditable');
});

function updateDB(table, column, data, id){
    console.log(table)
    console.log(column)
    console.log(data)
    console.log(id)

    var myData = {
        table: table,
        column: column,
        data: data,
        id: id,
    };

    $.ajax({
        url: baseUrl+'/client/update',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(myData)
    }).done(function (response, code) {
        console.log(response);
        console.log(code);
    }).fail(function (response, code) {
        console.log(code);
    });
}