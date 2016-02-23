"use strict";

function rollDie(sides){
    return getRandomInt(1,sides);
}

//Can never = max number
function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}