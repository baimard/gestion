// import {translate as t, translatePlural as n} from '@nextcloud/l10n'
import {FilePicker,showMessage,showError} from "@nextcloud/dialogs";

export function configureDT(){
    $('.editable').attr('title',t('gestion', 'Editable (Click to change)'));
}

export function configureShow(){
    $('.sendmail').attr('title',t('gestion', 'Your global Nextcloud mail server need to be configured'));
}

/**
 * Support de langue pour datatable
 */
export function langage(){
    return ;
}

/**
 * Success message
 */
export function showDone() {
    showMessage(t('gestion', 'Added'));
}

export function checkSelect(el){
    $(el).each(function(arrayID, elem){
        $(elem).find('option').each(function(){ 
            if(this.value==$(elem).data('current')){
                $(this).prop('selected', true)
            }
        })
    })
}