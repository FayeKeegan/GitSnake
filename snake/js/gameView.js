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

    View.prototype.step = function(){
      this.board.snake.move();
      this.board.render();
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
          $box.addClass("box").attr("data-col",j).attr("data-row",i);
          $row.append($box);
        }
      }
    };
})();
