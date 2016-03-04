"use strict";

var hero1,
    hero2,
    currentButtonMode = 'Default',
    playerTurn = false;

function rampage(){
    runTests();
    heroSetup();
    updateDisplay();    
    catchInput();
}

function updateDisplay(){
    updateHeroData();
    updateCenterLog();
    drawPlayerButtons();
}

function playerActionTaken(){
    updateDisplay();    
    takeAIAction();
    updateDisplay(); 
}

function advanceTurn(){
    if(playerTurn){
        hero2.clearBuffs();
    } else {
        hero1.clearBuffs();
    }

    playerTurn = !playerTurn;
    //console.log("Currently it is the players turn: " + playerTurn);
}

function takeAIAction() {
    //Take Delay
    //Display Delay
    takeEnemyAction();
    playerTurn = true;
    updateDisplay();
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/mixins',
               'scripts/people','scripts/items',
               'scripts/combat','scripts/screen-output',
               'scripts/testing','scripts/itemSetup',
               'scripts/heroSetup', 'scripts/bootstrap',
               'scripts/input','scripts/ai',
               'scripts/actions'], function() {
        rampage();
    });
});




