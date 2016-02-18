var bob = new Human('bob', 22, 'a builder', 100, {default:10});
var sally = new Human('sally', 12, 'a seller', 500, {default:10, dexterity: 20, strength: 15});

var amulet = new ItemWithStats('A Cats Amulet', 'necklace', {dexterity: 5});
var shield = new Equipment('Shield of faith', 'shield', 'hand', {constitution: 5});

function runTests(){

    bob.constitution = 20;
    console.log('Stats for ' + bob + "\n" + bob.statString());
    console.log('Stats for ' + sally + "\n" + sally.statString());
    console.log('Stats for ' + amulet + "\n" + amulet.statString());
    console.log('Stats for ' + shield + "\n" + shield.statString());
}