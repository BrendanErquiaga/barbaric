var bob = new Human('bob', 22, 'a builder', 100, {});
var stick = new Equipment('stick', 'weapon', 'hand');
var sword = new Equipment('sword', 'weapon', 'hand');
var fSword = new FancyEquipment('big sword', 'great weapon', 'hand');

function runTests(){
        console.log(Item.prototype);
        console.log(FancyEquipment.prototype);
//    console.log("Beginning tests");
//
//
//    console.log("I made these: " + stick + ', ' + sword);
//    bob.equip(stick);
//    bob.equip(sword);
//    console.log(bob.equipment);
}