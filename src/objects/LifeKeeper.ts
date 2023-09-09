import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH, MAX_PLAYER_LIVES } from "../constants";
import { Game } from "./Game";

export class LifeKeeper {
  game: Game;

  remainingLives: number;

  constructor(game: Game) {
    this.game = game;
    this.remainingLives = MAX_PLAYER_LIVES;
  }

  reduceLife() {
    if (this.remainingLives > 0) {
      this.remainingLives -= 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let text = "❤️".repeat(this.remainingLives);
    ctx.font = "normal 20px Courier New";
    ctx.fillStyle = "grey";
    ctx.fillText(text, 20, 60);
  }
}
