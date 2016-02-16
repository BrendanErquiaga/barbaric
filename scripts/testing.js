var bob = new Human('bob', 22, 'a builder', 100, {});
var stick = new Equipment('stick', 'toy', 'hand');
var sword = new Equipment('fSword', 'weapon', 'hand');
//var fSword = new FancyEquipment('big sword', 'great weapon', 'hand');

function runTests(){
    console.log("Beginning tests");


    console.log("I made these: " + stick + ', ' + sword);
    bob.equip(stick);
    bob.equip(sword);
    console.log(bob.equipment);
}