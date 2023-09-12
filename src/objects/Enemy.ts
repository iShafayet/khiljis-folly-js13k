import { CANVAS_BASE_WIDTH, ENEMY_SPEED_FACTOR } from "../constants";
import { EnemyType } from "./EnemyType";
import { Game } from "./Game";
import { GameState } from "./GameState";
import khiljiBasicSpriteSheetFile from "../../assets/khiljiBasic.png";
import khiljiFastSpriteSheetFile from "../../assets/khiljiFast.png";
import khiljiHeavySpriteSheetFile from "../../assets/khiljiHeavy.png";

const khiljiBasicImage = new Image();
khiljiBasicImage.src = khiljiBasicSpriteSheetFile;

const khiljiFastImage = new Image();
khiljiFastImage.src = khiljiFastSpriteSheetFile;

const khiljiHeavyImage = new Image();
khiljiHeavyImage.src = khiljiHeavySpriteSheetFile;

export class Enemy {
  game: Game;

  type: EnemyType;
  speed: number;
  health: number;

  x: number;
  y: number;

  totalFrames: number;
  currentFrame: number;

  hitboxRadius: number;

  isActive: boolean;

  constructor(game: Game, type: EnemyType) {
    this.game = game;

    this.type = type;
    if (type == EnemyType.BASIC) {
      this.y = 672;
      this.speed = 2;
      this.health = 2;
      this.totalFrames = 4;
      this.hitboxRadius = 13;
    } else if (type == EnemyType.HEAVY) {
      this.y = 673;
      this.speed = 1.5;
      this.health = 4;
      this.totalFrames = 4;
      this.hitboxRadius = 20;
    } else if (type == EnemyType.FAST) {
      this.y = 670;
      this.speed = 4;
      this.health = 1;
      this.totalFrames = 4;
      this.hitboxRadius = 13;
    }

    this.currentFrame = 0;

    this.x = 30;

    this.isActive = true;
  }

  updateState() {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    if (this.x > CANVAS_BASE_WIDTH - 30) {
      this.isActive = false;
      this.game.lifeKeeper.reduceLife();
      this.game.cleanupService.registerEnemyForCleanup(this);
    }

    this.x += this.speed * ENEMY_SPEED_FACTOR * this.game.level.enemySpeedFactor;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.isActive) {
      return;
    }

    let image: HTMLImageElement;

    if (this.type == EnemyType.BASIC) {
      image = khiljiBasicImage;
      this.currentFrame += 0.2;
    } else if (this.type == EnemyType.FAST) {
      image = khiljiFastImage;
      this.currentFrame += 0.15;
    } else if (this.type == EnemyType.HEAVY) {
      image = khiljiHeavyImage;
      this.currentFrame += 0.15;
    }

    let frame = Math.floor(this.currentFrame);
    let pieceWidth = image.width / this.totalFrames;
    let pieceHeight = image.height;

    ctx.drawImage(image, frame * pieceWidth, 0, pieceWidth, pieceHeight, this.x - pieceWidth / 2, this.y - pieceHeight / 2, pieceWidth, pieceHeight);

    this.drawHealth(ctx);

    if (this.currentFrame >= this.totalFrames) {
      this.currentFrame = 0;
    }

    if (this.game.inDebugMode) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.hitboxRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.stroke();
    }
  }

  private drawHealth(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.health; i++) {
      ctx.fillStyle = "red";
      ctx.beginPath();

      let x = this.x + i * 7 - (this.health / 2) * 7;
      let y = this.y - 35;

      ctx.fillRect(x, y, 6, 6);

      ctx.stroke();
    }
  }
}
