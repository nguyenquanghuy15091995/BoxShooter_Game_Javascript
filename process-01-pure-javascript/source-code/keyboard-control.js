const keyState = {};

document.addEventListener('keydown', (e) => {
  keyState[e.keyCode || e.which] = true;
}, true);

document.addEventListener('keyup', (e) => {
  keyState[e.keyCode || e.which] = false;
}, true);

const moveShipKeyEvent = (player) => {
  if (keyState[37]) {
    player.moveLeft();
  }
  if (keyState[39]) {
    player.moveRight();
  }
  if (keyState[32]) {
    player.shoot();
  }
};
