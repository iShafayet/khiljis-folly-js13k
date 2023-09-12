import { InputState } from "../InputState";
import { BASIC_PROJECTILE_VELOCITY, CANVAS_BASE_HEIGHT, GRAVITY } from "../constants";
import { Particle, drawFireEffect } from "../lib/fire-effect";
import { doCirclesCollide } from "../lib/math";
import { Game } from "./Game";
import { GameState } from "./GameState";
import { Projectile } from "./Projectile";
import { PROJECTILE_TYPE_COUNT, ProjectileType } from "./ProjectileType";

export class ProjectileSwitcher {
  game: Game;

  selectedType: ProjectileType;

  particleListMap: Record<string, Particle[]> = {};

  constructor(game: Game) {
    this.game = game;
    this.selectedType = ProjectileType.BASIC;

    this.particleListMap = {
      [ProjectileType.BASIC]: [],
      [ProjectileType.FAST]: [],
      [ProjectileType.HEAVY]: [],
    };
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

    this.drawSampleProjectile(ctx, 40 + 1080, 320, ProjectileType.FAST);
    this.drawSampleProjectile(ctx, 40 + 1120, 320, ProjectileType.BASIC);
    this.drawSampleProjectile(ctx, 40 + 1160, 320, ProjectileType.HEAVY);
  }

  drawSampleProjectile(ctx: CanvasRenderingContext2D, x, y, type: ProjectileType) {
    let size = Projectile.getDamageOfProjectile(type) * 2;
    let maxAge = 40;
    drawFireEffect(ctx, x, y, size, maxAge, this.particleListMap[type]);

    if (this.selectedType === type) {
      ctx.beginPath();
      ctx.moveTo(x, y + 16);
      ctx.lineTo(x - 10, y + 32);
      ctx.lineTo(x + 10, y + 32);
      ctx.fill();
    }
  }
}
