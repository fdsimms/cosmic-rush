(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }
   var GameView = SpaceInvaders.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
  };

  GameView.prototype.start = function () {
    var interval = setInterval(function () {
      if (!this.game.aliens[0]) {
        clearInterval(interval);
        alert('You win!!!');
      }
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
    requestAnimationFrame(this.animate.bind(this));
    this.game.startAlienFire();
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('left', function(){
      if (Math.sign(this.game.ship.vel[0]) === 1) {
        this.game.ship.unpower.call(this.game.ship);
      }
      this.game.ship.power.call(this.game.ship, [-6, 0]);
    }.bind(this));
    key('right', function(){
      if (Math.sign(this.game.ship.vel[0]) === -1) {
        this.game.ship.unpower.call(this.game.ship);
      }
      this.game.ship.power.call(this.game.ship, [6, 0]);
    }.bind(this));
    key('space', function(){
      this.game.ship.fireBullet.call(this.game.ship);
    }.bind(this));
  };

  GameView.prototype.animate = function (currentTime) {
    var delta = currentTime - this.lastTime;

    this.game.moveObjects(delta);
    this.lastTime = currentTime;
    requestAnimationFrame(this.animate.bind(this));
  };

})();
