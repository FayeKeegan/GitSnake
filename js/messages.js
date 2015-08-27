(function(){
    var SnakeGame = window.SnakeGame = window.SnakeGame || {};

    var Messages = SnakeGame.Messages = function($el){
      this.board = new SnakeGame.Board();
      this.$el = $el;
      this.bindListener();
      this.setUpView();
      this.run();
    };

    Messages.prototype.welcomeMessage = function () {
      var welcomeMessage = $("div").text("WELCOME TO SNAKE").addClass("welcome-message")
      this.$el.append()
    };
})();
