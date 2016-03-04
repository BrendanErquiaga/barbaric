"use strict";

function Human(name, title, hp, stats) {
    var equipment,
        name;

    var humanState = {
                name: name,
                title: title,
                equipment: [new Weapon('Fists', 'Bare-Knuckled Hands', '5', {})]
                };

    return Object.assign(humanState,
               canBeIdentifiedByName(humanState),
               canBeIdentifiedByTitle(humanState),
               hasStats(humanState, stats),
               hasHealth(humanState,hp),
               hasHealthAndStats(humanState,hp),
               canEquipEquipment(humanState),
               canAttack(humanState),
               hasBuffs(humanState));
}

function AbilityUser(name, title, hp, stats, ability) {
    var abilityUserState = {
        ability: ability
    };

    return Object.assign(abilityUserState, 
      new Human(name, title, hp, stats),
      canUseAbilities(state));
}

function SpellCaster(name, title, hp, stats, mp, spell) {
  var spellCasterState = { 
    mp: mp, 
    spell: spell
  };

  return Object.assign(spellCasterState,
    new Human(name, title, hp, stats),
      canCastSpells(state));
}