(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Ship = SpaceInvaders.Ship = function (options) {
    options.color = Ship.COLOR;
    options.pos = Ship.POS;
    options.vel = Ship.VEL;
    options.radius = Ship.RADIUS;

    SpaceInvaders.MovingObject.call(this, options);
  };
  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

  Ship.prototype.isCollidedWith = function (otherObject) {
    var pos = this.pos,
        otherPos = otherObject.pos,
        radius = this.radius,
        otherRadius = otherObject.radius;
    if (SpaceInvaders.Util.dist(pos, otherPos) < (radius + otherRadius)) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    var interval = setInterval(function () {

      if (this.vel[0] > 0 && !key.isPressed("right")) {
        this.vel[0] -= 1;
      } else if (this.vel[0] < 0 && !key.isPressed("left")) {
        this.vel[0] += 1;
      } else {
        clearInterval(interval);
      }
    }.bind(this), 2000);
  };

  Ship.COLOR = "#000";
  Ship.RADIUS = 10;
  Ship.VEL = [0, 0];
  Ship.POS = [SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y - 11];


})();
