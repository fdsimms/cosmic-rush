(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Alien = SpaceInvaders.Alien = function (options) {
    options.color = Alien.COLOR;
    options.pos = options.pos;
    this.divebombing = false;
    options.radius = Alien.RADIUS;
    this.image = options.image;
    this.tick = Math.floor(Math.random() * 6);
    options.vel = [];
    SpaceInvaders.MovingObject.call(this, options);

    this.vel = [1 + this.game.curLevel / 5, 0];
  };
  SpaceInvaders.Util.inherits(Alien, SpaceInvaders.MovingObject);

  Alien.prototype.draw = function  (ctx) {
    var coords = [0, 30, 60, 90, 120, 150];
    var slowedTick = Math.floor(this.tick / 8);

    // ctx.fillRect(this.pos[0] - this.radius,this.pos[1] - this.radius - 10, 40, 40);
    ctx.drawImage(this.image,
      0, coords[slowedTick % 5], 40,30,
      this.pos[0] - this.radius ,this.pos[1] - this.radius, 30, 30
    );
    this.tick++;
  };

  Alien.prototype.fireBullet = function () {
    var bullet = new SpaceInvaders.Bullet({
      alien: this,
      game: this.game,
      vel: [0, 3],
      pos: [this.pos[0], this.pos[1] + this.radius],
      type: "alienBullet"
    });
    this.game.add(bullet);
  };

  Alien.prototype.divebomb = function () {
    if (this.divebombing) { return; }
    
    this.divebombing = true;

    var randTime1 = Math.random() * (2500 - 1000) + 1000;
    setTimeout(function () {
      this.vel = [0, 3];
      setTimeout(function () {
        this.vel = [0, 0];
        var randTime2 = Math.random() * (2250 - 1000) + 1000;
        var rise = (this.game.ship.pos[1] - this.pos[1]) / 20;
        var run = (this.game.ship.pos[0] - this.pos[0]) / 20;
        setTimeout(function () {

          this.vel[0] = run;
          this.vel[1] = rise;
        }.bind(this), randTime2);
      }.bind(this), 1000);
    }.bind(this), randTime1);
  };

  Alien.COLOR = "transparent";
  Alien.RADIUS = 15;
  Alien.VEL = [0, 0];



})();
