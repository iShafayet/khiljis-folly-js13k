import { Game } from "./Game";

export class Hill {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawHill(ctx);
  }

  private drawHill(ctx: CanvasRenderingContext2D) {
    let points = [
      [917, 720],
      [945, 617],
      [975, 578],
      [1000, 544],
      [1204, 453],
      [1276, 448],
      [1280, 720],
      [1280, 720],
    ];

    ctx.fillStyle = "rgba(67, 99, 79, .9)";
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length - 1; i++) {
      let c = (points[i][0] + points[i + 1][0]) / 2;
      let d = (points[i][1] + points[i + 1][1]) / 2;
      ctx.quadraticCurveTo(points[i][0], points[i][1], c, d);
    }
    ctx.closePath();
    ctx.fill();
  }
}
