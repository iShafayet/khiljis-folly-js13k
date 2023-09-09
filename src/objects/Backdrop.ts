import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";

type Mountain = {
  color: string;
  points: [number, number][];
};

export class Backdrop {
  game: Game;
  mountains: Mountain[];

  constructor(game: Game) {
    this.game = game;
    this.mountains = [];
  }

  initialize() {
    let mountainCount = 4;
    let yOffset = 400;

    for (let mountainIndex = 0; mountainIndex < mountainCount; mountainIndex += 1) {
      let alphaChannel = (20 + mountainIndex * 10) / 100;
      let mountain = {
        color: `rgba(67, 99, 79, ${alphaChannel})`,
        points: [],
      };

      let x = 0;
      mountain.points.push([x, yOffset]);
      for (let i = 0; i < 100; i++) {
        let xInc = 60 + Math.random() * 100;
        let yDelta = Math.random() * 40 * (Math.random() > 0.5 ? 1 : -1);
        x += xInc;
        let y = yOffset + yDelta;
        mountain.points.push([x, y]);
      }
      mountain.points.push([CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT]);
      mountain.points.push([0, CANVAS_BASE_HEIGHT]);
      mountain.points.push([0, CANVAS_BASE_HEIGHT]);

      this.mountains.push(mountain);
      yOffset += 70;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let mountain of this.mountains) {
      this.drawMountain(ctx, mountain);
    }
  }

  drawMountain(ctx: CanvasRenderingContext2D, mountain: Mountain) {
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = mountain.color;

    let { points } = mountain;

    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length - 1; i++) {
      let c = (points[i][0] + points[i + 1][0]) / 2;
      let d = (points[i][1] + points[i + 1][1]) / 2;
      ctx.quadraticCurveTo(mountain.points[i][0], mountain.points[i][1], c, d);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
