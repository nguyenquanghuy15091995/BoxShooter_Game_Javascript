/**
 * Player object. ==> the blue box.
 */
function Player(x, y, width, height, context) {
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.score = {
    count: 0,
    message: new Text('', 65, Game.HEIGHT - 70, 25, 'white', context),
  };
  /** gun object. */
  this.gun = {
    cooldown: 500,
    shootable: true,
    bullets: 10,
    maxBullets: 10,
    count: 0,
    reloadTime: 1500,
    reloadable: false,
    countReload: 0,
    message: new Text('', Game.WIDTH - 75, Game.HEIGHT - 70, 25, 'white', context),
  };
  /** bulletArray is a list bullet objects are drawed on screen. */
  this.bulletArray = [];
  /** Create some object to draw on screen at the start. */
  this.initVariable = () => {
    this.score.message.text = `Score: ${this.score.count}`;
    this.gun.message.text = `Bullet: ${this.gun.bullets < 10 ? `0${this.gun.bullets}` : this.gun.bullets}`;
  };
  /** updateScore ==> update score value and text onscreen. */
  this.updateScore = () => {
    this.score.count += 1;
    this.score.message.text = `Score: ${this.score.count}`;
  };
  /** update Bullets position and clear all bullet s out of screen or collided. */
  this.updateBulletArray = () => {
    this.bulletArray.forEach((bullet, index) => {
      if (bullet.deletable) {
        this.bulletArray.splice(index, 1)
      }
    });
    this.bulletArray.forEach((bullet) => {
      bullet.newPos();
      bullet.update();
    });
  };
  /** updateGun => update gun state and check delay of gun. */
  this.updateGun = (jump) => {
    if (!this.gun.shootable && !this.gun.reloadable) {
      this.gun.count += jump;
      if (this.gun.count >= this.gun.cooldown) {
        this.gun.shootable = true;
        this.gun.count = 0;
      }
    }
    this.reload(jump);
  };
  /** shoot function. */
  this.shoot = () => {
    if (this.gun.shootable && !this.gun.reloadable) {
      this.bulletArray.push(new Bullet(this.x + (this.width / 2) - 2.5, this.y - 20, 5, 10, context));
      this.gun.bullets -= 1;
      this.gun.shootable = false;
      this.gun.message.text = `Bullet: ${this.gun.bullets < 10 ? `0${this.gun.bullets}` : this.gun.bullets}`;
      if (this.gun.bullets <= 0) {
        this.gun.reloadable = true;
      }
    }
  };
  /** 
   * reload function is called per time.
   * if gun object is out of bullets.
   */
  this.reload = (jump) => {
    if (this.gun.reloadable) {
      console.log('Reloading...');
      this.gun.message.text = 'Reloading...';
      this.gun.countReload += jump;
      if (this.gun.countReload >= this.gun.reloadTime) {
        console.log('Reload successful...')
        this.gun.bullets = this.gun.maxBullets;
        this.gun.reloadable = false;
        this.gun.countReload = 0;
        this.gun.message.text = `Bullet: ${this.gun.bullets < 10 ? `0${this.gun.bullets}` : this.gun.bullets}`;
      }
    }
  };
  /** Update Player state per time. */
  this.update = () => {
    ctx = context;
    ctx.fillStyle = '#1a1aff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    this.gun.message.update();
    this.updateBulletArray();
    this.score.message.update();
  };
  /** newPos function to update PLayer position by speedX and speedY */
  this.newPos = () => {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  /** Player move action. */
  this.moveUp = () => {
    this.speedY = this.y <= 0 ? 0 : -4;
  };
  this.moveDown = () => {
    this.speedY = this.y + this.height >= 0 ? 0 : 4;
  };
  this.moveLeft = () => {
    this.speedX = this.x <= 0 ? 0 : -4;
  };
  this.moveRight = () => {
    this.speedX = this.x + this.width >= Game.WIDTH ? 0 : 4;
  };
  this.clearMove = () => {
    this.speedX = 0;
    this.speedY = 0;
  };
};

/** DeathWall object ==> The wall (purple line) ==> Player will protect it. :v */
function DeathWall(y, context) {
  this.x = 0;
  this.y = y;
  this.update = () => {
    ctx = context;
    ctx.strokeStyle = '#9900cc';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(Game.WIDTH, this.y);
    ctx.stroke();
  };
};

/** Bullet object */
function Bullet(x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speedY = -10;
  this.deletable = false;
  this.update = () => {
    ctx = context;
    ctx.fillStyle = '#66b3ff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  };
  this.endLife = () => {
    this.deletable = true;
  };
  this.newPos = () => {
    this.deletable = this.y <= 0;
    this.y += this.speedY;
  };
};

/** Text on screen (score and bullet's state) */
function Text(text, x, y, fontSize, color, context) {
  this.text = text;
  this.x = x;
  this.y = y;
  this.fontSize = fontSize;
  this.color = color;
  this.update = () => {
    ctx = context;
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}px Roboto`;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
  };
};

/** List enemy. ==> all red boxes. */
function Enemies(context) {
  this.list = [new Enemy(40, 40, context)];
  this.increaseTime = 4000;
  this.count = 0;
  this.increase = () => {
    this.count += Game.JUMP;
    if (this.count >= this.increaseTime) {
      this.list.push(new Enemy(40, 40, context));
      this.count = 0;
    }
  };
  this.update = () => {
    this.list.forEach((enemy, index) => {
      if (enemy.deletable) {
        this.list.splice(index, 1);
      }
    });
    this.list.forEach((enemy) => {
      enemy.update();
    });
    this.increase();
  };
};

/**
 * Enemy object. ==> the red box.
 */
function Enemy(width, height, context) {
  this.speedX = Math.floor((Math.random() * 99)) % 2 === 0 ? Math.floor((Math.random() * 4) + 1) : (-1 * Math.floor((Math.random() * 4) + 1));
  this.speedY = 0.6;
  this.x = Math.floor(Math.random() * (Game.WIDTH - 40));
  this.y = -40;
  this.width = width;
  this.height = height;
  this.deletable = false;
  this.isExplosion = false;
  this.explosion = {
    animationTime: 500,
    radius: 20,
    count: 0,
  };
  this.update = () => {
    ctx = context;
    ctx.fillStyle = '#ff0000';
    if (!this.isExplosion) {
      // enemy still alive case.
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();
      this.newPos();
    } else {
      // explosion case ==> after enemy dead.
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.explosion.radius, 0, 2 * Math.PI);
      ctx.fill();
      this.doExplosion();
    }
  };
  /** do explode animation. */
  this.doExplosion = () => {
    if (this.isExplosion) {
      this.explosion.count += Game.JUMP;
      this.explosion.radius += 0.2;
      if (this.explosion.count >= this.explosion.animationTime) {
        this.deletable = true;
      }
    }
  };

  this.endLife = () => {
    this.isExplosion = true;
  };
  /** Updatt eenemy position. */
  this.newPos = () => {
    if (this.speedX > 0 && this.x + this.width >= Game.WIDTH
      || this.speedX < 0 && this.x <= 0) {
      this.speedX *= -1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.clearMove = () => {
    this.speedX = 0;
    this.speedY = 0;
  };
};
