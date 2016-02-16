"use strict";

function item(name, type) {
    var itemState = {
        name: name,
        type: type
        };
    return Object.assign({},
                canBeIdentifiedByName(itemState));
}

function equipment(name, type, slot) {
    var equipmentState = {
                name: name,
                type: type,
                slot: slot
                };

    return Object.assign(equipmentState,
                    canBeIdentifiedByName(equipmentState));
}