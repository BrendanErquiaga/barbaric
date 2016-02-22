"use strict";

function Human(name, title, hp, stats) {
    var equipment,
        name;

    var humanState = {
                name: name,
                title: title,
                equipment: []
                };

    return Object.assign(humanState,
               canBeIdentifiedByName(humanState),
               canBeIdentifiedByTitle(humanState),
               hasHealth(humanState, hp),
               hasStats(humanState, stats),
               canEquipEquipment(humanState));
}