"use strict";

var canBeIdentifiedByName = function canBeIdentifiedByName(state) {
  return {
    changeName: function(newName){
        if(newName != undefined){
            state.name = newName;
        }
    },
    toString: function toString() {
      return state.name;
    }
  };
};

var canBeIdentifiedByTitle = function canBeIdentifiedByTitle(state){
    return {
        fullName: function toString(){
            return state.name + ', ' + state.title;
        }
    }
}

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
        },
        itemInSlot: function itemInSlot(slot) {
            for(var i = 0; i < state.equipment.length; i++){
                if(state.equipment[i].slot == slot){
                    return state.equipment[i];
                }
            }

            return 'Empty';
        },
        firstItemOfType: function firstItemOfType(itemType){
            for(var i = 0; i < state.equipment.length; i++){
                if(state.equipment[i].type == itemType){
                    return state.equipment[i];
                }
            }

            return '';
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

var hasHealthWithStats = function hasHealthWithStats(state){
    return{
        get modifiedCurrentHP() { return state.currentHP + (state.currentHP * state.constitutionModifier)},
        get modifiedMaxHP() { return state.maxHP + (state.maxHP * state.constitutionModifier);}
    };
};

var defaultStatValue = 0, 
    defaultStatModifierDivider = 10;
var hasStats = function hasStats(state, newStats) {
    var stats = newStats,
        charisma = newStats.charisma || newStats.default || defaultStatValue,
        constitution = newStats.constitution || newStats.default ||defaultStatValue,
        dexterity = newStats.dexterity || newStats.default ||defaultStatValue,
        intelligence = newStats.intelligence || newStats.default ||defaultStatValue,
        strength = newStats.strength || newStats.default ||defaultStatValue,
        wisdom = newStats.wisdom || newStats.default ||defaultStatValue;

    return {
        get stats() { return stats; },

        get charisma() { return charisma; },
        get charismaModifier() { return statModifier(charisma); },        
        set charisma(value) { charisma = value; },

        get constitution() { return constitution; },
        get constitutionModifier() { return statModifier(constitution); }, 
        set constitution(value) { constitution = value; },

        get dexterity() { return dexterity; },
        get dexterityModifier() { return statModifier(dexterity); }, 
        set dexterity(value) { dexterity = value},

        get intelligence() { return intelligence; },
        get intelligenceModifier() { return statModifier(intelligence); }, 
        set intelligence(value) { intelligence = value; },

        get strength() { return strength; },
        get strengthModifier() { return statModifier(strength); }, 
        set strength(value) { strength = value; },

        get wisdom() { return wisdom; },
        get wisdomModifier() { return statModifier(wisdom); }, 
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

function statModifier(stat, modifierDivider){
    var dividerToUse = modifierDivider || defaultStatModifierDivider;

    return stat / dividerToUse;
};

var canAttack = function canAttack(state) {
    return {
        attack: function(target, damage) {
            target.currentHP -= damage;
        }
    }
}