"use strict";

var hero1,
    hero2;

function rampage(){
    runTests();
    heroSetup();
    updateDisplay();
    catchInput();
}

function updateDisplay(){
    updateHeroData();
}

function updateHeroData(){
    updateHeroFields(hero1,1);
    updateHeroFields(hero2,2);
}

function updateHeroFields(heroToUse, heroNumber) {
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
    //$(heroDiv + ' .hero_hp').text(heroToUse.modifiedCurrentHP + '/' + heroToUse.modifiedMaxHP);
    $(heroDiv + ' .hero_hp').text(heroToUse.currentHP + '/' + heroToUse.maxHP);

    var weapon = heroToUse.weapon();
    $(heroDiv + ' .hero_weapon').text(weapon);
    $(heroDiv + ' .hero_weaponInfo').text(weapon.description);
    $(heroDiv + ' .hero_weaponDamage').text(weapon.attackInfo.min + '-' + weapon.attackInfo.max);
}

function catchInput(){

    $('#heroAttackButton').on('click', function () {
        attemptToAttack(hero1, hero2);
        playerActionTaken();
    })

    $('#heroDodgeButton').on('click', function () {
        playerActionTaken();        
    })

    $('#heroUseItemButton').on('click', function () {
        playerActionTaken();        
    })

    $('#heroRandomActionButton').on('click', function () {
        playerActionTaken();
    })
}

function playerActionTaken(){
    //Take AI Action
    updateDisplay();
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/mixins',
               'scripts/people','scripts/items',
               'scripts/combat','scripts/screen-output',
               'scripts/testing','scripts/itemSetup',
               'scripts/heroSetup', 'scripts/bootstrap'], function() {
        rampage();
    });
});




