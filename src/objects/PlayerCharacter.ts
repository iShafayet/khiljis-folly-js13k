import { InputState } from "../InputState";
import { Game } from "./Game";

export class PlayerCharacter {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  projectileAngle = 45;
  angleMin = -45;
  angleMax = 85;

  xPosition = 0;

  xOffset = 1000;
  xMin = 0;
  xMax = 200;

  yOffset = 550;
  yMin = 0;
  yMax = 90;

  public computeCurrentCoordinates(): [number, number] {
    let x = this.xOffset + this.xPosition;
    let y = this.yOffset - (this.xPosition / this.xMax) * this.yMax;
    return [x, y];
  }

  initialize() {
    this.xPosition = 0;
  }

  updateState(inputState: InputState) {
    if (inputState.left) {
      if (this.xPosition > this.xMin) {
        this.xPosition -= 1;
      }
    }
    if (inputState.right) {
      if (this.xPosition < this.xMax) {
        this.xPosition += 1;
      }
    }
    if (inputState.down) {
      if (this.projectileAngle > this.angleMin) {
        this.projectileAngle -= 1;
      }
    }
    if (inputState.up) {
      if (this.projectileAngle < this.angleMax) {
        this.projectileAngle += 1;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "green";
    ctx.beginPath();

    let [x, y] = this.computeCurrentCoordinates();

    let tempRadious = 6;
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
