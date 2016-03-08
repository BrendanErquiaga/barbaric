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

function attemptAction(actor, actee, safetyMode, actionType){
	var attackAlterations = checkForActionAlterations(actor);

	if(attackAlterations == "None"){
		takeAction(actor, actee, safetyMode, actionType);
	} else if(attackAlterations == "Confused"){
		
		var randomAction = getRandomAction(),
			randomSafety = getRandomActionSafety();

		console.log(actor + ' is confused... guess they are taking a random action: ' + randomSafety + ' ' + randomAction);
		takeAction(actor, actee, randomSafety, randomAction);
	} else if(attackAlterations == "Fumbled") {
		console.log("Yo, " + actor + " fumbled, guess they get no action!");
		//DO NOTHING
	} else {
		console.log("WTF is this alteration? " + attackAlterations);
	}

	actionTaken(); 
}

function takeAction(actor, actee, safetyMode, actionType){
	switch(actionType){
		case 'Attack':
			attackAction(actor,actee,safetyMode);
			break;
		case 'Defend':
			defendAction(actor,actee,safetyMode);
			break;
		case 'Trick':
			trickAction(actor,actee,safetyMode);
	}
}

function attackAction(actor, actee, safetyMode) {
	var attackTableToUse = getSafetyOption(safetyMode, safeAttackTable, standardAttackTable, recklessAttackTable);

	addAttackToLog(attemptToAttack(actor, actee, attackTableToUse));
}

var defaultBlockValue = 50,
	defaultDodgeValue = 10,
	defaultParryValue = 5;

function defendAction(actor, actee, safetyMode) {
	var buff = getSafetyOption(safetyMode, 
				{name: 'Block', value: defaultBlockValue}, 
				{name: 'Dodge', value: defaultDodgeValue},
				{name: 'Parry', value: defaultParryValue});

	actor.addBuff(buff);
}

function trickAction(actor, actee, safetyMode) {
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

	//console.log('actorRoll: ' + actorRoll + ' vs ' + acteeRoll + ' :acteeRoll');

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

function disarm(dismarmer, disarmee){
	disarmee.dropEquipment(disarmee.weapon());

	console.log(dismarmer + ' disarmed ' + disarmee);
}

function checkForActionAlterations(actor) {
	if(actor.getBuff('Fumbled').value >= 1){
		return 'Fumbled';
	} else if(actor.getBuff('Confused').value >= 1) {

		return 'Confused';
	}

	return 'None';
}

function getRandomActionSafety(){
	var r = rollDie(4);

	if(r === 1){
		return 'Safe';
	} else if(r === 2) {
		return 'Normal';
	} else {
		return 'Reckless';
	}
}

function getRandomAction(){
	var r = rollDie(4);

	if(r === 1){
		return 'Attack';
	} else if(r === 2) {
		return 'Defend';
	} else {
		return 'Trick';
	}
}



