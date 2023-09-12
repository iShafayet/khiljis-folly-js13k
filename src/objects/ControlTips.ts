import { Game } from "./Game";
import { GameState } from "./GameState";

export class ControlTips {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    {
      let text = "Controls";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.textAlign = "end";
      ctx.fillText(text, 1220, 70);
      ctx.textAlign = "start";
    }
    {
      let text = "[Left/Right Arrow]/[DPad ← / → ] to move your Monk";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.textAlign = "end";
      ctx.fillText(text, 1220, 100);
      ctx.textAlign = "start";
    }
    {
      let text = "[Up/Down Arrow]/[DPad ↑ / ↓ ] to adjust aim";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.textAlign = "end";
      ctx.fillText(text, 1220, 130);
      ctx.textAlign = "start";
    }
    {
      let text = "[F]/[ B ] to cycle through ammo types";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.textAlign = "end";
      ctx.fillText(text, 1220, 160);
      ctx.textAlign = "start";
    }
    {
      let text = "[SPACE]/[ A ] to shoot!";
      ctx.font = "normal 16px Courier New";
      ctx.fillStyle = "#808080";
      ctx.textAlign = "end";
      ctx.fillText(text, 1220, 190);
      ctx.textAlign = "start";
    }

    {
      let points = [
        [985, 98],
        [1025, 98],
        [1023, 127],
        [1062, 127],
        [927, 156],
        [1100, 186],
      ];
      for (let point of points) {
        ctx.beginPath();
        ctx.strokeStyle = "#808080";
        ctx.arc(point[0], point[1], 10, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
}
