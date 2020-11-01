const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const snake = {
  x: 10,
  y: 10,
  length: 30,
  height: 10,
  dx: 0,
  dy: 0,
};

const apple = {
  x: Math.floor(Math.random() * (canvas.width - 10)),
  y: Math.floor(Math.random() * (canvas.height - 10)),
  length: 10,
  height: 10,
};

function drawSnake() {
  ctx.beginPath();
  ctx.fillStyle = "rgb(33, 221, 80)";
  ctx.fillRect(snake.x, snake.y, snake.length, snake.height);
  ctx.fillStyle = "rgb(221, 33, 33)";
  ctx.fillRect(apple.x, apple.y, apple.length, apple.height);
}

function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (snake.dy !== 0) {
    snake.length = 10;
    snake.height = 30;
  } else if (snake.dx !== 0) {
    snake.length = 30;
    snake.height = 10;
  }
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x + snake.length === canvas.width) {
    snake.x -= canvas.width;
  } else if (snake.x + snake.length === 0) {
    snake.x += canvas.width;
  }
  if (snake.y + snake.height === canvas.height) {
    snake.y -= canvas.height;
  } else if (snake.y + snake.height === 0) {
    snake.y += canvas.height;
  }

  if (
    snake.x - apple.x <= 15 &&
    snake.x - apple.x >= 0 &&
    snake.y - apple.y <= 15 &&
    snake.y - apple.y >= 0
  ) {
    let score = document.getElementById("score");
    let number = score.innerHTML;
    number++;
    score.innerHTML = number;
    apple.x = Math.floor(Math.random() * (canvas.width - 10));
    apple.y = Math.floor(Math.random() * (canvas.height - 10));
  }
  drawSnake();
  requestAnimationFrame(move);
}

function controls(e) {
  if (e.key === "ArrowRight") {
    snake.dy = 0;
    snake.dx = 5;
  } else if (e.key === "ArrowLeft") {
    snake.dy = 0;
    snake.dx = -5;
  } else if (e.key === "ArrowDown") {
    snake.dx = 0;
    snake.dy = 5;
  } else if (e.key === "ArrowUp") {
    snake.dx = 0;
    snake.dy = -5;
  }
}

move();

document.addEventListener("keyup", controls);
