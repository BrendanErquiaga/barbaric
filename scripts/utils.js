"use strict";

function rollDie(sides){
    return getRandomInt(1,sides);
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

var canBeIdentifiedByName = function canBeIdentifiedByName(state) {
  return {
    toString: function toString() {
      return state.name;
    }
  };
};

var canSteal = function canSteal(state) {
    return {
        steals: function steals(target, item) {
            console.log(state.name + ' steals ' + item + ' from ' + target);
        }
    };
};

var hasHealth = function hasHealth(state) {
    return{
        healthStatus: function healthStatus() {
            var healthPercentage = state.currentHP / state.maxHP;

            if(healthPercentage == 1){
                return 'Full HP';
            } else if(healthPercentage >= 0.75){
                return 'Healthy';
            } else if(healthPercentage >= 0.5){
                return 'Injured';
            } else if(healthPercentage >= 0.25){
                return 'Grievously Injured';
            } else if(healthPercentage > 0){
                return 'Mortally Injured';
            } else {
                return 'Dead';
            }
        }
    }
}

//var canBeDescribedDeadOrAlive = function canBeDescribedDeadOrAlive(state) {
//  return {
//    toString: function toString() {
//      return state.name;
//    }
//  };
//};