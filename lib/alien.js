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

  Alien.COLOR = "#FFF";
  Alien.RADIUS = 25;
  Alien.VEL = [3, 0];

  SpaceInvaders.Util.inherits(Alien, SpaceInvaders.MovingObject);

})();
