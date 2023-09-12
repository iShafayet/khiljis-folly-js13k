import { Game } from "./Game";

export class Level {
  game: Game;
  spawnRateFactor: number;
  enemySpeedFactor: number;
  currentLevel: number;

  constructor(game: Game) {
    this.game = game;
    this.currentLevel = 1;
    this.spawnRateFactor = 1;
    this.enemySpeedFactor = 1;
  }

  updateState() {
    if (this.game.scoreKeeper.currentScore > 10_000) {
      this.currentLevel = 5;
      this.spawnRateFactor = 3;
      this.enemySpeedFactor = 3;
    } else if (this.game.scoreKeeper.currentScore > 8_000) {
      this.currentLevel = 4;
      this.spawnRateFactor = 2.2;
      this.enemySpeedFactor = 2.2;
    } else if (this.game.scoreKeeper.currentScore > 5_000) {
      this.currentLevel = 3;
      this.spawnRateFactor = 1.8;
      this.enemySpeedFactor = 1.8;
    } else if (this.game.scoreKeeper.currentScore > 1_000) {
      this.currentLevel = 2;
      this.spawnRateFactor = 1.4;
      this.enemySpeedFactor = 1.4;
    } else {
      this.currentLevel = 1;
      this.spawnRateFactor = 1;
      this.enemySpeedFactor = 1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let text = `Level ${this.currentLevel}`;
    ctx.font = "bold 20px Courier New";
    ctx.fillStyle = "#818589";
    ctx.fillText(text, 20, 80);
  }
}
