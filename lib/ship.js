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



  Ship.COLOR = "#000";
  Ship.RADIUS = 10;
  Ship.VEL = [0, 0];
  Ship.POS = [SpaceInvaders.Game.DIM_X / 2, SpaceInvaders.Game.DIM_Y - 11];

  SpaceInvaders.Util.inherits(Ship, SpaceInvaders.MovingObject);

})();
