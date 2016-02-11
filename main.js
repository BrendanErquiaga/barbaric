
function rampage(){
    $('.message').text("rampage!");
}

$(document).ready(function() {
    requirejs(['scripts/people'], function() {
        rampage();
    });
});




