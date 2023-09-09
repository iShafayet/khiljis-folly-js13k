import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";

export class FpsCounter {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }
  
  lastTimeStamp = Date.now();
  frameCount = 0;
  fps = 0;

  draw(ctx: CanvasRenderingContext2D) {
    if (Date.now() - this.lastTimeStamp > 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTimeStamp = Date.now();
    } else {
      this.frameCount += 1;
    }

    let text = `${this.fps}`.padStart(2, "0");
    ctx.font = "normal 24px Arial";
    ctx.fillStyle = "yellow"
    ctx.fillText(text, CANVAS_BASE_WIDTH - 40, 30);
  }
}
