import { BASIC_PROJECTILE_VELOCITY, GRAVITY } from "../constants";
import { Game } from "./Game";
import { GameState } from "./GameState";
import { ProjectileType } from "./ProjectileType";

export class Projectile {
  game: Game;

  type: ProjectileType;
  velocity: number;
  damage: number;

  x: number;
  y: number;

  SPEED_FACTOR: number = 1;

  // math
  initY: number;
  initX: number;
  initAngle: number;
  velocityX: number;
  velocityY: number;

  constructor(game: Game, type: ProjectileType) {
    this.game = game;

    this.type = type;
    if (type == ProjectileType.BASIC) {
      this.velocity = BASIC_PROJECTILE_VELOCITY;
      this.damage = 2;
    } else if (type == ProjectileType.HEAVY) {
      this.velocity = BASIC_PROJECTILE_VELOCITY / 2;
      this.damage = 4;
    } else if (type == ProjectileType.FAST) {
      this.velocity = BASIC_PROJECTILE_VELOCITY * 2;
      this.damage = 1;
    }

    [this.initX, this.initY] = this.game.pc.computeCurrentCoordinates();
    let initAngleDeg = this.game.pc.projectileAngle;

    this.initAngle = (initAngleDeg * Math.PI) / 180;
    this.velocityX = this.velocity * Math.cos(this.initAngle);
    this.velocityY = this.velocity * Math.sin(this.initAngle) * -1;

    this.x = this.initX;
    this.y = this.initY;
  }

  updateState() {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    let inc = 1;

    this.x = this.x - this.velocityX * inc;
    this.y = this.y + this.velocityY * inc;
    this.velocityY = this.velocityY + GRAVITY * inc * 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.type == ProjectileType.BASIC) {
      ctx.strokeStyle = "red";
    }
    if (this.type == ProjectileType.HEAVY) {
      ctx.strokeStyle = "yellow";
    }
    if (this.type == ProjectileType.FAST) {
      ctx.strokeStyle = "blue";
    }

    let tempRadious = 9;
    let [x, y] = [this.x, this.y];

    ctx.beginPath();
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(50, 238, 121, 0.74)";
    ctx.fill();
    ctx.stroke();
  }
}
