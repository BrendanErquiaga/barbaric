var bob = new human('bob', 22, 'a builder', 100, {});
var stick = new equipment('stick', 'weapon', 'hand');
var sword = new equipment('sword', 'weapon', 'hand');

function runTests(){
    console.log("Beginning tests");


    console.log("I made these: " + stick + ', ' + sword);
    bob.equip(stick);
    bob.equip(sword);
    console.log(bob.equipment);
}