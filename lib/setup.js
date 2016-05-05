(function () {
  var shipImageWithBoost,
      shipImageNoBoost,
      alienImage1,
      alienImage2,
      alienImage3,
      alienImage4,
      shipImages = [],
      alienImages = [];
   window.addEventListener("blur", function () {
     document.getElementById("audio").pause();
   })
   window.addEventListener("focus", function () {
     var soundButton = document.getElementById("sound-button");
     if (!$(soundButton).hasClass("paused")) {
       document.getElementById("audio").play();
     }
   })

  function loadResources() {
    shipImageWithBoost = new Image();
    shipImageWithBoost.src = "gamedevtuts_sprites/Ship/Spritesheet_64x29.png";
    shipImages.push(shipImageWithBoost);

    shipImageNoBoost = new Image();
    shipImageNoBoost.src = "gamedevtuts_sprites/Ship/Spritesheet_64x29_no_flame.png";
    shipImages.push(shipImageNoBoost);

    alienImage1 = new Image();
    alienImage1.src = "./gamedevtuts_sprites/Enemy/hue_shifted/eSpritesheet_40x30_hue1.png";
    alienImages.push(alienImage1);

    alienImage2 = new Image();
    alienImage2.src = "./gamedevtuts_sprites/Enemy/hue_shifted/eSpritesheet_40x30_hue2.png";
    alienImages.push(alienImage2);

    alienImage3 = new Image();
    alienImage3.src = "./gamedevtuts_sprites/Enemy/hue_shifted/eSpritesheet_40x30_hue3.png";
    alienImages.push(alienImage3);

    alienImage4 = new Image();
    alienImage4.src = "./gamedevtuts_sprites/Enemy/hue_shifted/eSpritesheet_40x30_hue4.png";
    alienImages.push(alienImage4);
  }

  loadResources();

  var soundButton = document.getElementById("sound-button");
  soundButton.addEventListener("click", function () {
    var audio = document.getElementById("audio");

    if ($(this).hasClass("playing")) {
     audio.pause();
     $(this).removeClass("fa-volume-up playing");
     $(this).addClass("paused fa fa-2x fa-volume-off");
   } else {
     audio.play();
     $(this).removeClass("fa-volume-off paused");
     $(this).addClass("playing fa fa-2x fa-volume-up");
   }
  })


  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 1000;
  canvasEl.height = 625;
  var ctx = canvasEl.getContext("2d");
  var game = window.Game = new SpaceInvaders.Game(shipImages, alienImages, 1);
  var gameView = new SpaceInvaders.GameView(game, ctx, shipImages, alienImages)
  gameView.bindStartHandler();

  gameView.start();

})();
