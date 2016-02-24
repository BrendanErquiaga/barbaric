"use strict";

var currentMessage = "";

function createNewMessage(newMessage){
    //$('.message').html(newMessage);
    document.getElementById('combat_log').innerHTML = newMessage;
}

function addMessage(message){
    currentMessage += "<br>" + message;
    createNewMessage(currentMessage);
}

function addAttackToLog(attackStatus){
	addMessage(attackStatus.hitStatus + ': ' + attackStatus.damage);
}