import { InputState } from "../InputState";
import { SUBSEQUENT_PROJECTILE_CREATION_DELAY } from "../constants";
import { Game } from "./Game";
import { GameState } from "./GameState";
import { Projectile } from "./Projectile";
import { ProjectileType } from "./ProjectileType";

export class ProjectileFactory {
  game: Game;

  timeLastSpawned: number;

  constructor(game: Game) {
    this.game = game;
    this.timeLastSpawned = 0;
  }

  notifyMenuShown() {}

  notifyGameStart() {}

  updateState(inputState: InputState) {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    if (inputState.space) {
      let now = Date.now();
      if (now - this.timeLastSpawned > SUBSEQUENT_PROJECTILE_CREATION_DELAY) {
        let type = this.game.projectileSwitcher.selectedType;
        this.spawn(type);
      }
    }
  }

  private spawn(type: ProjectileType) {
    let projectile = new Projectile(this.game, type);
    this.game.projectileList.push(projectile);
    this.timeLastSpawned = Date.now();
  }
}
