(function(){
  var SnakeGame = window.SnakeGame = window.SnakeGame || {};

  var Board = SnakeGame.Board = function(){
    this.grid = [];
    this.setUpGrid();
    this.snake = undefined;
    this.setUpSnake();
    this.apple = [2,9];
  };

  Board.BOARD_SIZE = 15;
  Board.SNAKE_SIZE = 3;
  Board.SNAKE_START = [7, 7];

  Board.prototype.clearApple = function(){
    this.apple = null;
  };

  Board.prototype.setUpGrid = function () {
    for (var i = 0; i < Board.BOARD_SIZE; i++) {
      var row = [];
      for (var j = 0; j < Board.BOARD_SIZE; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
  };

  Board.prototype.checkForSnakeAtPos = function(coords) {
    var x = coords[0];
    var y = coords[1];
    var snakeAtPos = false;
    this.snake.segments.forEach(function(segment){
        if (segment[0] === x && segment[1] === y){
          snakeAtPos = true;
        }
      })
    return snakeAtPos;
  };

  Board.prototype.pickApplePos = function(){
    var randX = Math.floor(Math.random() * Board.BOARD_SIZE);
    var randY = Math.floor(Math.random() * Board.BOARD_SIZE);
    var applePos = [randX, randY];
    return applePos;
  };

  Board.prototype.addApple = function(){
    var newApplePos = this.pickApplePos();
    while (this.checkForSnakeAtPos(newApplePos)){
      newApplePos = pickApplePos();
    }
    this.apple = newApplePos
  };

  Board.prototype.onBoard = function(pos){
    return (pos[0]>= 0 && pos[0] < Board.BOARD_SIZE) && (pos[1]>= 0 && pos[1] < Board.BOARD_SIZE);
  };

  Board.prototype.setUpSnake = function() {
    var startingSegs = [Board.SNAKE_START];
    for (var i = 1; i < Board.SNAKE_SIZE; i ++){
      var nextSeg = [startingSegs[0][0], startingSegs[0][1] + 1];
      startingSegs.unshift(nextSeg);
    }
    this.snake = new SnakeGame.Snake(startingSegs);
  };

  Board.prototype.appleEaten = function(){
    if (this.apple && this.checkForSnakeAtPos(this.apple)){
      return true;
    } else {
      return false;
    }
  };

  Board.prototype.isOver = function(){
    var that = this;
    var over = false;
    var segments = this.snake.segments
    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];
      var nextSeg = segments[i+1];
      if(!that.onBoard(seg)){
                over = true;
      }
      for (var j = i + 1; j < segments.length; j++) {
        var checkSeg = segments[j];
        var count = 0;
        if (checkSeg[0] === seg[0] && checkSeg[1] === seg[1]){
          over = true;
        }
      }
    }
    return over;
  };

})();
