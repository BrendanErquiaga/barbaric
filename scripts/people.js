"use strict";

var canBeIdentifiedByName = {
    toString: function toString() {
        return this.name;
    }
};

var canBeDescribed = {
    shortDescription: 'a short description',
    longerDescription: 'a much longer description'
};

var canBePositioned = {
    position: { x: 0, y: 0 },
    movesTo: function movesTo(x, y) {
        console.log(this + ' moves from (' + this.position.x + ', ' + this.position.y + ') to (' + x + ', ' + y + ')');
        this.position.x = x;
        this.position.y = y;
    }
};

var canSteal = function canSteal(state) {
    return {
        steals: function steals(target, item) {
            console.log(state.name + ' steals ' + item + ' from ' + target);
        }
    };
};

function human(name, race, hp) {
    var humanState = {
        name,
        race,
        hp};
    return Object.assign(
               canBeIdentifiedByName,
               canBeDescribed,
               canBePositioned,
               canSteal(humanState));
}

function item(name, type) {
    var itemState = {
        name: name,
        type: type
        };
    return Object.assign(
                canBeIdentifiedByName,
                canBeDescribed,
                canBePositioned);
}

var wizard = new human('Naya', 'Ygri', 100);

var book = new item('Spellbook', 'Data');