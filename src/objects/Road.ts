import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";

export class Road {
  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(5, 690);
    ctx.lineTo(1275, 690);
    ctx.stroke();
  }
}
