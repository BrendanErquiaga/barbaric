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
    //$(heroDiv + ' .hero_name').text(heroToUse.fullName);
    document.querySelector(heroDiv + '> .hero_name').textContent = heroToUse.fullName();

    //Stats
    //console.log("HN: " + heroNumber);
    document.querySelector(heroDiv + ' .hero_cha').textContent = heroToUse.charisma;
    document.querySelector(heroDiv + ' .hero_con').textContent = heroToUse.constitution;
    document.querySelector(heroDiv + ' .hero_dex').textContent = heroToUse.dexterity;
    document.querySelector(heroDiv + ' .hero_int').textContent = heroToUse.intelligence;
    document.querySelector(heroDiv + ' .hero_str').textContent = heroToUse.strength;
    document.querySelector(heroDiv + ' .hero_wis').textContent = heroToUse.wisdom;

    //Info
    //$(heroDiv + ' .hero_hp').text(heroToUse.modifiedCurrentHP + '/' + heroToUse.modifiedMaxHP);
    document.querySelector(heroDiv + ' .hero_hp').textContent = heroToUse.currentHP + '/' + heroToUse.maxHP;

    var weapon = heroToUse.weapon();
    document.querySelector(heroDiv + ' .hero_weapon').textContent = weapon;
    document.querySelector(heroDiv + ' .hero_weaponInfo').textContent = weapon.description;
    document.querySelector(heroDiv + ' .hero_weaponDamage').textContent = weapon.attackInfo.min + '-' + weapon.attackInfo.max;
}

function catchInput(){

    $('#heroAttackButton').on('click', function () {
        addAttackToLog(attemptToAttack(hero1, hero2));
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




