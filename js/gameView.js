(function(){
    var SnakeGame = window.SnakeGame = window.SnakeGame || {};

    var View = SnakeGame.View = function($el){
      this.board = new SnakeGame.Board();
      this.$el = $el;
      this.bindListener();
      this.setUpView();
      this.run();
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
      $(".box").empty();
      this.board.snake.segments.forEach(function(segment){
        var row = segment[0];
        var col = segment[1];
        var snakeSeg = $("<div>").text("")
        $(".box.col-"+ col + ".row-" + row).append(snakeSeg);
      });
    };

    View.prototype.step = function(){
      var that = this;
      that.board.snake.move();
      that.checkForSnakes();
      that.addApples();
      View.TURNCOUNT ++;
      console.log(View.TURNCOUNT)
    };

    View.prototype.run = function(){
      var that = this;
      var turnCount = 0;
      setInterval(function(){
        if(!that.board.isOver()){
          that.step();
        }
      }.bind(this), 300);
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
