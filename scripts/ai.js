"use strict";

var aiSafetyChoice = 'Normal',
	aiActionCategory = 'Defend';

function initAI() {	
	getRandomActionSafety();

	if(!playerTurn){
		takeAIAction();
	}
}

function takeAIAction(){
	pickAIActionCategory();

	performAction();

	aiSafetyChoice = getRandomActionSafety();
}

function performAction(){
	attemptAction(hero2,hero1, aiSafetyChoice, aiActionCategory);
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
	} else {
		aiActionCategory = getRandomAction();
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