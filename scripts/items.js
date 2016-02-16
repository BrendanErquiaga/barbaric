"use strict";

function Item(name, type) {
    var itemState = {
        name: name,
        type: type
        };
    return Object.assign(itemState,
                canBeIdentifiedByName(itemState));
}

function FancyItem(name) {
    var itemState = {
            name: name,
            };
        return Object.assign(itemState,
                    canBeIdentifiedByName(itemState));
}

function FancyEquipment(name, type, slot){
    FancyItem.apply(this, name);
    this.slot = slot;
}
FancyEquipment.prototype = Object.create(FancyItem.prototype);
FancyEquipment.prototype.constructor = FancyEquipment;

function Equipment(name, type, slot) {
    var equipmentState = {
                name: name,
                type: type,
                slot: slot
                };

    return Object.assign(equipmentState,
                    canBeIdentifiedByName(equipmentState));
}