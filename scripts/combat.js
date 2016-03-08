"use strict";

var critMultiplier = 2,
    featMultiplier = 10,
    blockDamageReduction = 0.6;

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
    parryCap: 15,
    featCeiling: 100
};

var safeAttackTable = {
    fumbleCeiling: 0,
    missCeiling: 5,
    dodgeCap: 10,
    parryCap: 5,
    featCeiling: 101,
    critChanceMultiplier: 0.5
};

var recklessAttackTable = {
    fumbleCeiling: 5,
    missCeiling: 20,
    dodgeCap: 30,
    parryCap: 30,
    featCeiling: 98,
    critChanceMultiplier: 2
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
    } else if (attackRoll <= calculatedAttackTable.blockCeiling){
        return 'block';
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
        critChanceMultiplier: attackTable.critChanceMultiplier || 1,
        featCeiling: attackTable.featCeiling
    }, 
    critToAdd = critChance || 0;

    tempAttackTable.critChance += critToAdd;
    tempAttackTable.critChance *= tempAttackTable.critChanceMultiplier;

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
    tempAttackTable.dodgeCeiling = getHitStatusCeiling(target.dexterity, tempAttackTable.dodgeCap, target.getBuff('Dodge').value) + tempAttackTable.missCeiling;//Calculate dodge & adjust to account for miss
    tempAttackTable.parryCeiling = getHitStatusCeiling(target.strength/2, tempAttackTable.parryCap, target.getBuff('Parry').value) + tempAttackTable.dodgeCeiling;//Calculat parry & adjust to account for miss + dodge
    tempAttackTable.blockCeiling = target.getBuff('Block').value + tempAttackTable.parryCeiling;
    tempAttackTable.critFloor = tempAttackTable.featCeiling - tempAttackTable.critChance;//Adjust crit floor to account for feats

    //console.log(tempAttackTable);

    return tempAttackTable;
}

function getHitStatusCeiling(stat,cap, buffValue){
    if(stat >= cap)
        return cap + buffValue;
    else
        return stat + buffValue;
}

function calculateDamage(damage, hitStatus) {
    switch(hitStatus){
        case 'fumble':
        case 'miss':
        case 'dodge':
        case 'parry':
            return 0;
        case 'block':
            return Math.round(damage * blockDamageReduction);
        case 'crit':
            return Math.round(damage * critMultiplier);
        case 'feat':
            return Math.round(damage * featMultiplier);
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

    if(attackStatus.hitStatus === 'fumble'){
        attacker.addBuff({name: 'Fumbled', value: 1, duration: 1});
    }

    //console.log('Attack Status: Dmg: ' + attackStatus.damage + ' Hit: ' + attackStatus.hitStatus);
    attacker.attack(target, attackStatus.damage);
    return attackStatus;
}







