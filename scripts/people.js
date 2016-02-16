"use strict";

function Human(name, age, description, hp, stats) {
    var equipment;

    var humanState = {
                name: name,
                age: age,
                description: description,
                equipment: []
                };

    return Object.assign(humanState,
               canBeIdentifiedByName(humanState),
               hasHealth(humanState, hp),
               hasStats(humanState, stats),
               canEquipEquipment(humanState));
}
