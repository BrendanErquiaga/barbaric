

function runTests(){
    //conan.addBuff({name:'Block', value:75});
    conan.dexterity = 19;
    conan.strength = 20;
    //rollTests();
    //conan.addBuff({name: 'Fumbled', value: 1, duration: 1});
}

function rollTests(){
    for(var i = 1; i <= 100; i++){
        console.log('Rolled ' + i + ' ' + calculateHitStatus(conan, i, getAttackTableWithCrit(standardAttackTable,10)));
    }

    // for(var i = 1; i <= 100; i++){
    //     console.log('Rolled ' + rollDie(21));
    // }
}