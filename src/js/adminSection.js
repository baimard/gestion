import { backup } from "./modules/ajaxRequest.js";

window.addEventListener("DOMContentLoaded", function () {
    var back = document.getElementById("backup");
    back.addEventListener("click", function(){
        backup();
    });
});