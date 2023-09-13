import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";

const FPS_COUNT_FOR_AVERAGE = 60;
const PERFORMANCE_TRACKING_THRESHOLD = 10_000;
const LOW_FPS_THRESHOLD = 30;

export class FpsCounter {
  game: Game;
  constructor(game: Game) {
    this.game = game;
    this.gameStarted = 0;
    this.lastTimeStamp = Date.now();
  }

  gameStarted: number = 0;
  lastTimeStamp: number = 0;
  frameCount = 0;
  fps = 0;
  fpsList: number[] = [];

  notifyGameStart() {
    this.gameStarted = Date.now();
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (Date.now() - this.lastTimeStamp > 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTimeStamp = Date.now();
      this.computeAverageFpsAndDownsizeParticleEffect();
    } else {
      this.frameCount += 1;
    }

    let text = `${this.fps}`.padStart(2, "0") + " FPS";
    ctx.font = "normal 12px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(text, CANVAS_BASE_WIDTH - 40 - 20, 30);
  }

  private computeAverageFpsAndDownsizeParticleEffect() {
    this.fpsList.push(this.fps);
    if (this.fpsList.length > FPS_COUNT_FOR_AVERAGE) {
      this.fpsList.shift();
    }

    if (this.gameStarted > 0 && Date.now() - this.gameStarted > PERFORMANCE_TRACKING_THRESHOLD) {
      let avgFps = this.fpsList.reduce((sum, fps) => sum + fps, 0) / this.fpsList.length;
      if (avgFps < LOW_FPS_THRESHOLD) {
        console.log("Reducing particle effect due to low FPS");
        (window as any).__OPTMIZE_PERFORMANCE = true;
        this.gameStarted = 0;
      }
    }
  }
}
