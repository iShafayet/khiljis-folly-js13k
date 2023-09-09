import { Enemy } from "./Enemy";
import { Game } from "./Game";
import { Projectile } from "./Projectile";

export class CleanupService {
  game: Game;

  enemyToCleanupList: Enemy[];
  projectileToCleanupList: Projectile[];

  constructor(game: Game) {
    this.game = game;
    this.enemyToCleanupList = [];
    this.projectileToCleanupList = [];
  }

  updateState() {
    {
      let localIndex = this.enemyToCleanupList.length;
      while (localIndex--) {
        let enemy = this.enemyToCleanupList[localIndex];

        let index = this.game.enemyList.indexOf(enemy);
        if (index > -1) {
          this.game.enemyList.splice(index, 1);
        }

        this.enemyToCleanupList.splice(localIndex, 1);
      }
    }

    let localIndex = this.projectileToCleanupList.length;
    while (localIndex--) {
      let projectile = this.projectileToCleanupList[localIndex];

      {
        let index = this.game.projectileList.indexOf(projectile);
        if (index > -1) {
          this.game.projectileList.splice(index, 1);
        }
      }
      this.projectileToCleanupList.splice(localIndex, 1);
    }
  }

  registerEnemyForCleanup(enemy: Enemy) {
    this.enemyToCleanupList.push(enemy);
  }

  registerProjectileForCleanup(projectile: Projectile) {
    this.projectileToCleanupList.push(projectile);
  }
}
