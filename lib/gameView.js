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

      if (!this.game.aliens[0] && !this.game.paused) {
        this.game.curLevel++;
      }

      if (document.hasFocus() && !this.game.paused) {
        this.game.step();
      }
      this.game.draw(this.ctx);

    }.bind(this), 20);

    if (document.hasFocus() && !this.game.paused) {
      this.bindKeyHandlers();
      this.game.addAliens(this.alienImages);
      this.game.startAlienFire();
      requestAnimationFrame(this.animate.bind(this));
    }
  };

  GameView.prototype.endGame = function () {
    this.game.isOver = true;
    var screenModal = document.getElementsByClassName("screen-cover")[0];
    var gameOverModal = document.getElementsByClassName("game-over-modal")[0];
    $(gameOverModal).addClass("displayed");
    $(gameOverModal).removeClass("hidden");
    $(screenModal).addClass("displayed");
    $(screenModal).removeClass("hidden");
    this.bindEndHandler();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.interval);
  };

  GameView.prototype.bindEndHandler = function () {
    var screenCover = document.getElementsByClassName("screen-cover")[0],
        gameOverModal = document.getElementsByClassName("game-over-modal")[0];

    key('enter', function () {
      this.stop();
      this.game = new SpaceInvaders.Game(this.shipImages, this.alienImages, 1);
      this.game.paused = false;
      this.start();
      key.unbind('enter');
      $(gameOverModal).addClass("hidden");
      $(screenCover).addClass("hidden");
    }.bind(this));
  };


  GameView.prototype.bindStartHandler = function () {
    var screenCover = document.getElementsByClassName("screen-cover")[0],
        startModal = document.getElementsByClassName("start-modal")[0],
        instructionsModal = document.getElementsByClassName("instructions-modal")[0];

    key('enter', function () {
      $(instructionsModal).addClass("displayed-instructions");
      $(instructionsModal).removeClass("hidden-instructions");
      setTimeout(function () {
        $(instructionsModal).addClass("hidden-instructions");
        $(instructionsModal).removeClass("displayed-instructions");
      }, 5000);

      this.game.paused = false;
      this.stop();
      this.start();
      key.unbind('enter');
      $(startModal).addClass("hidden");
      $(screenCover).addClass("hidden");
    }.bind(this));
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

    key('p', function(){
      var playButton = document.getElementById("play-button");
      $(playButton).trigger("click");
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

    if (document.hasFocus() && !this.game.paused) {
      this.game.moveObjects(delta);
    }
    this.lastTime = currentTime;
    requestAnimationFrame(this.animate.bind(this));
  };

})();
