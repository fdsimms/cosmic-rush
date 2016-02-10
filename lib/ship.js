(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Ship = SpaceInvaders.Ship = function (options) {
    options.color = Ship.COLOR;
    options.pos = Ship.POS;
    options.vel = Ship.VEL;
    options.radius = Ship.RADIUS;
    this.image = options.image;
    this.tick = 0;

    SpaceInvaders.MovingObject.call(this, options);
  };
  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

  Ship.prototype.draw = function (ctx) {
    var coords = [29, 58, 87],
        slowedTick = Math.floor(this.tick / 6);
    ctx.fillStyle = "#ddd";
    ctx.fillRect(this.pos[0] - this.radius,this.pos[1] - this.radius - 10, 47, 47);

    ctx.drawImage(this.image,
      coords[slowedTick % 3],0, 30,100,
      this.pos[0] - this.radius ,this.pos[1] - this.radius -25, 25, 100
    );

    this.tick++;
  };

  Ship.prototype.move = function (delta) {
    delta = delta || 1;
    if (this.pos[0] <= 0) {
      this.pos[0] = SpaceInvaders.Game.DIM_X;
    } else if (this.pos[0] >= SpaceInvaders.Game.DIM_X) {
      this.pos[0] = 0;
    }

    this.pos[0] += this.vel[0] * delta / 20;
    this.pos[1] += this.vel[1] * delta / 20;
  };

  Ship.prototype.isCollidedWith = function (otherObject) {
    var pos = this.pos,
        otherPos = otherObject.pos,
        radius = this.radius,
        otherRadius = otherObject.radius;
    if (SpaceInvaders.Util.dist(pos, otherPos) < (radius + otherRadius) &&
        otherObject instanceof SpaceInvaders.Alien ||
        otherObject.type === "alienBullet") {
      this.game.remove(otherObject);
    }
  };

  Ship.prototype.power = function (impulse) {
    if (this.vel[0] < 6 && this.vel[0] > -6) {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }
    var interval = setInterval(function () {

      if (this.vel[0] > 0 && !key.isPressed("right")) {
        this.vel[0] -= 2;
      } else if (this.vel[0] < 0 && !key.isPressed("left")) {
        this.vel[0] += 2;
      } else if (this.vel[0] === 0){
        clearInterval(interval);
      }
    }.bind(this), 250);
  };

  Ship.prototype.unpower = function () {
    this.vel = [0, 0];
  };

  Ship.prototype.fireBullet = function () {
    var bullet = new SpaceInvaders.Bullet({
      ship: this,
      game: this.game,
      vel: [0, -5],
      pos: [this.pos[0], this.pos[1] - this.radius],
      type: "shipBullet"
    });
    this.game.add(bullet);
  };

  Ship.COLOR = "#000";
  Ship.RADIUS = 23;
  Ship.VEL = [0, 0];
  Ship.POS = [SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y - 11];


})();
