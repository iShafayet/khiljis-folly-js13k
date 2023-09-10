import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";
import { GameState } from "./GameState";

export class GameOverNotice {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.state !== GameState.ENDED) {
      return;
    }
    {
      ctx.fillStyle = "rgba(67, 99, 79, 0.6)";
      ctx.fillRect(300, 140, 970 - 300, 360);
    }
    {
      let text = "You let the wrong ones in!";
      ctx.font = "normal 32px Courier New";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 390, 240);
    }

    if (this.game.scoreKeeper.currentScore >= this.game.scoreKeeper.highScore) {
      let text = "You got the high score though!";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 500, 280);
    } else {
      let text = "Shoot harder next time.";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 530, 280);
    }

    {
      let score = this.game.scoreKeeper.getFormattedCurrentScore();
      let text = `Your Score: ${score}`;
      ctx.font = "normal 24px Courier New";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 500, 320);
    }
    {
      let text = "Press [SPACE] to return to the menu";
      ctx.font = "normal 20px Courier New";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 430, 420);
    }
  }
}
