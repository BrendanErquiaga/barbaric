"use strict";

function Human(name, age, description, hp, stats) {
    var stats,
        equipment;

    var humanState = {
                name: name,
                age: age,
                description: description,
                stats: stats,
                equipment: []
                };

    return Object.assign(humanState,
               canBeIdentifiedByName(humanState),
               hasHealth(humanState, hp),
               canEquipEquipment(humanState));
}
