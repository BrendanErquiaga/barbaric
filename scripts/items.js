"use strict";

function Item(name, type) {
    var itemState = {
        name: name,
        type: type
        };
    return Object.assign(itemState,
                canBeIdentifiedByName(itemState));
}

function BasicItem(name, type){
    this.name = name;
    this.type = type;
}

function FancyEquipment(name, type, slot){
    BasicItem.apply(this, [name, type]);
    this.slot = slot;
}
FancyEquipment.prototype = Object.create(BasicItem.prototype);
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