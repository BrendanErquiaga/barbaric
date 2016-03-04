"use strict";

function catchInput(){
	catchDefaultButtonInput();
	catchGenericButtonInput();

	if(playerTurn){
		catchAttackButtonInput();
		catchDefenseButtonInput();
		catchTrickeryButtonInput();		
	}
}

function catchGenericButtonInput(){
	$('.backToDefaultButton').on('click', function () {
		currentButtonMode = 'Default';
		updateDisplay();
    })
}

function catchDefaultButtonInput(){
	$('#attackActionsButton').on('click', function () {
		currentButtonMode = 'Attacking';
		updateDisplay();
    })

    $('#defenseActionsButton').on('click', function () {
		currentButtonMode = 'Defending';
		updateDisplay();
    })

    $('#trickeryActionsButton').on('click', function () {
		currentButtonMode = 'Tricking';
		updateDisplay();
    })
}

function catchAttackButtonInput(){
	$('#weaponAttackButton').on('click', function () {
        addAttackToLog(attemptToAttack(hero1, hero2));
        playerActionTaken();
    })

    $('#safeAttackButton').on('click', function () {
    	addAttackToLog(attemptToAttack(hero1, hero2, safeAttackTable));
        playerActionTaken();        
    })

    $('#recklessAttackButton').on('click', function () {
    	addAttackToLog(attemptToAttack(hero1, hero2, recklessAttackTable));
        playerActionTaken();        
    })
}

function catchDefenseButtonInput(){
	$('#blockButton').on('click', function () {
        playerActionTaken();
    })

    $('#dodgeButton').on('click', function () {
        playerActionTaken();        
    })

    $('#parryButton').on('click', function () {
        playerActionTaken();        
    })
}

function catchTrickeryButtonInput(){
	$('#confuseButton').on('click', function () {
        playerActionTaken();
    })

    $('#interruptButton').on('click', function () {
        playerActionTaken();        
    })

    $('#disarmButton').on('click', function () {
        playerActionTaken();        
    })
}