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
            //console.log(state + ' dropped ' + itemToDrop + ' ...');
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
        },
        weapon: function weapon(){
            return state.firstItemOfType('weapon');
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
        healthPercentage: function healthPercentage(){
            return state.currentHP / state.maxHP;
        },
        healthStatus: function healthStatus() {
            var healthPercentage = state.healthPercentage();
            console.log('Checking ' + state +"'s HP: "  + state.currentHP + '/' + state.maxHP + '=' + healthPercentage);

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

var hasHealthAndStats = function hasHealthAndStats(state, hp) {
    var currentHP = hp,
        maxHP = hp,
        baseHP = hp;

    return {
        get baseHP() { return baseHP; },
        get currentHP() {
            return currentHP + (currentHP * state.constitutionModifier); 
        },
        set currentHP(value) { 
            currentHP = value;
        },
        get maxHP() {
            return maxHP + (maxHP * state.constitutionModifier); 
        },
        set maxHP(value) {
            maxHP = value;
        }
    }
}

var hasBuffs = function hasBuffs(state) {
    var buffs = [];

    return {
        getBuff: function getBuff(buffName) {
            for(var i = 0; i < buffs.length; i++){
                if(buffName === buffs[i].name){
                    return buffs[i];
                }
            }

            buffs.push({name: buffName, value: 0});

            return buffs[buffs.length - 1];
        },
        addBuff: function addBuff(buffToAdd) {
            state.getBuff(buffToAdd.name).value += buffToAdd.value;
        },

        clearBuffs: function clearBuffs() {
            buffs.length = 0;
        }
    }
}



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
        },
        weaponAttack: function(target, weapon){
            var weaponDamage = weapon.getWeaponDamage();

            console.log(state + ' attacks ' + target + ' with ' + weapon + ' for ' + weaponDamage);

            target.currentHP -= weaponDamage;
        }
    }
}

var canUseAbilities = function canUseAbilities(state) {
    return {
        activateAbility: function(ability, target) {
            ability.activate(target);

            console.log("You sure activated that ability guy");
        }
    }
}

var canCastSpells = function canCastSpells(state) {
    return {
        castSpell: function(spell, target) {
            if(state.mp >= spell.mp) {
                spell.cast(target);
                state.mp--;
            }
        }
    }
}










