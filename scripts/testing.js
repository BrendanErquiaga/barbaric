var bob = new Human('bob', 22, 'a builder', 100, {});
var sally = new Human('sally', 12, 'a seller', 500, {dexterity: 20, strength: 15});

function runTests(){

    bob.constitution = 20;
    console.log('Stats for ' + bob + "\n" + bob.statString());
    console.log('Stats for ' + sally + "\n" + sally.statString());

}