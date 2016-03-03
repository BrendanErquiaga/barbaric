"use strict";

var currentMessage = "";

function createNewMessage(newMessage){
    //$('.message').html(newMessage);
    document.getElementById('combat_log').innerHTML = newMessage;
}

function addMessage(message){
    currentMessage = message + "<br>" + currentMessage;
    createNewMessage(currentMessage);
}

function addAttackToLog(attackStatus){
	var messageToSend = '';

	switch(attackStatus.hitStatus){
		case 'dodge':
			messageToSend = attackStatus.target + ' dodged!';
			break;
		case 'parry':
			messageToSend = attackStatus.target + ' parried!';
			break;
		case 'miss':
			messageToSend = 'You missed ' + attackStatus.target;
			break;
		case 'fumble':
			messageToSend = 'You fumbled oh no!';
			break;
		case 'normal':
			messageToSend = 'You hit ' + attackStatus.target + ' ' + attackStatus.damage + ' damage.';
			break;
		case 'crit':
			messageToSend = 'You crit ' + attackStatus.target + ' ' + attackStatus.damage + ' damage!';
			break;
		case 'feat':
			messageToSend = 'You performed an amazing attack! ' + attackStatus.damage + ' damage to ' + attackStatus.target + '!!!';
			break;
	}
	addMessage(messageToSend);
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