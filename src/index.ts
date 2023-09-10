import { InputState } from "./InputState";
import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "./constants";

import { Game } from "./objects/Game";

const canvas: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.id = "gameCanvas";
canvas.width = CANVAS_BASE_WIDTH;
canvas.height = CANVAS_BASE_HEIGHT;
const div = document.createElement("div");
div.appendChild(canvas);
document.body.appendChild(canvas);

const inputState: InputState = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false,
  f: false,
};

window.addEventListener("keydown", (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowLeft":
      inputState.left = true;
      break;
    case "ArrowRight":
      inputState.right = true;
      break;
    case "ArrowUp":
      inputState.up = true;
      break;
    case "ArrowDown":
      inputState.down = true;
      break;
    case "f":
      inputState.f = true;
      break;
    case "Spacebar":
    case " ":
      inputState.space = true;
      break;
  }
});

window.addEventListener("keyup", (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowLeft":
      inputState.left = false;
      break;
    case "ArrowRight":
      inputState.right = false;
      break;
    case "ArrowUp":
      inputState.up = false;
      break;
    case "ArrowDown":
      inputState.down = false;
      break;
    case "f":
      inputState.f = false;
      break;
    case "Spacebar":
    case " ":
      inputState.space = false;
      break;
  }
});

let game: Game;

function createNewGame() {
  game = new Game();
  game.initialize();
  game.showMenu();

  game.subscribeToGameReset(() => {
    createNewGame();
  });
}

createNewGame();

// game.startGame(); // debugging

function tick(t: number) {
  game.updateState(inputState);
  game.draw(ctx);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
