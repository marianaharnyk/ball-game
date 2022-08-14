(function (){
const canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

function circle (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);

  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

function Ball() {
  this.x = width / 2;
  this.y = height / 2;
  this.speed = 1;
  this.radius = 10;
  this.xSpeed = 5;
  this.ySpeed = 0;
};

Ball.prototype.move = function () {
  this.x += this.xSpeed * this.speed;
  this.y += this.ySpeed * this.speed;

  if (this.x > width || this.x < 0) {
    this.xSpeed = -this.xSpeed;
  }

  if (this.y > height || this.y < 0) {
    this.ySpeed = -this.ySpeed;
  }
};

Ball.prototype.draw = function () {
  circle(this.x, this.y, this.radius, true);
};

Ball.prototype.setDirection = function (direction) {
  if (direction === "up") {
    this.xSpeed = 0;
    this.ySpeed = -5;
  } else if (direction === "right") {
    this.xSpeed = 5;
    this.ySpeed = 0;
  } else if (direction === "down") {
    this.xSpeed = 0;
    this.ySpeed = 5;
  } else if (direction === "left") {
    this.xSpeed = -5;
    this.ySpeed = 0;
  } else if (direction === "stop") {
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
};

Ball.prototype.setSpeed = function (newSpeed) {
  if (newSpeed !== undefined) {
    this.speed = newSpeed;
  }
};

Ball.prototype.changeSpeed = function (speedVariants) {
  if (speedVariants === "x") {
    this.speed--;
  } else if (speedVariants === "z") {
    this.speed++;
  }

  if (this.speed < 0) {
    this.speed = 0;
  }
};

Ball.prototype.sizeChange = function (size) {
  if (size === "c") {
    this.radius--;
  } else if (size === "v") {
    this.radius++;
  }

  if (this.radius < 0) {
    this.radius = 0;
  }
};

const ball = new Ball();

const keyActions = {
  32: "stop",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

const speeds = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
};

const speedVariants = {
  88: "x", //сповільнення
  90: "z", // пришвидшення
};

const size = {
  67: "c", // зменшення
  86: "v", //збільшення
};

$("body").keydown(function (event) {
  const direction = keyActions[event.keyCode];
  const newSpeed = speeds[event.keyCode];
  const speedVar = speedVariants[event.keyCode];
  const oneSize = size[event.keyCode];
  ball.setDirection(direction);
  ball.setSpeed(newSpeed);
  ball.changeSpeed(speedVar);
  ball.sizeChange(oneSize);
});

setInterval(function () {
  ctx.clearRect(0, 0, width, height);

  ball.draw();
  ball.move();

  ctx.strokeRect(0, 0, width, height);
}, 30);
})();