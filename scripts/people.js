"use strict";

function human(name, age, description, hp) {
    var currentHP,
        maxHP;

    var humanState = {
                name: name,
                age: age,
                description: description,
                currentHP: hp,
                maxHP: hp};
    return Object.assign(humanState,
               canBeIdentifiedByName(humanState),
               hasHealth(humanState));
}
