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

  MovingObject.prototype.move = function (timeDelta) {
    timeDelta = timeDelta || 1;
    this.pos[0] += this.vel[0] * timeDelta / 20;
    this.pos[1] += this.vel[1] * timeDelta / 20;
    if (this.pos[1] > SpaceInvaders.Game.DIM_Y ||
        this.pos[1] < 0 ||
        this.pos[0] < 0 ||
        this.pos[0] > SpaceInvaders.Game.DIM_X) {
      this.game.remove(this);
    }
  };


  MovingObject.prototype.isCollidedWith = function (otherObject) {

  };

})();
