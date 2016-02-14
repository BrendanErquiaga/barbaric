"use strict";

function rampage(){
    wizard.movesTo(5,5);
    wizard.name = 'Nayara';
    wizard.steals(book, 'Candy');
    book.movesTo(3,3);
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/screen-output','scripts/testing','scripts/people'], function() {
        rampage();
    });
});




