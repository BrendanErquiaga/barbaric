"use strict";

function rampage(){
    runTests();
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/screen-output','scripts/testing','scripts/people','scripts/items'], function() {
        rampage();
    });
});




