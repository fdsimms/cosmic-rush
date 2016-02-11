(function () {
  if (typeof SpaceInvaders === "undefined") {
    window.SpaceInvaders = {};
  }

  var Util = SpaceInvaders.Util = {};

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
      function Surrogate () { this.constructor = ChildClass; }
      Surrogate.prototype = BaseClass.prototype;
      ChildClass.prototype = new Surrogate();
    };

  var rectCircCollision = Util.rectCircCollision = function (rect, circ) {
    var bool;
    var distX = Math.abs(circ.pos[0] - rect.pos[0] - rect.width / 2);
    var distY = Math.abs(circ.pos[1] - rect.pos[1]- rect.height / 2);

    if (distX > (rect.width / 2 + circ.radius) ||
      distY > (rect.height / 2 + circ.radius)) {

      bool = false;
    } else if (distX <= (rect.width / 2) ||
               distY <= (rect.height / 2) ) {
      bool = true;
    } else {

      var dx = distX - rect.width / 2;
      var dy = distY - rect.height / 2;
      bool = (dx * dx + dy * dy <= (circ.radius * circ.radius));
    }
    return bool;
  };



  var dist = Util.dist = function (pos1, pos2) {
    var pos1_x = pos1[0],
        pos1_y = pos1[1],
        pos2_x = pos2[0],
        pos2_y = pos2[1];

    return Math.sqrt(Math.pow((pos1_x - pos2_x), 2) + Math.pow((pos1_y - pos2_y), 2));
  };

})();
