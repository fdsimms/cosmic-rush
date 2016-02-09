(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }
   var GameView = SpaceInvaders.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('left', function(){
      this.game.ship.power.call(this.game.ship, [-1, 0]);
    }.bind(this));
    key('right', function(){
      this.game.ship.power.call(this.game.ship, [1, 0]);
    }.bind(this));
    key('space', function(){
      this.game.ship.fireBullet.call(this.game.ship);
    }.bind(this));
  };

})();
