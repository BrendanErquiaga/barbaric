"use strict";

function rampage(){
    wizard.movesTo(5,5);
    console.log(wizard.name + ' has a name');

    book.movesTo(3,3);
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/screen-output','scripts/testing','scripts/people'], function() {
        rampage();
    });
});




