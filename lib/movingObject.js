(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var MovingObject = SpaceInvaders.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.alienMove = function () {
    var xPlusRadius = this.pos[0] + this.radius;
    var xMinusRadius = this.pos[0] - this.radius;
    if (xMinusRadius === 0) {
      this.vel = [0, 3];
      setTimeout(function () {
        this.pos[0] = this.radius + 1;
        this.vel = [1, 0];
      }.bind(this), 1000);
    } else if (xPlusRadius === SpaceInvaders.Game.DIM_X) {
          this.vel = [0, 3];
          setTimeout(function () {
            this.vel = [-1, 0];
            this.pos[0] = SpaceInvaders.Game.DIM_X - 1 - this.radius;
          }.bind(this), 1000);
      }

    this.move();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var pos = this.pos,
        otherPos = otherObject.pos,
        radius = this.radius,
        otherRadius = otherObject.radius;
    if (SpaceInvaders.Util.dist(pos, otherPos) < (radius + otherRadius)) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

})();
