(function(){
  if (typeof Hanoi === "undefined" ) {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function(game, $el){
    this.game = game;
    this.$el = $el;
    this.setUpTowers();
    this.bindEvents();
    this.firstClick = undefined;
    this.secondClick = undefined;
  };

  View.prototype.bindEvents = function(){
    var that = this;
    $(".tower").click(function(e){
      var $tower = $(e.currentTarget);
      that.clickTower($tower);
    })
  };

  View.prototype.clickTower = function($tower){
    if (typeof this.firstClick === "undefined"){
      this.firstClick = $tower;
    }
    else {
      this.secondClick = $tower;
      var startIdx = this.firstClick.attr("data-tower-num");
      var endIdx = this.secondClick.attr("data-tower-num");
      if (this.game.move(startIdx, endIdx)){
        var moveDisc = this.firstClick.children().last()
        this.firstClick.children().last().remove()
        this.secondClick.append(moveDisc);
        if (this.game.isWon()){
          alert("You win, winner!")
        }
      } else {
        alert("Invalid move!");
      }
      this.firstClick = undefined;
      this.secondClick = undefined;
    }
  }

  View.prototype.setUpTowers = function(){
    var $towers = this.$el;
    for (var i = 0; i < 3; i++) {
      var $tower = $("<div>");
      $tower.addClass("tower")
      $tower.attr("data-tower-num", i);
      if ( i == 0){
        for (var j = 3; j > 0; j--) {
          var $discContainer = $("<div>").addClass("disc-container");
          var $disc = $("<div>").addClass("disc").addClass("size-" + j);
          $tower.append($discContainer);
          $discContainer.append($disc);
        }
      }
      $towers.append($tower);
    }
  };

})();
