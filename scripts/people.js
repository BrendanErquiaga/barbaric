"use strict";

function human(name, age, description, hp, stats) {
    var currentHP,
        maxHP,
        stats,
        equipment;

    var humanState = {
                name: name,
                age: age,
                description: description,
                currentHP: hp,
                maxHP: hp,
                stats: stats,
                equipment: []
                };

    return Object.assign(humanState,
               canBeIdentifiedByName(humanState),
               hasHealth(humanState),
               canEquipItems(humanState));
}
