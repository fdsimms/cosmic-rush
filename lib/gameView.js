(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }
   var GameView = SpaceInvaders.GameView = function (game, ctx, shipImages, alienImages) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
    this.alienImages = alienImages;
    this.shipImages = shipImages;
  };

  GameView.prototype.start = function () {
    if (!localStorage.cosmicRushHighScore) {
      localStorage.setItem("cosmicRushHighScore", 0);
    }
    this.interval = setInterval(function () {
      if (this.game.gameOver()) {
        this.endGame();
      }
      if (!this.game.aliens[0]) {
        this.game.curLevel++;
        this.game.addAliens(this.alienImages);
      }

      if (document.hasFocus()) {
        this.game.step();
        this.game.draw(this.ctx);
      }

    }.bind(this), 20);
    requestAnimationFrame(this.animate.bind(this));
    this.game.startAlienFire();
  };

  GameView.prototype.endGame = function () {
    this.stop();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.interval);
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('left', function(){
      if (Math.sign(this.game.ship.vel[0]) === 1) {
        this.game.ship.unpower.call(this.game.ship);
      }
      this.game.ship.power.call(this.game.ship, [-6, 0]);
    }.bind(this));

    key('up', function(){
      if (Math.sign(this.game.ship.vel[0]) === 1) {
        this.game.ship.unpower.call(this.game.ship);
      }
      this.game.ship.power.call(this.game.ship, [0, -4]);
    }.bind(this));

    key('down', function(){
      if (Math.sign(this.game.ship.vel[0]) === 1) {
        this.game.ship.unpower.call(this.game.ship);
      }
      this.game.ship.power.call(this.game.ship, [0, 4]);
    }.bind(this));

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

    this.spaceHandler();
  };

  GameView.prototype.spaceHandler = function () {
    key('space', function (){
        this.game.ship.fireBullet.call(this.game.ship);
        key.unbind('space');
      setTimeout(function () {
        this.spaceHandler();
      }.bind(this), 750);
    }.bind(this));
  };

  GameView.prototype.animate = function (currentTime) {
    var delta = currentTime - this.lastTime;

    if (document.hasFocus()) {
      this.game.moveObjects(delta);
    }
    this.lastTime = currentTime;
    requestAnimationFrame(this.animate.bind(this));
  };

})();
