var Util = require('./util'),
    MovingObject = require('./movingObject');

function Alien (options) {
  options.color = Alien.COLOR;
  options.pos = options.pos;
  options.vel = Alien.VEL;
  options.radius = options.RADIUS;

  MovingObject.call(this, options);
}

Alien.COLOR = "#ccc";
Alien.RADIUS = 25;
Alien.VEL = [10, 10];

Util.inherits(Alien, MovingObject);

module.exports = Alien;
