//var bob = new Human('bob', 'a builder', 100, {default:20});
//var sally = new Human('sally', 12, 'a seller', 500, {default:10, dexterity: 20, strength: 15});

// var amulet = new ItemWithStats('A Cats Amulet', 'necklace', {dexterity: 5});
// var shield = new Equipment('Shield of faith', 'shield', 'hand', {constitution: 5});
// var sword = new Weapon('Big Sword', 30, {strength: 5});

function Boy(name,home) {
	var toyState = {
		name: name,
		home: home
	};

	return Object.assign(toyState,canBeIdentifiedByName(toyState),hasHome(toyState));
}

function CanadianBoy(name, home) {
	var canadianToyState = {
		nationality: 'canadian'
	};

	return Object.assign(canadianToyState, new Boy(name, home), hasHomeInCanada(canadianToyState));
}

var hasHome = function hasHome(state) {
	var position = 'somewhere';
	
	return {
		getHome: function getHome() {
			return state.home;
		},

		goHome: function goHome() {
			state.position = state.home;
			console.log(state + ' went to ' + state.getHome());
		}
	}
};

var hasHomeInCanada = function hasHomeInCanada(state) {
	return {
		getHome: function getHome() {
			return state.home + "(That's in canada)";
		}
	};
};

var friend = new Boy('Tom', 'Arizona');
var canadianFriend = new CanadianBoy('Jim', 'Quebec');

function runTests(){
	console.log('My friend, ' + friend + ', lives in ' + friend.getHome());
	console.log('My Canadian friend, ' + canadianFriend + ', lives in ' + canadianFriend.getHome());

	// for(var i = 1; i <= 101; i++){
	// 	console.log('Rolled ' + i + ' ' + calculateHitStatus(conan, i, 10));
	// }
}