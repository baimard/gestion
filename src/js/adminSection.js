import { backup } from "./modules/ajaxRequest.mjs";

window.addEventListener('DOMContentLoaded', function () {
    var back = document.getElementById('backup');
    back.addEventListener('click', function(){
        backup();
    });
});