(function(){
  var SnakeGame = window.SnakeGame = window.SnakeGame || {};

  var Snake = SnakeGame.Snake = function(segments){
      this.dir = "N";
      this.segments = segments;
  };

  Snake.prototype.move = function(){
    var last = this.segments.pop();
    var first = this.segments[0];
    var diff = Snake.MOVE_DIFFS[this.dir];

    var newPos = [first[0] + diff[0], first[1] + diff[1]];
    this.segments.unshift(newPos);

  };

  Snake.prototype.grow = function(){
    var first = this.segments[0]
    var diff = Snake.MOVE_DIFFS[this.dir];
    var newFirst = [first[0] + diff[0], first[1] + diff[1]]
    this.segments = [newFirst].concat(this.segments)
  }

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };


  Snake.MOVE_DIFFS = {
    "N" : [-1, 0],
    "E" : [0, 1],
    "S" : [1, 0],
    "W" : [0, -1]
  };

})();
