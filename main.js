function rampage(){
    tinySpider.movesTo(10,10);
    console.log('tiny - ',tinySpider.position);

    darkSpider.movesTo(5,5);
    console.log('dark hp - ',darkSpider.hp);
}

$(document).ready(function() {
    requirejs(['scripts/utils','scripts/screen-output','scripts/testing','scripts/people'], function() {
        rampage();
    });
});




