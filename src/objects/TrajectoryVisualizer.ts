import { BASIC_PROJECTILE_VELOCITY, CANVAS_BASE_HEIGHT, GRAVITY } from "../constants";
import { Game } from "./Game";
import { GameState } from "./GameState";
import { Projectile } from "./Projectile";
import { ProjectileType } from "./ProjectileType";

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

    let type = this.game.projectileSwitcher.selectedType;
    let velocity = Projectile.getVelocityOfProjectile(type);

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

      if (y > CANVAS_BASE_HEIGHT - 30) break;
    }
  }

  private drawPoint(ctx: CanvasRenderingContext2D, x, y) {
    ctx.fillStyle = "rgba(67, 99, 79, .9)";
    ctx.beginPath();
    let tempRadious = 2;
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.fill();
  }
}
