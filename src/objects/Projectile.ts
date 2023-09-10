import { BASIC_PROJECTILE_VELOCITY, CANVAS_BASE_HEIGHT, GRAVITY, PROJECTILE_MOVEMENT_INCREMENT, PROJECTILE_VISUALIZATION_INCREMENT } from "../constants";
import { doCirclesCollide } from "../math";
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

  // math
  initY: number;
  initX: number;
  initAngle: number;
  velocityX: number;
  velocityY: number;

  isActive: boolean;

  hitboxRadious: number = 12;

  constructor(game: Game, type: ProjectileType) {
    this.game = game;

    this.type = type;
    this.velocity = Projectile.getVelocityOfProjectile(type);
    this.damage = Projectile.getDamageOfProjectile(type);

    [this.initX, this.initY] = this.game.pc.computeCurrentCoordinates();
    let initAngleDeg = this.game.pc.projectileAngle;

    this.initAngle = (initAngleDeg * Math.PI) / 180;
    this.velocityX = this.velocity * Math.cos(this.initAngle);
    this.velocityY = this.velocity * Math.sin(this.initAngle) * -1;

    this.x = this.initX;
    this.y = this.initY;

    this.isActive = true;
  }

  updateState() {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    let inc = Projectile.getIncrementOfProjectile(this.type);

    this.x = this.x - this.velocityX * inc;
    this.y = this.y + this.velocityY * inc;
    this.velocityY = this.velocityY + GRAVITY * inc * 0.1;

    if (this.isActive) {
      if (this.y > CANVAS_BASE_HEIGHT) {
        this.isActive = false;
        this.game.cleanupService.registerProjectileForCleanup(this);
      }

      this.detectCollision();
    }
  }

  private detectCollision() {
    let enemyList = this.game.enemyList;
    for (let enemy of enemyList) {
      let doCollides = doCirclesCollide(this.x, this.y, this.hitboxRadious, enemy.x, enemy.y, enemy.hitboxRadious);
      if (!doCollides) {
        continue;
      }

      this.game.scoreKeeper.awardScore(100);
      this.isActive = false;
      this.game.cleanupService.registerProjectileForCleanup(this);

      enemy.health -= this.damage;
      if (enemy.health <= 0) {
        enemy.isActive = false;
        this.game.cleanupService.registerEnemyForCleanup(enemy);
      }

      break;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    if (!this.isActive) {
      return;
    }

    if (this.y > CANVAS_BASE_HEIGHT - 30) {
      return;
    }

    if (this.type == ProjectileType.BASIC) {
      ctx.fillStyle = "red";
    }
    if (this.type == ProjectileType.HEAVY) {
      ctx.fillStyle = "yellow";
    }
    if (this.type == ProjectileType.FAST) {
      ctx.fillStyle = "blue";
    }

    let tempRadious = 9;
    let [x, y] = [this.x, this.y];

    ctx.beginPath();
    ctx.arc(x, y, tempRadious, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(50, 238, 121, 0.74)";
    ctx.fill();
    ctx.stroke();

    if (this.game.inDebugMode) {
      ctx.beginPath();
      ctx.arc(x, y, this.hitboxRadious, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.stroke();
    }
  }

  public static getVelocityOfProjectile(type: ProjectileType) {
    if (type == ProjectileType.BASIC) {
      return BASIC_PROJECTILE_VELOCITY;
    } else if (type == ProjectileType.HEAVY) {
      return BASIC_PROJECTILE_VELOCITY;
    } else if (type == ProjectileType.FAST) {
      return BASIC_PROJECTILE_VELOCITY;
    }
  }

  public static getIncrementOfProjectile(type: ProjectileType) {
    if (type == ProjectileType.BASIC) {
      return PROJECTILE_MOVEMENT_INCREMENT;
    } else if (type == ProjectileType.HEAVY) {
      return PROJECTILE_MOVEMENT_INCREMENT / 2;
    } else if (type == ProjectileType.FAST) {
      return PROJECTILE_MOVEMENT_INCREMENT * 2;
    }
  }

  public static getDamageOfProjectile(type: ProjectileType) {
    if (type == ProjectileType.BASIC) {
      return 2;
    } else if (type == ProjectileType.HEAVY) {
      return 4;
    } else if (type == ProjectileType.FAST) {
      return 1;
    }
  }
}
