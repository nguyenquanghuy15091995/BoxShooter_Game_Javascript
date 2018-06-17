/** Create screen and text constants. */
const Game = {
  WIDTH: 700,
  HEIGHT: 800,
  JUMP: 10,
  TITLE: {
    TEXT: 'BOX SHOOTER',
  },
  GAMEOVER: {
    TEXT: 'GAME OVER',
  },
  ABOUT_GAME: {
    TEXT: 'Shoot all red boxes :V',
    TEXT2: '*Minigame made by pure javascript and canvas*',
    TEXT3: 'Press SPACEBAR to shoot',
    TEXT4: 'Press LEFT and RIGHT arrow to move',
  },
  SCENE: {
    MAIN_MENU: 'MAIN_MENU',
    ABOUT_GAME: 'ABOUT_GAME',
    IN_GAME: 'IN_GAME',
    END_GAME: 'END_GAME',
  }
};
/** Create variable. */
const canvas = document.getElementById('game-area');
const context = canvas.getContext('2d');
const controlButton = document.getElementById('control-button');
let interval;
let scene = Game.SCENE.MAIN_MENU;
let player;
let deathWall;
let enemies;

/**
 * updateGameState function ==> run all update function of all objects.
 */
const updateGameState = (canvas, context) => {
  GameState.clear(canvas, context);
  if (scene === Game.SCENE.IN_GAME) {
    player.newPos();
    player.update();
    player.updateGun(Game.JUMP);
    deathWall.update();
    enemies.update();
    player.clearMove();
    detectCollision(player, enemies);
    moveShipKeyEvent(player);
    if (isEndGame(enemies, deathWall)) {
      scene = Game.SCENE.END_GAME;
      controlButton.style.visibility = 'visible';
    }
  } else if (scene === Game.SCENE.END_GAME) {
    controlButton.innerHTML = 'MAIN MENU';
    const endText = new Text(Game.GAMEOVER.TEXT, Game.WIDTH / 2, Game.HEIGHT / 2, 70, '#00cc00', context);
    endText.update();
    clearInterval(interval);
  }
};

/**
 * Game State object contains 3 main function.
 * - create: create game value (Screen).
 * - start: create interval to run this game per time (frame per time).
 * - clear: clear old frame to redraw object on new frame.
 */
const GameState = {
  create: (canvas, context) => {
    canvas.width = Game.WIDTH;
    canvas.height = Game.HEIGHT;
    context = context;
    const gameTitle = new Text(Game.TITLE.TEXT, Game.WIDTH / 2, Game.HEIGHT / 2, 70, '#00cc00', context);
    gameTitle.update();
  },
  start: (canvas, context) => {
    interval = setInterval(() => {
      updateGameState(canvas, context);
    }, Game.JUMP);
  },
  clear: (canvas, context) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  },
};

/**
 * Create all object value.
 */
const createObject = (canvas, context) => {
  player = new Player(Game.WIDTH / 2 - 20, Game.HEIGHT - 50, 40, 40, context);
  deathWall = new DeathWall(Game.HEIGHT - 60, context);
  enemies = new Enemies(context);
  updateGameState(canvas, context);
};

/**
 * render function ==> update game by game scene.
 * onClick event of control button.
 */
const render = () => {
  const { MAIN_MENU, ABOUT_GAME, IN_GAME, END_GAME } = Game.SCENE;
  switch (scene) {
    case MAIN_MENU:
      controlButton.innerHTML = 'GO';
      scene = ABOUT_GAME;
      createObject(canvas, context);
      GameState.clear(canvas, context);
      const gameAboutText = new Text(Game.ABOUT_GAME.TEXT, Game.WIDTH / 2, Game.HEIGHT / 2 - 30, 50, '#00cc00', context);
      const gameAboutText2 = new Text(Game.ABOUT_GAME.TEXT2, Game.WIDTH / 2, Game.HEIGHT / 2 + 30, 30, '#e60000', context);
      const gameAboutText3 = new Text(Game.ABOUT_GAME.TEXT3, Game.WIDTH / 2, Game.HEIGHT / 2 + 70, 30, '#e60000', context);
      const gameAboutText4 = new Text(Game.ABOUT_GAME.TEXT4, Game.WIDTH / 2, Game.HEIGHT / 2 + 110, 30, '#e60000', context);
      gameAboutText.update();
      gameAboutText2.update();
      gameAboutText3.update();
      gameAboutText4.update();
      break;
    case ABOUT_GAME:
      controlButton.style.visibility = 'hidden';
      scene = IN_GAME;
      player.initVariable();
      GameState.start(canvas, context);
      break;
    case IN_GAME:
      // do something else.
      break;
    case END_GAME:
      GameState.clear(canvas, context);
      controlButton.innerHTML = 'PLAY';
      scene = MAIN_MENU;
      const gameTitle = new Text(Game.TITLE.TEXT, Game.WIDTH / 2, Game.HEIGHT / 2, 70, '#00cc00', context);
      gameTitle.update();
      break;
    default:
      console.log('Functions are in development ^^!');
      break;
  }
};

/** Run game create to scale game screen. */
GameState.create(canvas, context);
