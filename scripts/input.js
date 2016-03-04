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
    	attackAction(hero1, hero2, 'Safe');       
    })

	$('#weaponAttackButton').on('click', function () {
        attackAction(hero1, hero2, 'Normal');
    })

    $('#recklessAttackButton').on('click', function () {
    	attackAction(hero1, hero2, 'Reckless');        
    })
}

function catchDefenseButtonInput(){
	$('#blockButton').on('click', function () {
		defendAction(hero1, hero2, 'Safe');
    })

    $('#dodgeButton').on('click', function () {
		defendAction(hero1, hero2, 'Normal');
    })

    $('#parryButton').on('click', function () {
		defendAction(hero1, hero2, 'Reckless');      
    })
}

function catchTrickeryButtonInput(){
	$('#confuseButton').on('click', function () {
        trickAction(hero1, hero2, 'Safe');
    })

    $('#interruptButton').on('click', function () {
        trickAction(hero1, hero2, 'Normal');       
    })

    $('#disarmButton').on('click', function () {
        trickAction(hero1, hero2, 'Reckless');
    })
}