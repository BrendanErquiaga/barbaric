

function runTests(){
    conan.addBuff({name:'Dodge', value:2});
    conan.addBuff({name:'Dodge', value:2});
    conan.clearBuffs();
    console.log(conan.getBuff('Dodge'));
    // rollTests();
}

function rollTests(){
    for(var i = 1; i <= 100; i++){
        console.log('Rolled ' + i + ' ' + calculateHitStatus(conan, i, getAttackTableWithCrit(recklessAttackTable,10)));
    }

    for(var i = 1; i <= 100; i++){
        console.log('Rolled ' + rollDie(21));
    }
}