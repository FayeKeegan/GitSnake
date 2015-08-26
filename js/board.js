(function(){
  var SnakeGame = window.SnakeGame = window.SnakeGame || {};

  var Board = SnakeGame.Board = function(){
    this.grid = [];
    this.setUpGrid();
    this.snake = undefined;
    this.setUpSnake();
  };

  Board.BOARD_SIZE = 15;
  Board.SNAKE_SIZE = 3;
  Board.SNAKE_START = [7, 7];

  Board.prototype.setUpGrid = function () {
    for (var i = 0; i < Board.BOARD_SIZE; i++) {
      var row = [];
      for (var j = 0; j < Board.BOARD_SIZE; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
  };

  Board.prototype.render = function(){
    var snakeSegs = this.snake.segments;
    console.log("________________________________")
    for (var i = 0; i < this.grid.length; i++) {
      var printRow = [i];
      for (var j = 0; j < this.grid.length; j++){
        var coord = [i,j];
        var isSnake = false;
        snakeSegs.forEach(function(seg){
          if (seg[0] === i && seg[1] === j) {
            isSnake = true;
          }
        })
        if (isSnake) {
          printRow.push("S");
        } else {
          printRow.push(".");
        }
      }
      console.log(printRow.join(""));
    }

  };

  Board.prototype.onBoard = function(pos){
    return (pos[0]> 0 && pos[0] < Board.BOARD_SIZE) && (pos[1]> 0 && pos[1] < Board.BOARD_SIZE);
  };

  Board.prototype.setUpSnake = function() {
    var startingSegs = [Board.SNAKE_START];
    for (var i = 1; i < Board.SNAKE_SIZE; i ++){
      var nextSeg = [startingSegs[0][0], startingSegs[0][1] + 1];
      startingSegs.unshift(nextSeg);
    }
    this.snake = new SnakeGame.Snake(startingSegs);
  };

  Board.prototype.isOver = function(){
    var that = this;
    var over = false;
    this.snake.segments.forEach(function(segment){
      if(!that.onBoard(segment)){
        over = true;
      }
    });
    return over;

  }

})();
