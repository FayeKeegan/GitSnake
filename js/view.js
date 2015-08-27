(function(){
    var SnakeGame = window.SnakeGame = window.SnakeGame || {};

    var View = SnakeGame.View = function($el){
      this.board = new SnakeGame.Board();
      this.$el = $el;
      this.bindListener();
      this.setUpView();
      this.run();
      this.$apple = $("<i>").addClass("fa fa-square apple");
      this.points = 0;
    };

    View.TURNCOUNT = 0;

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
      this.board.snake.segments.forEach(function(segment){
        var row = segment[0];
        var col = segment[1];
        var snakeSeg = $("<i>").addClass("fa fa-github-square snake-segment")
        $(".box.col-"+ col + ".row-" + row).append(snakeSeg);
      });
    };

    View.prototype.clearBoard = function(){
      $(".box").empty();
    }

    View.prototype.displayPoints = function(){
      $("#points").text(this.points)
    };

    View.prototype.checkForApple = function(){
      if (this.board.apple){
        var row = this.board.apple[0];
        var col = this.board.apple[1];
        $(".box.col-" + col + ".row-" + row).append(this.$apple);
      }
    };

    View.prototype.removeApple = function(){
      this.$apple.remove();
      this.board.clearApple();
    };

    View.prototype.step = function(){
      var that = this;
      that.clearBoard();
      that.board.snake.move();
      that.checkForSnakes();
      that.checkForApple();
      // debugger
      if (that.board.appleEaten()){
        // debugger
        that.removeApple();
        that.points = that.points + 1;
        that.displayPoints();

        that.board.snake.grow();
      }
      if (View.TURNCOUNT % 10 === 0 && !that.board.apple){
        that.board.addApple()
        that.hasApple = true;
      }
      View.TURNCOUNT ++;
    };

    View.prototype.run = function(){
      var that = this;
      var turnCount = 0;
      setInterval(function(){
        if(!that.board.isOver()){
          that.step();
        }
      }.bind(this), 150);
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
