function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// The GOAL!
// Once the player touches the SUN, they make it to the next level.
var Sun = function Sun() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 450;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  _classCallCheck(this, Sun);

  this.x = x;
  this.y = y;
};

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(x, y, style, direction) {
    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.style = style;
    this.direction = direction;
    this.speed = Math.floor(Math.random() * 5 + 1);
  }

  _createClass(Enemy, [{
    key: "update",
    value: function update(dt) {
      if (parseInt(document.querySelector("#score span").textContent) === 1) {
        this.speed = Math.floor(Math.random() * 5 + 5);
      } else if (parseInt(document.querySelector("#score span").textContent) === 2) {
        this.speed = Math.floor(Math.random() * 5 + 10);
      } else if (parseInt(document.querySelector("#score span").textContent) === 3) {
        this.speed = Math.floor(Math.random() * 5 + 15);
      } else if (parseInt(document.querySelector("#score span").textContent) === 4) {
        this.speed = Math.floor(Math.random() * 5 + 20);
      } else if (parseInt(document.querySelector("#score span").textContent) === 5) {
        this.speed = Math.floor(Math.random() * 5 + 25);
      }

      if (this.direction === "ltr") {
        if (this.x >= 800) {
          this.direction = "rtl";
        }

        this.x += this.speed;
      } else if (this.direction === "rtl") {
        if (this.x <= 0) {
          this.direction = "ltr";
        }

        this.x -= this.speed;
      }
    }
  }]);

  return Enemy;
}();

var Player =
/*#__PURE__*/
function () {
  function Player() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 450;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;

    _classCallCheck(this, Player);

    this.x = x;
    this.y = y;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      var _this = this;

      allEnemies.forEach(function (enemy) {
        if (Math.abs(enemy.x - _this.x) <= 80 && Math.abs(enemy.y - _this.y) <= 80) {
          if (document.querySelector("#lives span").textContent === "0") {
            Swal.fire({
              title: 'Game over',
              text: "Your hightest level is ".concat(document.querySelector("#score").textContent)
            });
            document.querySelector("#lives span").textContent = "3";
            document.querySelector("#score span").textContent = "0";
            allEnemies.forEach(function (ene) {
              return ene.speed = Math.floor(Math.random() * 5 + 1);
            });
          } else {
            document.querySelector("#lives span").textContent = "".concat(parseInt(document.querySelector("#lives span").textContent) - 1);
          }

          _this.x = 450;
          _this.y = 400;
        }
      });

      if (Math.abs(this.x - sun.x) <= 50 && Math.abs(this.y - sun.y) <= 50) {
        document.querySelector("#score span").textContent = "".concat(parseInt(document.querySelector("#score span").textContent) + 1);
        this.x = 450;
        this.y = 400;
      }
    }
  }, {
    key: "handleInput",
    value: function handleInput(diret) {
      if (diret === "left" && this.x > 0) {
        this.x -= 50;
      } else if (diret === "up" && this.y > 0) {
        this.y -= 50;
      } else if (diret === "right" && this.x < 800) {
        this.x += 50;
      } else if (diret === "down" && this.y < 400) {
        this.y += 50;
      }
    }
  }]);

  return Player;
}();

var allEnemies = [new Enemy(Math.floor(Math.random() * 800), 50, "enemy1", "ltr"), new Enemy(Math.floor(Math.random() * 800), 150, "enemy2", "ltr"), new Enemy(Math.floor(Math.random() * 800), 250, "enemy3", "ltr")];
var player = new Player();
var sun = new Sun();
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});