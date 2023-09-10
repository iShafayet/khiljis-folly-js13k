import { InputState } from "./InputState";
import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "./constants";
import { GamepadInputState } from "./input/GamepadInputState";
import { KeyboardInputState } from "./input/KeyboardInputState";
import { combineInputStates } from "./input/combineInput";
import { collectGamepadButtonPresses } from "./input/gamepad";
import { setupKeyboardEventDetection } from "./input/keyboard";

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

const keyboardInputState: KeyboardInputState = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false,
  f: false,
};

const gamepadInputState: GamepadInputState = {
  gamepadUp: false,
  gamepadDown: false,
  gamepadLeft: false,
  gamepadRight: false,
  gamepadA: false,
  gamepadB: false,
};

setupKeyboardEventDetection(keyboardInputState);

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
  collectGamepadButtonPresses(gamepadInputState);

  combineInputStates(inputState, keyboardInputState, gamepadInputState);

  game.updateState(inputState);
  game.draw(ctx);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
