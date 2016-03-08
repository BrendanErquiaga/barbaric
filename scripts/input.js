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
	$('#safeAttackButton').on('click', function () {
    	attemptAction(hero1, hero2, 'Safe','Attack');       
    })

	$('#weaponAttackButton').on('click', function () {
        attemptAction(hero1, hero2, 'Normal','Attack'); 
    })

    $('#recklessAttackButton').on('click', function () {
    	attemptAction(hero1, hero2, 'Reckless','Attack');         
    })
}

function catchDefenseButtonInput(){
	$('#blockButton').on('click', function () {
		attemptAction(hero1, hero2, 'Safe','Defend'); 
    })

    $('#dodgeButton').on('click', function () {
		attemptAction(hero1, hero2, 'Normal','Defend'); 
    })

    $('#parryButton').on('click', function () {
		attemptAction(hero1, hero2, 'Reckless','Defend');       
    })
}

function catchTrickeryButtonInput(){
	$('#confuseButton').on('click', function () {
        attemptAction(hero1, hero2, 'Safe','Trick'); 
    })

    $('#interruptButton').on('click', function () {
        attemptAction(hero1, hero2, 'Normal','Trick');      
    })

    $('#disarmButton').on('click', function () {
        attemptAction(hero1, hero2, 'Reckless','Trick'); 
    })
}