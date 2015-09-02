(function(){
    var SnakeGame = window.SnakeGame = window.SnakeGame || {};

    var View = SnakeGame.View = function($el){
      this.$el = $el;
      this.applePoints = 4
      this.$apple = $("<i>").addClass("fa fa-code-fork apple");
      this.$bug = $("<i>").addClass("fa fa-bug bug");
      this.points = 0;
      $(".start-button, .restart-button").click(function(){
        this.startGame();
      }.bind(this))
    };

    View.prototype.setupGame= function(){
      $(".commit-box").removeClass("level-1 level-2 level-3 level-4 current-day")
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
      this.streak = {};
      this.streakCount = 0;
      this.longestStreakCount = 0;
      View.TURNCOUNT = 0;
      View.DAYCOUNT = 0;
      this.run();
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
        $(".box.col-"+ col + ".row-" + row).append(snakeSeg).addClass("has-snake");
      });
    };

    View.prototype.clearBoard = function(){
      $(".box").empty().removeClass("has-snake");
    }

    View.prototype.displayPoints = function(){
      $("#points").text(this.points)
      $(".commit-box.current-day").addClass("level-" + this.applePoints)
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

     View.prototype.checkForBug = function(){
      if (this.board.bug){
        var row = this.board.bug[0];
        var col = this.board.bug[1];
        $(".box.col-" + col + ".row-" + row)
          .addClass("has-bug")
          .addClass("level-" + this.bugPoints)
          .append(this.$bug);
      }
    };

    View.prototype.removeBug = function(){
      this.$bug.parent().removeClass("has-bug level-" + this.bugPoints)
      this.$bug.remove();
      this.board.clearbug();
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
      that.checkForSnakes();
      that.checkForApple();
      that.checkForBug();
      if (!this.streak[View.DAYCOUNT] && !this.streak[View.DAYCOUNT - 1]){
        this.streakCount = 0;
      }
      if (that.board.appleEaten()){
        if (View.DAYCOUNT === 1 || this.streak[View.DAYCOUNT - 1]){
          if (!this.streak[View.DAYCOUNT]){
            this.streakCount ++ ;
          }
        } else {
          this.streakCount = 1;
        }
        this.streak[View.DAYCOUNT] = true;
        if (this.streakCount > this.longestStreakCount){
          this.longestStreakCount = this.streakCount;
        }
        that.points = that.points + that.applePoints;
        that.displayPoints();
        that.removeApple();
        that.board.snake.grow();
      } else {
        that.board.snake.move();
      }
      if (!that.board.apple){
        that.board.addApple()
        that.hasApple = true;
      }

      if (View.TURNCOUNT % 20 === 0){
        that.board.clearBug();
        that.board.addBug();
      }
      $(".commit-box[number=" + View.DAYCOUNT + "]").removeClass("current-day");
      View.TURNCOUNT ++;
      this.setDayCount();
      $(".commit-box[number=" + View.DAYCOUNT +  "]").addClass("current-day");
      $("#longest-streak").text(this.longestStreakCount);
      $("#current-streak").text(this.streakCount);
    };

    View.prototype.setDayCount = function(){
      View.DAYCOUNT = View.TURNCOUNT < 30 ? 1 : Math.floor(View.TURNCOUNT / 15) + 1
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
      }.bind(this), 175);
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
