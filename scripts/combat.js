"use strict";

var fumbleCeiling = 1,//These numbers can't add up to more than 100 (though shold leave range for normal hits)
    missCeiling = 10,
    dodgeCap = 20,
    parryCap = 20,
    featCeiling = 100;

/* Standard Attack Table
    Fumble 1 (Miss Next Attack Round)
    Miss 2-10 Flat 9%
    Dodge X-Y - Dex | Cap 20%
    Parry X-Y  - Strength | Cap 20%
    Normal X-Z
    Crit Z-99 - Attacker Based
    Feat 100 (Insane Damage? Instant Kill?)
*/
function calculateHitTable(target, attackRoll, critChance) {
    var dodgeCeiling = getAttackCeiling(target.dexterity,dodgeCap) + missCeiling;
    var parryCeiling = getAttackCeiling(target.strength,parryCap) + dodgeCeiling;
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

function getAttackCeiling(stat,cap){
    if(stat >= cap)
        return cap;
    else
        return stat;
}





