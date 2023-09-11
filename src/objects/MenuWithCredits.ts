import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";
import { GameState } from "./GameState";

export class MenuWithCredits {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.state !== GameState.MENU) {
      return;
    }

    {
      let text = "Summer of 1206";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 130);
    }
    {
      let text = "Warlord Bakhtiyar Khalji has set his greedy eyes on the famed Tibetian mountain";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 160);
    }
    {
      let text = "ranges. As the sole guardian of Chumbi Valley, you must repell his horsemen in";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 190);
    }
    {
      let text = "the epic struggle, we now call...";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 220);
    }
    {
      let text = "Khilji's Folly";
      ctx.font = "normal 32px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 270);
    }

    {
      let text = "Press [SPACE]/ A to get started";
      ctx.font = "normal 20px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 460, 340);

      ctx.beginPath();
      ctx.strokeStyle = "#808080";
      ctx.arc(646, 334, 12, 0, 2 * Math.PI);
      ctx.stroke();
    }

    {
      let text = "Credits";
      ctx.font = "normal 20px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 400);
    }

    {
      let text = "Developer: Sayem Shafayet";
      ctx.font = "normal 20px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 430);
    }
    {
      let text = "Developer: Shuhan Mirza";
      ctx.font = "normal 20px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 460);
    }
    {
      let text = "Music: Mysha Azfar";
      ctx.font = "normal 20px Courier New";
      ctx.fillStyle = "#808080";
      ctx.fillText(text, 280, 490);
    }
  }
}
