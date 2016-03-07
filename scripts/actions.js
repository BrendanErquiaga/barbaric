"use strict";

function actionTaken(){
	if(playerTurn){
		advanceTurn();
		playerActionTaken();
	} else {
		advanceTurn();
	}
}

function getSafetyOption(safetyMode, safeOption, normalOption, recklessOption){
	switch(safetyMode){
		case 'Safe':
			return safeOption;
		case 'Normal':
			return normalOption;
		case 'Reckless':
			return recklessOption;
		default:
			return normalOption;
	}
}

function attackAction(actor, actee, safetyMode) {
	if(checkAction(actor)){
		var attackTableToUse = getSafetyOption(safetyMode, safeAttackTable, standardAttackTable, recklessAttackTable);

		addAttackToLog(attemptToAttack(actor, actee, attackTableToUse));
	}

	actionTaken();
}

var defaultBlockValue = 50,
	defaultDodgeValue = 10,
	defaultParryValue = 5;

function defendAction(actor, actee, safetyMode) {
	if(checkAction(actor)){
		var buff = getSafetyOption(safetyMode, 
					{name: 'Block', value: defaultBlockValue}, 
					{name: 'Dodge', value: defaultDodgeValue},
					{name: 'Parry', value: defaultParryValue});

		actor.addBuff(buff);
	}

	actionTaken();
}

function trickAction(actor, actee, safetyMode) {
	if(checkAction(actor)){
		var statCheck = getSafetyOption(safetyMode,
						 {actorValue: actor.charisma, acteeValue: actee.intelligenceModifier},
						 {actorValue: actor.wisdom, acteeValue: actee.wisdom},
						 {actorValue: (actor.dexterity / 2), acteeValue: actee.strength});

		var actorRoll = rollDie(11),
			acteeRoll = rollDie(11);

		actorRoll += statCheck.actorValue;
		acteeRoll += statCheck.acteeValue;

		console.log('actorRoll: ' + actorRoll + ' vs ' + acteeRoll + ' :acteeRoll');

		if(actorRoll > acteeRoll){
			console.log('Congrats ' + actor + ' successfully confused/interrupted/disarmed ' + actee);
		}
	}

	actionTaken();
}

function checkAction(actor) {
	if(actor.getBuff('Fumbled').value >= 1){
		console.log(actor + ' fumbled, no turn for them!');
		return false;
	}

	return true;
}



