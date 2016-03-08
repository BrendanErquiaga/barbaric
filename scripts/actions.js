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
						 {actorValue: actor.dexterity, 
						 	acteeValue: 16 + actee.strengthModifier + actee.dexterityModifier + 
						 	actee.intelligenceModifier + actee.wisdomModifier});

		var actorRoll = rollDie(11),
			acteeRoll = rollDie(11);

		actorRoll += statCheck.actorValue;
		acteeRoll += statCheck.acteeValue;

		console.log('actorRoll: ' + actorRoll + ' vs ' + acteeRoll + ' :acteeRoll');

		if(actorRoll > acteeRoll){
			

			var trickOption = getSafetyOption(safetyMode, 
								{name: 'Confused', value: 1, duration: 1}, 
								{name: 'Fumbled', value: 1, duration: 1},
								'disarm');

			if(safetyMode === 'Reckless'){
				disarm(actor,actee);
			} else {
				console.log('Congrats ' + actor + ' successfully ' + trickOption.name + ' ' + actee);
				actee.addBuff(trickOption);
			}
		}
	}

	actionTaken();
}

function disarm(dismarmer, disarmee){
	disarmee.dropEquipment(disarmee.weapon());

	console.log(dismarmer + ' disarmed ' + disarmee);
}

function checkAction(actor) {
	if(actor.getBuff('Fumbled').value >= 1){
		console.log(actor + ' fumbled, no turn for them!');
		return false;
	}

	return true;
}



