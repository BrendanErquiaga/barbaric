"use strict";

var heroes = [];

var conan = new Human('Conan', 'The Barbarian', 80, {default: 10, strength: 15, constitution: 13});
var gandalf = new Human('Gandalf', 'The Grey', 55, {default: 10, intelligence: 15, wisdom: 13});
var deadpool = new Human('Deadpool', 'The Merc With The Mouth', 200, {default: 10, constitution: 15, dexterity: 13});
var snape = new Human('Snape', 'The Deceiver', 50, {default: 10, charisma: 15, intelligence: 13});
var hercules = new Human('Hercules', 'The Demigod', 75, {default: 10, strength: 20, intelligence: 5});
var spiderman = new Human('Spiderman', 'The Webslinger', 40, {default: 10, dexterity: 15, strength: 13});

conan.equip(theAtlanean);

function heroSetup(){
    loadHeroes();
    getTwoHeroes();
    determineStartingPlayer();
    initAI();
}

function loadHeroes(){
    //heroes.push(conan,gandalf,deadpool,snape,hercules,spiderman);
    heroes.push(conan);
}

function getTwoHeroes(){
    hero1 = getRandomHero();
    hero2 = getRandomHero();

    if(hero1.name === hero2.name){
        if(getRandomInt(0,2) === 1){
            hero1 = setDarkHero(hero1);
        } else {
            hero2 = setDarkHero(hero2);
        }        
    }
}

function getRandomHero(){
    var randomIndex = getRandomInt(0,heroes.length);

    return heroes[randomIndex];
}

function setDarkHero(hero){
    var newHero = new Human('Evil ' + hero.name, hero.title, hero.baseHP, hero.stats);
    newHero.equipment = hero.equipment;
    return newHero;
}

function determineStartingPlayer(){
    var hero1Roll = rollDie(21),
        hero2Roll = rollDie(21);

    hero1Roll += hero1.dexterityModifier;
    hero2Roll += hero2.dexterityModifier;

    if(hero1Roll > hero2Roll){
        playerTurn = true;
    }
}