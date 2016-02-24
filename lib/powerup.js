(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Powerup = SpaceInvaders.Powerup = function (options) {
    options.color = Powerup.COLOR;
    this.game = options.game;
    options.pos = options.pos;
    options.vel = options.vel;
    this.effect = options.effect;
    options.radius = Powerup.RADIUS;
    this.tick = 0;

    SpaceInvaders.MovingObject.call(this, options);
  };

  SpaceInvaders.Util.inherits(Powerup, SpaceInvaders.MovingObject);

  Powerup.prototype.draw = function (ctx) {
    if (this.game.isOver) { return; }
    ctx.fillStyle = this.color;
    var y = this.pos[1];
    ctx.fillRect(this.pos[0], y, 2, height);
    if (!this.game.paused) {
      this.tick++;
    }
  };

  Powerup.prototype.isCollidedWith = function (otherObject) {
    var pos = this.pos,
        otherPos = otherObject.pos,
        radius = this.radius,
        otherRadius = otherObject.radius;

    if (otherObject instanceof SpaceInvaders.Ship &&
        SpaceInvaders.Util.rectCircCollision(this, otherObject)) {

      this.game.remove(this);
      // otherObject.hit();
    }
  };


  Powerup.COLOR = "blue";
  Powerup.RADIUS = 4;
})();
