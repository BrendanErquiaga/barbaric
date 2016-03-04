

function runTests(){
    //conan.addBuff({name:'Dodge', value:5});
    // console.log(conan.getBuff('Dodge'));
    // rollTests();
}

function rollTests(){
    for(var i = 1; i <= 100; i++){
        console.log('Rolled ' + i + ' ' + calculateHitStatus(conan, i, getAttackTableWithCrit(standardAttackTable,10)));
    }

    // for(var i = 1; i <= 100; i++){
    //     console.log('Rolled ' + rollDie(21));
    // }
}