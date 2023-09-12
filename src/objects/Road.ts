import { Game } from "./Game";

export class Road {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(5, 690);
    ctx.lineTo(1275, 690);
    ctx.stroke();
  }
}
