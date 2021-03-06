(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Ship = SpaceInvaders.Ship = function (options) {
    options.color = Ship.COLOR;
    options.pos = Ship.POS;
    this.height = Ship.HEIGHT;
    this.width = Ship.WIDTH;
    options.vel = Ship.VEL;
    options.radius = Ship.RADIUS;
    this.images = options.images;
    this.tick = 0;
    this.wasHit = false;

    SpaceInvaders.MovingObject.call(this, options);
  };
  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

  Ship.prototype.draw = function (ctx) {
    var coords = [28, 57, 86],
        slowedTick = Math.floor(this.tick / 6),
        imgWithBoost = this.images[0],
        imgNoBoost = this.images[1];

    ctx.fillStyle = "transparent";
    ctx.fillRect(this.pos[0],this.pos[1], 25, 40);

    if (key.isPressed('up') && !this.game.paused) {
      if (this.wasHit) {
        coords = [-100, -100, 86];
        ctx.drawImage(imgWithBoost,
          coords[slowedTick % 3],0, 30,100,
          this.pos[0],this.pos[1], 25, 100
        );
      } else {
        ctx.drawImage(imgWithBoost,
          coords[slowedTick % 3],0, 30,100,
          this.pos[0],this.pos[1], 25, 100
        );
      }

    } else {
      if (this.wasHit) {

        ctx.drawImage(imgNoBoost,
          coords[slowedTick % 3],0, 30,100,
          this.pos[0],this.pos[1], 25, 100
        );
      } else {
        ctx.drawImage(imgNoBoost,
          coords[2],0, 30,100,
          this.pos[0],this.pos[1], 25, 100
        );
      }
    }

    this.tick++;
  };

  Ship.prototype.move = function (delta) {
    delta = delta || 1;
    if (this.pos[0] <= 0) {
      this.pos[0] = SpaceInvaders.Game.DIM_X;
    } else if (this.pos[0] >= SpaceInvaders.Game.DIM_X) {
      this.pos[0] = 0;
    }
    if (this.pos[1] <= SpaceInvaders.Game.DIM_Y - 150) {
      this.pos[1] = SpaceInvaders.Game.DIM_Y - 149;
    } else if (this.pos[1] >= SpaceInvaders.Game.DIM_Y - this.height + 1) {
      this.pos[1] = SpaceInvaders.Game.DIM_Y - this.height;
    }

    this.pos[0] += this.vel[0] * delta / 20;
    this.pos[1] += this.vel[1] * delta / 20;
  };

  Ship.prototype.isCollidedWith = function (otherObject) {
    var bool;
    var distX = Math.abs(otherObject.pos[0] - this.pos[0] - this.width / 2);
    var distY = Math.abs(otherObject.pos[1] - this.pos[1]- this.height / 2);

    if (distX > (this.width / 2 + otherObject.radius) ||
      distY > (this.height / 2 + otherObject.radius)) {

      bool = false;
    } else if (distX <= (this.width / 2) ||
               distY <= (this.height / 2) ) {
      bool = true;
    } else {

      var dx = distX - this.width / 2;
      var dy = distY - this.height / 2;
      bool = (dx * dx + dy * dy <= (otherObject.radius * otherObject.radius));
    }

    if (otherObject instanceof SpaceInvaders.Bullet &&
        otherObject.type === "shipBullet") {
      bool = false;
    }

    if (bool) {
      this.game.remove(otherObject);
      this.hit();
    }
  };

  Ship.prototype.power = function (impulse) {
    if (this.vel[0] < 6 && this.vel[0] > -6) {
      this.vel[0] += impulse[0];
    }
    if ((this.vel[1] < 4 && this.vel[1] > -4)){
      this.vel[1] += impulse[1];
    }
    var interval = setInterval(function () {

      if (this.vel[0] > 0 && !key.isPressed("right")) {
        this.vel[0] -= 2;
      } else if (this.vel[0] < 0 && !key.isPressed("left")) {
        this.vel[0] += 2;
      } else if (this.vel[0] === 0 && this.vel[1] === 0){
        clearInterval(interval);
      }

      if (this.vel[1] > 0 && !key.isPressed("down")) {
        this.vel[1] -= 2;
      } else if (this.vel[1] < 0 && !key.isPressed("up")) {
        this.vel[1] += 2;
      } else if (this.vel[0] === 0 && this.vel[1] === 0){
        clearInterval(interval);
      }
    }.bind(this), 250);
  };

  Ship.prototype.unpower = function () {
    this.vel = [0, 0];
  };

  Ship.prototype.fireBullet = function () {
    if (this.game.paused) { return; }
    
    var bullet = new SpaceInvaders.Bullet({
      ship: this,
      game: this.game,
      vel: [0, -3],
      pos: [this.pos[0] + this.width / 2 - 3 + this.vel[0], this.pos[1]],
      type: "shipBullet"
    });
    this.game.add(bullet);
  };

  Ship.prototype.hit = function () {
    if (this.wasHit) { return; }

    this.wasHit = true;
    this.game.livesLeft--;
    setTimeout(function () {
      this.wasHit = false;
    }.bind(this), 1250);
  };

  Ship.COLOR = "transparent";
  Ship.RADIUS = 23;
  Ship.WIDTH = 30;
  Ship.HEIGHT = 55;
  Ship.VEL = [0, 0];
  Ship.POS = [SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y - Ship.HEIGHT];


})();
