var bob = new Human('bob', 22, 'a builder', 100, {default:20});
//var sally = new Human('sally', 12, 'a seller', 500, {default:10, dexterity: 20, strength: 15});

// var amulet = new ItemWithStats('A Cats Amulet', 'necklace', {dexterity: 5});
// var shield = new Equipment('Shield of faith', 'shield', 'hand', {constitution: 5});
// var sword = new Weapon('Big Sword', 30, {strength: 5});

function runTests(){
    for(var attackRoll = 1; attackRoll <= 100; attackRoll++){
        var attackStatus = calculateAttack(bob, 10, 50);
        //console.log('Attacking bob, hitStatus: ' + attackStatus.hitStatus + '. Dmg: ' + attackStatus.damage);
    }
}