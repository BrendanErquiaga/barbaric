"use strict";

function rampage(){
    runTests();
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/people','scripts/items','scripts/screen-output','scripts/testing'], function() {
        rampage();
    });
});




