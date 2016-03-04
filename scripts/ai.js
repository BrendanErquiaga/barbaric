"use strict";

var aiSafetyChoice = 'Normal',
	aiActionCategory = 'Defend';

function initAI() {	
	pickAISafety();

	if(!playerTurn){
		takeAIAction();
	}
}

function takeEnemyAction(){
	pickAIActionCategory();
	performAction();
	pickAISafety();	
}

function performAction(){
	switch(aiActionCategory){
		case 'Attack':
			performAttackAction();
			break;
		case 'Defend':
			performDefendAction();
			break;
		case 'Trick':
			performTrickAction();
			break;
	}
}

function performAttackAction(){
	var attackTableToUse;

	switch(aiSafetyChoice){
		case 'Safe':
			attackTableToUse = safeAttackTable;
			break;
		case 'Normal':
			attackTableToUse = standardAttackTable;
			break;
		case 'Reckless':
			attackTableToUse = recklessAttackTable;
			break;
		default:
			attackTableToUse = standardAttackTable;
	}

	addAttackToLog(attemptToAttack(hero2, hero1, attackTableToUse));
}

function performDefendAction(){

}

function performTrickAction(){

}

function pickAISafety(){
	var r = rollDie(4);

	if(r === 1){
		aiSafetyChoice = 'Safe';
	} else if(r === 2) {
		aiSafetyChoice = 'Normal';
	} else {
		aiSafetyChoice = 'Reckless';
	}
}

function pickAIActionCategory() {
	var preferredStat = Math.max(hero2.dexterity, hero2.strength, hero2.intelligence);

	if(takePreferredAction(preferredStat)){
		if(preferredStat === hero2.strength) {
			aiActionCategory = 'Attack';
		} else if(preferredStat === hero2.intelligence){
			aiActionCategory = 'Defend';
		} else {
			aiActionCategory = 'Trick';
		}

		console.log('Taking preferred action which is probably...' + aiSafetyChoice + ' ' + aiActionCategory);
	} else {
		pickRandomAction();

		console.log('We picked a random action which is: ' + aiSafetyChoice + ' ' + aiActionCategory);
	}
}

function pickRandomAction(){
	var r = rollDie(4);

	if(r === 1){
		aiActionCategory = 'Attack';
	} else if(r === 2) {
		aiActionCategory = 'Defend';
	} else {
		aiActionCategory = 'Trick';
	}
}


//Determines if we're taking the preferred action or a random one
function takePreferredAction(preferredStatDiceCheck){
	var r = rollDie(21);

	if(r <= preferredStatDiceCheck){
		return true;
	} else {
		return false;
	}
}