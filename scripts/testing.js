var bob = new Human('bob', 22, 'a builder', 100, {});
var sally = new Human('sally', 12, 'a seller', 500, {});

function runTests(){

    console.log(bob.healthStatus());
    console.log(sally.healthStatus());
    bob.currentHP -= 50;
    console.log(bob.healthStatus());
    console.log(sally.healthStatus());

}