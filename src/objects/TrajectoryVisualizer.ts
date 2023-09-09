import { CANVAS_BASE_HEIGHT, GRAVITY } from "../constants";
import { Game } from "./Game";
import { GameState } from "./GameState";

export class TrajectoryVisualizer {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    // external and constants
    let angleDeg = this.game.pc.projectileAngle;
    let velocity = 30;
    let [x, y] = this.game.pc.computeCurrentCoordinates();

    // computed
    let angle = (angleDeg * Math.PI) / 180;
    let velocityX = velocity * Math.cos(angle);
    let velocityY = velocity * Math.sin(angle) * -1;

    let inc = 1;
    for (let time = 0; time < 300; time++) {
      this.drawPoint(ctx, x, y);

      time = time + inc;
      x = x - velocityX * inc;
      y = y + velocityY * inc;
      velocityY = velocityY + GRAVITY * inc * 0.1;

      if (y > CANVAS_BASE_HEIGHT) break;
    }
  }

  private drawPoint(ctx, x, y) {
    ctx.strokeStyle = "rgba(50, 238, 121, 0.74)";
    ctx.beginPath();
    let tempRadious = 2;
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
