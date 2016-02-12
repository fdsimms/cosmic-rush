(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Bullet = SpaceInvaders.Bullet = function (options) {
    this.ship = options.ship;
    this.alien = options.alien;
    this.type = options.type;
    if (this.type === "alienBullet") {
      options.color = Bullet.ALIEN_COLOR;
      this.height = 15;
    } else {

      options.color = Bullet.SHIP_COLOR;
      this.height = 15;
    }
    this.width = 2;
    this.game = options.game;
    options.pos = options.pos;
    options.vel = options.vel;
    options.radius = Bullet.RADIUS;
    this.tick = 0;

    SpaceInvaders.MovingObject.call(this, options);
  };
  SpaceInvaders.Util.inherits(Bullet, SpaceInvaders.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    if (this.game.isOver) { return; }
    ctx.fillStyle = this.color;
    var height = this.height,
        y = this.pos[1];
    if (this.type ==="shipBullet") {
      if (this.vel[1] > -12) {
        this.vel[1] -= 0.1 * this.tick / 5;
      }
      height += this.tick * 1.2;
    }
    ctx.fillRect(this.pos[0], y, 2, height);
    this.tick++;
  };

  Bullet.prototype.isCollidedWith = function (otherObject) {
    var pos = this.pos,
        otherPos = otherObject.pos,
        radius = this.radius,
        otherRadius = otherObject.radius;

    if (SpaceInvaders.Util.rectCircCollision(this, otherObject) &&
        otherObject instanceof SpaceInvaders.Alien &&
        this.type === "shipBullet") {
          this.game.remove(otherObject);
          this.game.remove(this);
          this.game.addPoints();
    } else if (otherObject instanceof SpaceInvaders.Ship &&
              this.type === "alienBullet" &&
              SpaceInvaders.Util.rectCircCollision(this, otherObject)) {

      this.game.remove(this);
      otherObject.hit();
    }
  };


  Bullet.ALIEN_COLOR = "#f00";
  Bullet.SHIP_COLOR = "#0e0";
  Bullet.RADIUS = 1;
})();
