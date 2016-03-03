"use strict";

var critMultiplier = 2,
    featMultiplier = 10;

/* Standard Attack Table
    Fumble 1 (Miss Next Attack Round)
    Miss 2-10 Flat 9%
    Dodge X-Y - Dex | Cap 20%
    Parry X-Y  - Strength | Cap 20%
    Normal X-Z
    Crit Z-99 - Attacker Based
    Feat 100 (Insane Damage? Instant Kill?)
*/
var standardAttackTable = {
    fumbleCeiling: 1,
    missCeiling: 9,
    dodgeCap: 20,
    parryCap: 20,
    featCeiling: 100
};

var safeAttackTable = {
    fumbleCeiling: 0,
    missCeiling: 5,
    dodgeCap: 10,
    parryCap: 5,
    featCeiling: 101
};

var recklessAttackTable = {
    fumbleCeiling: 5,
    missCeiling: 20,
    dodgeCap: 20,
    parryCap: 20,
    critChance: 20,
    featCeiling: 98
};


function calculateHitStatus(target, attackRoll, attackTable) {
    var calculatedAttackTable = getCalculatedAttackTable(target, attackTable);

    if(attackRoll <= calculatedAttackTable.fumbleCeiling){
        return 'fumble';
    } else if (attackRoll <= calculatedAttackTable.missCeiling){
        return 'miss';
    } else if (attackRoll <= calculatedAttackTable.dodgeCeiling){
        return 'dodge';
    } else if (attackRoll <= calculatedAttackTable.parryCeiling){
        return 'parry';
    } else if (attackRoll < calculatedAttackTable.critFloor){
        return 'normal'
    } else if (attackRoll >= calculatedAttackTable.featCeiling){
        return 'feat';
    } else {
        return 'crit';
    }
}

function getAttackTableWithCrit(attackTable, critChance) {
    var tempAttackTable = {
        fumbleCeiling: attackTable.fumbleCeiling,
        missCeiling: attackTable.missCeiling,
        dodgeCap: attackTable.dodgeCap,
        parryCap: attackTable.parryCap,
        critChance: attackTable.critChance || 0,
        featCeiling: attackTable.featCeiling
    }, 
    critToAdd = critChance || 0;

    tempAttackTable.critChance += critToAdd;

    return tempAttackTable;
}

function getCalculatedAttackTable(target, attackTable) {
    var tempAttackTable = {
        fumbleCeiling: attackTable.fumbleCeiling,
        missCeiling: attackTable.missCeiling,
        dodgeCap: attackTable.dodgeCap,
        parryCap: attackTable.parryCap,
        critChance: attackTable.critChance || 0,
        featCeiling: attackTable.featCeiling
    };

    tempAttackTable.missCeiling = tempAttackTable.fumbleCeiling + tempAttackTable.missCeiling;//Adjust miss ceiling to account for fumble
    tempAttackTable.dodgeCeiling = getHitStatusCeiling(target.dexterity, tempAttackTable.dodgeCap) + tempAttackTable.missCeiling;//Calculate dodge & adjust to account for miss
    tempAttackTable.parryCeiling = getHitStatusCeiling(target.strength, tempAttackTable.parryCap) + tempAttackTable.dodgeCeiling;//Calculat parry & adjust to account for miss + dodge
    tempAttackTable.critFloor = tempAttackTable.featCeiling - tempAttackTable.critChance;//Adjust crit floor to account for feats

    //console.log(tempAttackTable);

    return tempAttackTable;
}

function getHitStatusCeiling(stat,cap){
    if(stat >= cap)
        return cap;
    else
        return stat;
}

function calculateDamage(damage, hitStatus) {
    switch(hitStatus){
        case 'fumble':
        case 'miss':
        case 'dodge':
        case 'parry':
            return 0;
        case 'crit':
            return damage * critMultiplier;
        case 'feat':
            return damage * featMultiplier;
        default:
            return damage;
    }
}

function calculateAttack(target, damage, attackTable) {
    var hitStatus = calculateHitStatus(target, rollDie(101), attackTable);
    return { damage: calculateDamage(damage, hitStatus),
             hitStatus: hitStatus,
             target: target }
}

function attemptToAttack(attacker, target, attackTable) {
    var attackTableToUse = attackTable || standardAttackTable;
    var attackerWeapon = attacker.weapon();
    attackTableToUse = getAttackTableWithCrit(attackTableToUse, attackerWeapon.attackInfo.crit);

    var attackStatus = calculateAttack(target, 
                       attackerWeapon.getWeaponDamage(), 
                       attackTableToUse);

    //console.log(attackTableToUse);

    //console.log('Attack Status: Dmg: ' + attackStatus.damage + ' Hit: ' + attackStatus.hitStatus);
    attacker.attack(target, attackStatus.damage);
    return attackStatus;
}







