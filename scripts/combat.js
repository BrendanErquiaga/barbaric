"use strict";

var fumbleCeiling = 1,//These numbers can't add up to more than 100 (though shold leave range for normal hits)
    missCeiling = 10,
    dodgeCap = 20,
    parryCap = 20,
    featCeiling = 100,
    critMultiplier = 2,
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
function calculateHitStatus(target, attackRoll, critChance) {
    var dodgeCeiling = getHitStatusCeiling(target.dexterity,dodgeCap) + missCeiling;
    var parryCeiling = getHitStatusCeiling(target.strength,parryCap) + dodgeCeiling;
    var calculatedCritChance = critChance || 0;
    var critFloor = featCeiling - calculatedCritChance;

    if(attackRoll <= fumbleCeiling){
        return 'fumble';
    } else if (attackRoll <= missCeiling){
        return 'miss';
    } else if (attackRoll <= dodgeCeiling){
        return 'dodge';
    } else if (attackRoll <= parryCeiling){
        return 'parry';
    } else if (attackRoll < critFloor){
        return 'normal'
    } else if (attackRoll === featCeiling){
        return 'feat';
    } else {
        return 'crit';
    }
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

function calculateAttack(target, damage, critChance) {
    var hitStatus = calculateHitStatus(target, rollDie(101), critChance);
    return { damage: calculateDamage(damage, hitStatus),
             hitStatus: hitStatus }
}

function attemptToAttack(attacker, target) {
    var attackerWeapon = attacker.weapon();
    var attackStatus = calculateAttack(target, attackerWeapon.getWeaponDamage(), attackerWeapon.attackInfo.crit);

    console.log('Attack Status: Dmg: ' + attackStatus.damage + ' Hit: ' + attackStatus.hitStatus);
    attacker.attack(target, attackStatus.damage);
}







