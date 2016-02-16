var bob = new Human('bob', 22, 'a builder', 100, {});
var stick = new Item('stick', 'toy');
var sword = new Equipment('fSword', 'weapon', 'hand');
//var fSword = new FancyEquipment('big sword', 'great weapon', 'hand');

function runTests(){
        console.log('You have a ' + stick);
        console.log('It has some properties', stick);

        console.log('You have a ' + sword);
        console.log('It has some properties', sword);
//    console.log("Beginning tests");
//
//
//    console.log("I made these: " + stick + ', ' + sword);
//    bob.equip(stick);
//    bob.equip(sword);
//    console.log(bob.equipment);
}