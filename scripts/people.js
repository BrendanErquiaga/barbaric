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
               hasHealthWithStats(humanState,hp),
               canEquipEquipment(humanState),
               canAttack(humanState));
}