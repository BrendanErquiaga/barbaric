function rollDie(sides){
    return getRandomInt(1,sides);
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}