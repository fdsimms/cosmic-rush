(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Bullet = SpaceInvaders.Bullet = function (options) {
    options.color = Bullet.COLOR;
    this.ship = options.ship;
    this.alien = options.alien;
    this.type = options.type;
    this.game = options.game;
    options.pos = options.pos;
    options.vel = options.vel;
    options.radius = Bullet.RADIUS;

    SpaceInvaders.MovingObject.call(this, options);
  };
  SpaceInvaders.Util.inherits(Bullet, SpaceInvaders.MovingObject);

  Bullet.prototype.isCollidedWith = function (otherObject) {
    var pos = this.pos,
        otherPos = otherObject.pos,
        radius = this.radius,
        otherRadius = otherObject.radius;

    if (SpaceInvaders.Util.dist(pos, otherPos) < (radius + otherRadius) &&
        otherObject instanceof SpaceInvaders.Alien &&
        this.type === "shipBullet") {
      this.game.remove(this);
      this.game.remove(otherObject);
    } else if (SpaceInvaders.Util.dist(pos, otherPos) < (radius + otherRadius) &&
        otherObject instanceof SpaceInvaders.Ship &&
        this.type === "alienBullet") {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };


  Bullet.COLOR = "#f00";
  Bullet.RADIUS = 5;
  Bullet.POS = [SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y - 11];


})();
