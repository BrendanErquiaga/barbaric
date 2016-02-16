"use strict";

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
    };
};

var canEquipItems = function canEquipItems(state){
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