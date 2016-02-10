(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Alien = SpaceInvaders.Alien = function (options) {
    options.color = Alien.COLOR;
    options.pos = options.pos;
    options.vel = Alien.VEL;
    options.radius = Alien.RADIUS;

    SpaceInvaders.MovingObject.call(this, options);
  };
  SpaceInvaders.Util.inherits(Alien, SpaceInvaders.MovingObject);

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

  Alien.COLOR = "#FFF";
  Alien.RADIUS = 10;
  Alien.VEL = [-1, 0];


})();
