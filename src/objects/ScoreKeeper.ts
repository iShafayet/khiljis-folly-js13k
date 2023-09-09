import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";

export class ScoreKeeper {
  game: Game;
  currentScore: number;

  constructor(game: Game) {
    this.game = game;
    this.currentScore = 0;
  }

  awardScore(delta: number) {
    this.currentScore += delta;
  }

  draw(ctx: CanvasRenderingContext2D) {
    let text = "SCORE " + `${this.currentScore}`.padStart(8, "00000000");
    ctx.font = "normal 20px Courier New";
    ctx.fillStyle = "grey";
    ctx.fillText(text, 20, 30);
  }
}
