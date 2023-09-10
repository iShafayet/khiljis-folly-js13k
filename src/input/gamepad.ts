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

  // console.log(gamepad.buttons);

  if (buttonPressed(gamepad.buttons[0])) {
    console.log("gamepadA");
    inputState.gamepadA = true;
  }

  if (buttonPressed(gamepad.buttons[1])) {
    console.log("gamepadB");
    inputState.gamepadB = true;
  }

  if (buttonPressed(gamepad.buttons[12])) {
    console.log("gamepadUp");
    inputState.gamepadUp = true;
  }
  if (buttonPressed(gamepad.buttons[13])) {
    console.log("gamepadDown");
    inputState.gamepadDown = true;
  }
  if (buttonPressed(gamepad.buttons[14])) {
    console.log("gamepadLeft");
    inputState.gamepadLeft = true;
  }
  if (buttonPressed(gamepad.buttons[15])) {
    console.log("gamepadRight");
    inputState.gamepadRight = true;
  }
}
