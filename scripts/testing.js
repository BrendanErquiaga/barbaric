function monster(type, hp){
  return {
    type: type,
    hp: hp || 10,
    toString: function(){return this.type;},
    position: {x: 0, y: 0},
    movesTo: function (x, y){
      console.log(this + ' moves to (' + x + ',' + y + ')');
      this.position.x = x;
      this.position.y = y;
    }
  };
}

function stealthyMonster(type, hp){
  var position = {x: 0, y: 0};
  var hp = hp || 5;

  return {
    type: type,
    toString: function(){return 'stealthy ' + this.type;},
    movesTo: function (x, y){
      console.log(this + ' moves stealthily to (' + x + ',' + y + ')');
      // this function closes over (or encloses) the position variable
      // position is NOT part of the object itself, it's a free variable
      // that's why you cannot access it via this.position
      position.x = x;
      position.y = y;
    },
    get hp(){ return hp;},
    get position() { return position; }
  };
}

var tinySpider = monster('tiny spider', /* hp */ 1);
var giantSpider = monster('giant spider', /* hp */ 200);
var darkSpider = stealthyMonster('dark spider', 100);
