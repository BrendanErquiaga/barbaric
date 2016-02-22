"use strict";

var hero1,
    hero2;

function setHeroData(){
    setHeroFields(hero1,1);
    setHeroFields(hero2,2);
}

function setHeroFields(heroToUse, heroNumber) {
    var heroDiv;

    if(heroNumber === 1){
        heroDiv = '#hero1_div';
    } else {
        heroDiv = '#hero2_div';
    }

    //Name
    $(heroDiv + ' .hero_name').text(heroToUse.fullName);

    //Stats
    $(heroDiv + ' .hero_cha').text(heroToUse.charisma);
    $(heroDiv + ' .hero_con').text(heroToUse.constitution);
    $(heroDiv + ' .hero_dex').text(heroToUse.dexterity);
    $(heroDiv + ' .hero_int').text(heroToUse.intelligence);
    $(heroDiv + ' .hero_str').text(heroToUse.strength);
    $(heroDiv + ' .hero_wis').text(heroToUse.wisdom);

    //Info
    $(heroDiv + ' .hero_hp').text(heroToUse.healthStatus);

    var weapon = heroToUse.firstItemOfType('weapon');
    $(heroDiv + ' .hero_weapon').text(weapon);
    $(heroDiv + ' .hero_weaponInfo').text(weapon.description);
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




