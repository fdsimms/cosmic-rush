(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Util = SpaceInvaders.Util = {};

  var inherits = Util.inherits = function (childClass, parentClass) {
    function Surrogate () {}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

  var dist = Util.dist = function (pos1, pos2) {
    var pos1_x = pos1[0],
        pos1_y = pos1[1],
        pos2_x = pos2[0],
        pos2_y = pos2[1];

    return Math.sqrt(Math.pow((pos1_x - pos2_x), 2) + Math.pow((pos1_y - pos2_y), 2));
  };

})();
