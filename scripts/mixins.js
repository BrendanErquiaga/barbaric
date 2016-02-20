"use strict";

var canBeIdentifiedByName = function canBeIdentifiedByName(state) {
  return {
    toString: function toString() {
      return state.name;
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

var hasHealth = function hasHealth(state, hp) {
    var currentHP = hp,
            maxHP = hp;

    return {
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

var defaultStatValue = 0;
var hasStats = function hasStats(state, newStats) {
    var charisma = newStats.charisma || newStats.default || defaultStatValue,
        constitution = newStats.constitution || newStats.default ||defaultStatValue,
        dexterity = newStats.dexterity || newStats.default ||defaultStatValue,
        intelligence = newStats.intelligence || newStats.default ||defaultStatValue,
        strength = newStats.strength || newStats.default ||defaultStatValue,
        wisdom = newStats.wisdom || newStats.default ||defaultStatValue;

    return {
        get charisma() { return charisma; },
        set charisma(value) { charisma = value; },

        get constitution() { return constitution; },
        set constitution(value) { constitution = value; },

        get dexterity() { return dexterity; },
        set dexterity(value) { dexterity = value},

        get intelligence() { return intelligence; },
        set intelligence(value) { intelligence = value; },

        get strength() { return strength; },
        set strength(value) { strength = value; },

        get wisdom() { return wisdom; },
        set wisdom(value) { wisdom = value; },

        statString: function() {
        return ('Cha: ' + state.charisma + ',' +
                'Con: ' + state.constitution + ',' +
                'Dex: ' + state.dexterity + ',' +
                'Int: ' + state.intelligence + ',' +
                'Str: ' + state.strength + ',' +
                'Wis: ' + state.wisdom);
        }
    };
};

var canAttack = function canAttack(state) {
    return {
        attack: function(target, damage) {
            target.currentHP -= damage;
        }
    }
}