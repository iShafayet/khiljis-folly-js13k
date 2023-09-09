import { InputState } from "../InputState";

export class PlayerCharacter {
  xPosition = 0;

  xOffset = 1000;
  xMin = 0;
  xMax = 200;

  yOffset = 550;
  yMin = 0;
  yMax = 90;

  private translateXpositionToCoordinates(): [number, number] {
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
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "green";
    ctx.beginPath();

    let [x, y] = this.translateXpositionToCoordinates();

    let tempRadious = 6;
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
