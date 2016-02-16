"use strict";

var canBeIdentifiedByName = function canBeIdentifiedByName(state) {
  return {
    toString: function toString() {
      return state.name;
    }
  };
};

var hasHealth = function hasHealth(state, hp) {
    var currentHP = hp,
            maxHP = hp;

    return{
        get currentHP() { return currentHP; },
        set currentHP(value) { currentHP = value;},
        get maxHP() { return maxHP; },
        set maxHP(value) { maxHP = value;},

        healthStatus: function healthStatus() {
            var healthPercentage = state.currentHP / state.maxHP;

            console.log('Checking ' + state +"'s HP: "  + currentHP + '/' + maxHP + '=' + healthPercentage);

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
    };
};

var canEquipEquipment = function canEquipEquipment(state){
    return {
        dropEquipment: function dropEquipment(itemToDrop){
            console.log(state + ' dropped ' + itemToDrop + ' ...');
            var index = state.equipment.indexOf(itemToDrop);
            state.equipment.splice(index -1, 1);
        },

        equip: function equip(itemToEquip){
            for(var i = 0; i < state.equipment.length; i++){
                if(state.equipment[i].slot == itemToEquip.slot){
                    state.dropEquipment(state.equipment[i]);
                    break;
                }
            }

            state.equipment.push(itemToEquip);
            console.log(state + ' equipped the ' + itemToEquip);
        }
    };
};