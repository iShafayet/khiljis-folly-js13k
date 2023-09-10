import { InputState } from "../InputState";
import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";
import { GameState } from "./GameState";

export const GAME_RESET_OPTION_TIMEOUT = 3_000;

export class GameOverNotice {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  gameEndedTimeStamp: number = 0;

  notifyGameOver() {
    this.gameEndedTimeStamp = Date.now();
  }

  private isGameResettable() {
    return this.game.state === GameState.ENDED && Date.now() - this.gameEndedTimeStamp > GAME_RESET_OPTION_TIMEOUT;
  }

  shouldResetGame(inputState: InputState) {
    return this.isGameResettable() && inputState.space;
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
    if (this.isGameResettable()) {
      let text = "Press [SPACE] to return to the menu";
      ctx.font = "normal 20px Courier New";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 430, 420);
    }
  }
}
