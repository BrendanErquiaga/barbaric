var currentMessage = "";

function createNewMessage(newMessage){
    $('.message').html(newMessage);
}

function addMessage(message){
    currentMessage += "<br>" + message;
    createNewMessage(currentMessage);
}