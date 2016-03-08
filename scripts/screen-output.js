"use strict";

var currentCombatLogMessage = "";

function updateCenterLog() {
	var turnText = 'Your Turn';
	if(!playerTurn){
		turnText = 'Enemy Turn';
	}

	turnText += ' | Turn ' + turnCounter.toString();
	document.querySelector('#turn_info').textContent = turnText;
}

function updateMessage(newMessage){
    //$('.message').html(newMessage);
    document.getElementById('combat_log').innerHTML = newMessage;
}

function addMessage(message){
    currentCombatLogMessage = getSpan() + message + "</span><br>" + currentCombatLogMessage;
    updateMessage(currentCombatLogMessage);
}

function addAttackToLog(attackStatus){
	var messageToSend = '',
		attacker = 'You',
		target = attackStatus.target;

	if(!playerTurn){
		attacker = hero2;
		target = 'You';
	}

	switch(attackStatus.hitStatus){
		case 'dodge':
			messageToSend += target + ' dodged!';
			break;
		case 'parry':
			messageToSend += target + ' parried!';
			break;
		case 'miss':
			messageToSend += attacker + ' missed ' + target;
			break;
		case 'fumble':
			messageToSend += attacker + ' fumbled oh no!';
			break;
		case 'normal':
			messageToSend += attacker + ' hit ' + target + ', ' + attackStatus.damage + ' damage';
			break;
		case 'block':
			messageToSend += target + ' blocked ' + attacker + ', only ' + attackStatus.damage + ' damage taken';
			break;
		case 'crit':
			messageToSend += attacker + ' crit ' + target + ', ' + attackStatus.damage + ' damage!';
			break;
		case 'feat':
			messageToSend += attacker + ' performed an amazing attack! ' + attackStatus.damage + ' damage to ' + target + '!!!';
			break;
	}
	addMessage(messageToSend);
}

// function addToAILog(message) {
// 	var currentAILog = document.getElementById('ai_log').innerHTML;
// 	currentAILog = '<span class="bg-primary">' + message + '</span><br>' + currentAILog;

// 	document.getElementById('ai_log').innerHTML = currentAILog;
// }

function getSpan(){
	if(playerTurn){
		return '<span class="player">';
	} else {
		return '<span class="ai">';
	}
}

function updateHeroData(){
    updateHeroFields(hero1,1);
    updateHeroFields(hero2,2);
}

function updateHeroFields(heroToUse, heroNumber) {
    var heroDiv;

    if(heroNumber === 1){
        heroDiv = '#hero1_div';
    } else {
        heroDiv = '#hero2_div';
    }

    //Name
    //$(heroDiv + ' .hero_name').text(heroToUse.fullName);
    document.querySelector(heroDiv + '> .hero_name').textContent = heroToUse.fullName();

    //Stats
    //console.log("HN: " + heroNumber);
    document.querySelector(heroDiv + ' .hero_cha').textContent = heroToUse.charisma;
    document.querySelector(heroDiv + ' .hero_con').textContent = heroToUse.constitution;
    document.querySelector(heroDiv + ' .hero_dex').textContent = heroToUse.dexterity;
    document.querySelector(heroDiv + ' .hero_int').textContent = heroToUse.intelligence;
    document.querySelector(heroDiv + ' .hero_str').textContent = heroToUse.strength;
    document.querySelector(heroDiv + ' .hero_wis').textContent = heroToUse.wisdom;

    //Info
    //$(heroDiv + ' .hero_hp').text(heroToUse.modifiedCurrentHP + '/' + heroToUse.modifiedMaxHP);
    document.querySelector(heroDiv + ' .hero_hp').textContent = heroToUse.currentHP + '/' + heroToUse.maxHP;

    document.querySelector(heroDiv + ' .hero_weapon').textContent = heroToUse.weapon();
    document.querySelector(heroDiv + ' .hero_weaponInfo').textContent = heroToUse.weapon().description;
    document.querySelector(heroDiv + ' .hero_weaponDamage').textContent = heroToUse.weapon().attackInfo.min + '-' + heroToUse.weapon().attackInfo.max;
}


function drawPlayerButtons(){
	switch(currentButtonMode){
		case 'Default':
			enableButtonGroup('default_player_buttons');
			break;
		case 'Attacking':
			enableButtonGroup('attack_player_buttons');
			break;
		case 'Defending':
			enableButtonGroup('defense_player_buttons');
			break;
		case 'Tricking':
			enableButtonGroup('trickery_player_buttons');
			break;			
	}
}

function hideAllPlayerButtons(){
	document.getElementById('default_player_buttons').classList.remove('hidden');
	document.getElementById('attack_player_buttons').classList.remove('hidden');
	document.getElementById('defense_player_buttons').classList.remove('hidden');
	document.getElementById('trickery_player_buttons').classList.remove('hidden');

	document.getElementById('default_player_buttons').classList.add('hidden');
	document.getElementById('attack_player_buttons').classList.add('hidden');
	document.getElementById('defense_player_buttons').classList.add('hidden');
	document.getElementById('trickery_player_buttons').classList.add('hidden');
}

function enableButtonGroup(idOfButtonGroup){
	hideAllPlayerButtons();
	document.getElementById(idOfButtonGroup).classList.remove('hidden');
}