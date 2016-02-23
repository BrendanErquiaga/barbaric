"use strict";

function Item(name, description, type) {

  var itemState = {
    name: name,
    description: description,
    type: type
  };

  return Object.assign(itemState, canBeIdentifiedByName(itemState));
}

function ItemWithStats(name, description, type, stats) {
  var state = {};

  return Object.assign(state, hasStats(state, stats), new Item(name, description, type));
}

function Equipment(name, description, type, slot, stats) {

  var equipmentState = {
    slot: slot
  };

  return Object.assign(equipmentState, new ItemWithStats(name, description, type, stats));
}

function Weapon(name, description, attackInfo, stats){
    var weaponState = {
        attackInfo:attackInfo,

        getWeaponDamage: function (){
            return getRandomInt(attackInfo.min, attackInfo.max + 1);
        }
    };

    return Object.assign(weaponState, new Equipment(name, description, 'weapon','hands', stats));
}

/* Item Types
    Weapon
*/

/* Equipment Slots
    Head
    Neck
    Shoulders
    Chest
    Wrists
    Hands
    Waist
    Legs
    Feet
*/

/* Damage Object
    Min: Minimum Amount of Damage
    Max: Maximum Amoumt of Damage
    Crit: Crit Chance
    Scale: Stat which helps scale damage
*/