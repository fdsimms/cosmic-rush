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
    this.game.startAlienFire();
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('left', function(){
      if (Math.sign(this.game.ship.vel[0]) === 1) {
        this.game.ship.unpower.call(this.game.ship);
      }
      this.game.ship.power.call(this.game.ship, [-3, 0]);
    }.bind(this));
    key('right', function(){
      if (Math.sign(this.game.ship.vel[0]) === -1) {
        this.game.ship.unpower.call(this.game.ship);
      }
      this.game.ship.power.call(this.game.ship, [3, 0]);
    }.bind(this));
    key('space', function(){
      this.game.ship.fireBullet.call(this.game.ship);
    }.bind(this));
  };

})();
