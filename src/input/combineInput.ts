import { InputState } from "../InputState";
import { GamepadInputState } from "./GamepadInputState";
import { KeyboardInputState } from "./KeyboardInputState";

let debounceMap = {};
function debounceKey(key: string, value: boolean, debounceDuration: number): boolean {
  if (!(key in debounceMap)) {
    debounceMap[key] = 0;
  }

  if (!value) return value;

  if (Date.now() - debounceMap[key] > debounceDuration) {
    debounceMap[key] = Date.now();
    return true;
  } else {
    return false;
  }
}

export function combineInputStates(inputState: InputState, keyboardInputState: KeyboardInputState, gamepadInputState: GamepadInputState) {
  inputState.up = keyboardInputState.up || gamepadInputState.gamepadUp;
  inputState.down = keyboardInputState.down || gamepadInputState.gamepadDown;
  inputState.left = keyboardInputState.left || gamepadInputState.gamepadLeft;
  inputState.right = keyboardInputState.right || gamepadInputState.gamepadRight;
  inputState.space = keyboardInputState.space || gamepadInputState.gamepadA;
  inputState.f = keyboardInputState.f || gamepadInputState.gamepadB;

  inputState.space = debounceKey("SPACE", inputState.space, 300);
  inputState.f = debounceKey("F", inputState.f, 300);
}
