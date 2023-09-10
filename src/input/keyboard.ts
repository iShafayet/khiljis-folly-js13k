import { KeyboardInputState } from "./KeyboardInputState";

export function setupKeyboardEventDetection(inputState: KeyboardInputState) {
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
      case "F":
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
      case "F":
      case "f":
        inputState.f = false;
        break;
      case "Spacebar":
      case " ":
        inputState.space = false;
        break;
    }
  });
}
