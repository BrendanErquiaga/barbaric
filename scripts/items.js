"use strict";

function item(name, type) {
    var itemState = {
        name: name,
        type: type
        };
    return Object.assign({},
                canBeIdentifiedByName(itemState));
}