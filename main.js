"use strict";

var hero1,
    hero2;

function setHeroData(){
    $('#hero1_name').text(hero1.fullName);
    $('#hero2_name').text(hero2.fullName);
}

function rampage(){
    runTests();
    heroSetup();
    setHeroData();
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/mixins',
               'scripts/people','scripts/items',
               'scripts/combat','scripts/screen-output',
               'scripts/testing','scripts/heroSetup'], function() {
        rampage();
    });
});




