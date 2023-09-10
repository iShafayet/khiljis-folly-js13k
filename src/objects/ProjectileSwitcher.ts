import { InputState } from "../InputState";
import { BASIC_PROJECTILE_VELOCITY, CANVAS_BASE_HEIGHT, GRAVITY } from "../constants";
import { doCirclesCollide } from "../math";
import { Game } from "./Game";
import { GameState } from "./GameState";
import { PROJECTILE_TYPE_COUNT, ProjectileType } from "./ProjectileType";

export class ProjectileSwitcher {
  game: Game;

  selectedType: ProjectileType;

  constructor(game: Game) {
    this.game = game;
    this.selectedType = ProjectileType.BASIC;
  }

  updateState(inputState: InputState) {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    if (!inputState.f) {
      return;
    }

    inputState.f = false;
    this.selectedType += 1;
    if (this.selectedType >= PROJECTILE_TYPE_COUNT) {
      this.selectedType = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    this.drawSampleProjectile(ctx, 1080, 370, ProjectileType.BASIC);
    this.drawSampleProjectile(ctx, 1120, 370, ProjectileType.FAST);
    this.drawSampleProjectile(ctx, 1160, 370, ProjectileType.HEAVY);
  }

  drawSampleProjectile(ctx: CanvasRenderingContext2D, x, y, type: ProjectileType) {
    if (type == ProjectileType.BASIC) {
      ctx.fillStyle = "red";
    }
    if (type == ProjectileType.HEAVY) {
      ctx.fillStyle = "yellow";
    }
    if (type == ProjectileType.FAST) {
      ctx.fillStyle = "blue";
    }

    if (type == this.selectedType) {
      ctx.strokeStyle = "green";
    } else {
      ctx.strokeStyle = "transparent";
    }

    let tempRadious = 9;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 1;
  }
}
