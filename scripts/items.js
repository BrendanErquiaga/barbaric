"use strict";

function Item(name, type) {
    var itemState = {
        name: name,
        type: type
        };
    return Object.assign(itemState,
                canBeIdentifiedByName(itemState));
}

function Equipment(name, type, slot) {
    var equipmentState = {
                slot: slot
                };

    return Object.assign(equipmentState, new Item(name,type));
}