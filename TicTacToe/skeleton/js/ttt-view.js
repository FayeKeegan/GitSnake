(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $(".box").click(function(e){
      var $box = $(e.currentTarget);
      if($box.hasClass("selected")) {
        alert("Invalid move!");
      }
      else {
        that.makeMove($box);
        if(that.game.isOver()){
          if(that.game.winner()) {
            alert("Congratulations " + that.game.winner().toUpperCase() + "!!")
          }
          else {
            alert("Nobody wins")
          }
        }
      }
    })
  };

  View.prototype.makeMove = function ($box) {
    var mark = this.game.currentPlayer;
    var $div_mark = $("<div>" + mark + "</div>");
    $div_mark.addClass("mark").addClass(mark);
    $box.append($div_mark);
    $box.addClass("selected")
    var row = parseInt($box.attr("data-row"));
    var col = parseInt($box.attr("data-col"));
    this.game.playMove([row, col]);
  };

  View.prototype.setupBoard = function () {
    var $board = this.$el;
    for (var i = 0; i < 3; i++) {
      var $row = $("<div>");
      $board.append($row);
      for (var j = 0; j < 3; j++) {
        var $box = $("<div>");
        $box.addClass("box").attr("data-col",j).attr("data-row",i);
        $row.append($box);
      }
    }
  };

})();
