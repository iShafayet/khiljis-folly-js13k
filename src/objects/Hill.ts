import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Game } from "./Game";

export class Hill {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    let xoff = CANVAS_BASE_WIDTH - 600;
    let yoff = 180;
    this.drawHill(ctx, xoff, yoff);
  }

  private drawHill(ctx, xoff, yoff) {
    ctx.strokeStyle = "brown";

    ctx.beginPath();
    ctx.moveTo(259 + xoff, 497 + yoff);
    ctx.bezierCurveTo(257 + xoff, 512 + yoff, 276 + xoff, 422 + yoff, 268 + xoff, 435 + yoff);
    ctx.bezierCurveTo(260 + xoff, 448 + yoff, 304 + xoff, 385 + yoff, 293 + xoff, 396 + yoff);
    ctx.bezierCurveTo(282 + xoff, 407 + yoff, 337 + xoff, 358 + yoff, 324 + xoff, 365 + yoff);
    ctx.bezierCurveTo(311 + xoff, 372 + yoff, 378 + xoff, 340 + yoff, 364 + xoff, 344 + yoff);
    ctx.bezierCurveTo(350 + xoff, 348 + yoff, 422 + xoff, 326 + yoff, 408 + xoff, 331 + yoff);
    ctx.bezierCurveTo(394 + xoff, 336 + yoff, 462 + xoff, 307 + yoff, 449 + xoff, 315 + yoff);
    ctx.bezierCurveTo(436 + xoff, 323 + yoff, 496 + xoff, 287 + yoff, 483 + xoff, 295 + yoff);
    ctx.bezierCurveTo(470 + xoff, 303 + yoff, 537 + xoff, 271 + yoff, 522 + xoff, 271 + yoff);
    ctx.bezierCurveTo(507 + xoff, 271 + yoff, 571 + xoff, 270 + yoff, 556 + xoff, 270 + yoff);
    ctx.bezierCurveTo(541 + xoff, 270 + yoff, 599 + xoff, 270 + yoff, 584 + xoff, 270 + yoff);
    ctx.stroke();
  }
}
