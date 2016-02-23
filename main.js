"use strict";

var hero1,
    hero2;

function rampage(){
    runTests();
    heroSetup();
    setHeroData();
    catchInput();
}

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
    $(heroDiv + ' .hero_hp').text(heroToUse.modifiedCurrentHP + '/' + heroToUse.modifiedMaxHP);

    var weapon = heroToUse.firstItemOfType('weapon');
    $(heroDiv + ' .hero_weapon').text(weapon);
    $(heroDiv + ' .hero_weaponInfo').text(weapon.description);
    $(heroDiv + ' .hero_weaponDamage').text(weapon.damage.min + '-' + weapon.damage.max);
}

function catchInput(){

    $('#heroAttackButton').on('click', function () {
        hero1.weaponAttack(hero2, hero1.firstItemOfType('weapon'));
    })

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




