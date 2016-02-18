"use strict";

function Item(name, type) {
    var itemState = {
        name: name,
        type: type
        };
    return Object.assign(itemState,
                canBeIdentifiedByName(itemState));
}

function ItemWithStats(name, type, stats) {
    var state = {};
    return Object.assign(state,
                hasStats(state,stats),
                new Item(name,type));
}

function Equipment(name, type, slot, stats) {
    var equipmentState = {
                slot: slot
                };

    return Object.assign(equipmentState,
            new ItemWithStats(name,type,stats));
}