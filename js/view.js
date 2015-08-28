(function(){
    var SnakeGame = window.SnakeGame = window.SnakeGame || {};

    var View = SnakeGame.View = function($el){
      this.$el = $el;
      this.applePoints = 4
      this.$apple = $("<i>").addClass("fa fa-code-fork apple");
      this.points = 0;
      $(".start-button, .restart-button").click(function(){
        this.startGame();
      }.bind(this))
    };

    View.prototype.setupGame= function(){
      $(".snake-game").empty();
      $(".welcome-message, .game-over-message").css({"display": "none"});
      $(".snake-game").css({"display": "block"});
    };

    View.prototype.endGame = function(){
      $(".snake-game").css({"display": "none"});
      $(".game-over-message").css({"display" : "block"});
    };


    View.prototype.startGame = function(){
      this.setupGame();
      this.board = new SnakeGame.Board();
      // this.run();
      this.TURNCOUNT = 0;
      this.bindListener();
      this.setUpView();
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
      $("[number= " + this.points + "]").addClass("level-" + this.applePoints)
    };

    View.prototype.checkForApple = function(){
      if (!this.applePoints){
        this.applePoints = Math.floor(Math.random() * 4 + 1)
      }
      if (this.board.apple){
        var row = this.board.apple[0];
        var col = this.board.apple[1];
        $(".box.col-" + col + ".row-" + row)
          .addClass("has-apple")
          .addClass("level-" + this.applePoints)
          .append(this.$apple);
      }
    };

    View.prototype.removeApple = function(){
      this.$apple.parent().removeClass("has-apple level-" + this.applePoints)
      this.$apple.remove();
      this.applePoints = null;
      this.board.clearApple();
    };

    View.prototype.step = function(){
      var that = this;
      that.clearBoard();
      that.board.snake.move();
      that.checkForSnakes();
      that.checkForApple();
      if (that.board.appleEaten()){
        that.points = that.points + that.applePoints;
        that.displayPoints();
        that.removeApple();

        that.board.snake.grow();
      }
      if (!that.board.apple){
        that.board.addApple()
        that.hasApple = true;
      }
      View.TURNCOUNT ++;
    };

    View.prototype.run = function(){
      var that = this;
      var turnCount = 0;
      var gameTimer = setInterval(function(){
        if(!that.board.isOver()){
          that.step();
        } else {
          clearInterval(gameTimer);
          this.endGame();
        }
      }.bind(this), 100);
    }

    View.prototype.setUpView = function () {
      $(".snake-game").css({"display": "block"})
      var $board = $(".snake-game");
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
