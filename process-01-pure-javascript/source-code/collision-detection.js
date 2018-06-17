const isCollisionA = (bullet, enemy) => {
  return (
    bullet.x > enemy.x && bullet.x < enemy.x + enemy.width
    && bullet.y > enemy.y && bullet.y < enemy.y + enemy.height
  );
};
const isCollisionB = (bullet, enemy) => {
  return (
    bullet.x + bullet.width > enemy.x && bullet.x + bullet.width < enemy.x + enemy.width
    && bullet.y > enemy.y && bullet.y < enemy.y + enemy.height
  );
};
const isCollisionC = (bullet, enemy) => {
  return (
    bullet.x > enemy.x && bullet.x < enemy.x + enemy.width
    && bullet.y + bullet.height > enemy.y && bullet.y + bullet.height < enemy.y + enemy.height
  );
};
const isCollisionD = (bullet, enemy) => {
  return (
    bullet.x + bullet.width > enemy.x && bullet.x + bullet.width < enemy.x + enemy.width
    && bullet.y + bullet.height > enemy.y && bullet.y + bullet.height < enemy.y + enemy.height
  );
};

/** 
 * detect the collision between bullet and enemy.
 * note: This function just detect rectangle ==> bullet and enemy must be rectangle.
 * A-B-C-D is 4 point on a rectangle.
 */
const detectCollision = (player, enemies) => {
  enemies.list.forEach((enemy) => {
    player.bulletArray.forEach((bullet) => {
      if (!enemy.isExplosion) {
        if (isCollisionA(bullet, enemy)
          || isCollisionB(bullet, enemy)
          || isCollisionC(bullet, enemy)
          || isCollisionD(bullet, enemy)) {
          bullet.deletable = true;
          enemy.endLife();
          player.updateScore();
        }
      }
    });
  });
};

/**
 * detect the collision between enemy box and deathWall.
 * if true ==> game over.
 */
const isEndGame = (enemies, deathWall) => {
  let isEnd = false;
  enemies.list.forEach((enemy) => {
    if (deathWall.y > enemy.y && deathWall.y < enemy.y + enemy.height) {
      isEnd = true;
    }
  });
  return isEnd;
};
