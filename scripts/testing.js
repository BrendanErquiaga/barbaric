// function Boy(name,home) {
//  var toyState = {
//      name: name,
//      home: home
//  };
//
//  return Object.assign(toyState,canBeIdentifiedByName(toyState),hasHome(toyState));
// }
//
// function CanadianBoy(name, home) {
//  var canadianToyState = {
//      nationality: 'canadian'
//  };
//
//  return Object.assign(canadianToyState, new Boy(name, home), hasHomeInCanada(canadianToyState));
// }
//
// // Function wiring prototypes to achieve inheritance
// function inherits(Parent, Child) {
//     function F() {}
//     F.prototype = Parent;
//     Child.prototype = new F();
// }
//
// var hasHome = function hasHome(state) {
//  var position = 'somewhere';
//
//  return {
//      getHome: function getHome() {
//          return state.home;
//      },
//
//      goHome: function goHome() {
//          state.position = state.home;
//          console.log(state + ' went to ' + state.getHome());
//      }
//  }
//
//  function createRandomHome(){
//      state.home = getRandomInt(1,101);
//  }
// };
//
// var hasHomeInCanada = function hasHomeInCanada(state) {
//  return {
//      getHome: function getHome() {
//          return state.home + "(That's in canada)";
//      },
//      goHome: function goHome(){
//          hasHome.prototype.goHome.call(this);
//      }
//  };
//
//  function createRandomHome(){
//      hasHome.prototype.createRandomHome(this);
//      console.log("Long live the queen of " + state.home);
//  }
// };
//
// inherits(hasHome,hasHomeInCanada);
//
// //hasHomeInCanada.prototype = Object.create(hasHome.prototype);
//
// var friend = new Boy('Tom', 'Arizona');
// var canadianFriend = new CanadianBoy('Jim', 'Quebec');

function runTests(){
//  console.log('My friend, ' + friend + ', lives in ' + friend.getHome());
//  console.log('My Canadian friend, ' + canadianFriend + ', lives in ' + canadianFriend.getHome());

    for(var i = 1; i <= 100; i++){
        console.log('Rolled ' + i + ' ' + calculateHitStatus(conan, i, getAttackTableWithCrit(recklessAttackTable,10)));
    }
}