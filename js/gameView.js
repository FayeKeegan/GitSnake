(function(){
    var SnakeGame = window.SnakeGame = window.SnakeGame || {};

    var View = SnakeGame.View = function($el){
      this.board = new SnakeGame.Board();
      this.$el = $el;
      this.bindListener();
      this.setUpView();
      this.run();
    };

    View.prototype.bindListener = function () {
      var that = this;
      $(document).keydown(function(e){
        if (e.keyCode === 37){
          that.board.snake.dir = "W";
        } else if (e.keyCode === 38){
          that.board.snake.dir = "N";
        } else if (e.keyCode === 39){
          that.board.snake.dir = "E";
        } else if (e.keyCode === 40){
          that.board.snake.dir = "S";
        }
      });
    };

    View.prototype.checkForSnakes = function(){
      $(".box").removeClass("occupied");
      this.board.snake.segments.forEach(function(segment){
        var row = segment[0];
        var col = segment[1];
        $(".box.col-"+ col + ".row-" + row).addClass("occupied");
      });
    };

    View.prototype.step = function(){
      var that = this;
      this.board.snake.move();
      that.checkForSnakes();
    };

    View.prototype.run = function(){
      var that = this;
      setInterval(function(){
        if(!that.board.isOver()){
          that.step();
        }
      }, 500);
    }

    View.prototype.setUpView = function () {
      var $board = this.$el;
      for (var i = 0; i < this.board.grid.length; i++) {
        var $row = $("<div>");
        $board.append($row);
        for (var j = 0; j < this.board.grid.length; j++) {
          var $box = $("<div>");
          $box.addClass("box").addClass("col-" + j).addClass("row-" + i);
          $row.append($box);
        }
      }
    };
})();
