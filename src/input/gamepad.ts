import { GamepadInputState } from "./GamepadInputState";

export function collectGamepadButtonPresses(inputState: GamepadInputState) {
  try {
    populateButtonPresses(inputState);
  } catch {}
}

function buttonPressed(b) {
  if (typeof b === "object") {
    return b.pressed;
  }
  return b === 1.0;
}

function populateButtonPresses(inputState: GamepadInputState) {
  const gamepads = navigator.getGamepads().filter((g) => !!g);
  if (gamepads.length === 0) return;

  let gamepad: Gamepad = gamepads[0];

  inputState.gamepadA = false;
  inputState.gamepadB = false;
  inputState.gamepadDown = false;
  inputState.gamepadUp = false;
  inputState.gamepadLeft = false;
  inputState.gamepadRight = false;

  if (buttonPressed(gamepad.buttons[0])) {
    inputState.gamepadA = true;
  }
  if (buttonPressed(gamepad.buttons[1])) {
    inputState.gamepadB = true;
  }
  if (buttonPressed(gamepad.buttons[12])) {
    inputState.gamepadUp = true;
  }
  if (buttonPressed(gamepad.buttons[13])) {
    inputState.gamepadDown = true;
  }
  if (buttonPressed(gamepad.buttons[14])) {
    inputState.gamepadLeft = true;
  }
  if (buttonPressed(gamepad.buttons[15])) {
    inputState.gamepadRight = true;
  }
}
