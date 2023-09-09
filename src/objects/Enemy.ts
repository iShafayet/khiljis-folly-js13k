import { EnemyType } from "./EnemyType";
import { Game } from "./Game";
import { GameState } from "./GameState";

export class Enemy {
  game: Game;

  type: EnemyType;
  speed: number;
  health: number;

  x: number;
  y: number;

  SPEED_FACTOR: number = 0.25;

  constructor(game: Game, type: EnemyType) {
    this.game = game;

    this.type = type;
    if (type == EnemyType.BASIC) {
      this.speed = 2;
      this.health = 2;
    } else if (type == EnemyType.HEAVY) {
      this.speed = 2;
      this.health = 4;
    } else if (type == EnemyType.FAST) {
      this.speed = 4;
      this.health = 1;
    }

    this.x = 30;
    this.y = 670;
  }

  updateState() {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    this.x += this.speed * this.SPEED_FACTOR;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.type == EnemyType.BASIC) {
      ctx.strokeStyle = "red";
    }
    if (this.type == EnemyType.HEAVY) {
      ctx.strokeStyle = "yellow";
    }
    if (this.type == EnemyType.FAST) {
      ctx.strokeStyle = "blue";
    }

    ctx.beginPath();

    let [x, y] = [this.x, this.y];

    let tempRadious = 6;
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.stroke();

    this.drawHealth(ctx);
  }

  private drawHealth(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.health; i++) {
      ctx.fillStyle = "red";
      ctx.beginPath();

      let x = this.x + i * 7 - (this.health / 2) * 7;
      let y = this.y - 20;

      ctx.fillRect(x, y, 6, 6);

      ctx.stroke();
    }
  }
}
