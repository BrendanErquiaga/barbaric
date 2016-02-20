"use strict";

var heroes = [];

var conan = new Human('Conan', 'The Barbarian', 100, {default: 10, strength: 15, constitution: 13});
var gandalf = new Human('Gandalf', 'The Wizard', 75, {default: 10, intelligence: 15, wisdom: 13});
var deadpool = new Human('Deadpool', 'The Undying', 500, {default: 10, constitution: 15, dexterity: 13});
var snape = new Human('Snape', 'The Deceiver', 75, {default: 10, charisma: 15, intelligence: 13});
var hercules = new Human('Hercules', 'The Demigod', 150, {default: 10, strength: 20, intelligence: 5});
var spiderman = new Human('Spiderman', 'The Webslinger', 150, {default: 10, dexterity: 15, strength: 13});

function heroSetup(){
    loadHeroes();
    getTwoHeroes();
}

function loadHeroes(){
    heroes.push(conan,gandalf,deadpool,snape,hercules,spiderman);
    //heroes.push(snape,hercules);
}

function getTwoHeroes(){
    hero1 = getRandomHero();
    hero2 = getRandomHero();

    if(hero1.name === hero2.name){

        setDarkHero(hero2);
    }
}

function getRandomHero(){
    var randomIndex = getRandomInt(0,heroes.length);

    return heroes[randomIndex];
}

function setDarkHero(hero){

    console.log("name asdaschsssange or something");
    var newHero = new Human('Evil ' + hero.name, hero.title, hero.maxHP, hero.stats);
    hero2 = newHero;
}