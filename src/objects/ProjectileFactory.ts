import { InputState } from "../InputState";
import { Game } from "./Game";
import { Projectile } from "./Projectile";
import { ProjectileType } from "./ProjectileType";

export class ProjectileFactory {
  game: Game;

  PROJECTILE_CREATION_DELAY = 500;

  timeLastSpawned: number;

  constructor(game: Game) {
    this.game = game;
    this.timeLastSpawned = 0;
  }

  notifyMenuShown() {}

  notifyGameStart() {}

  updateState(inputState: InputState) {
    if (inputState.space) {
      let now = Date.now();
      if (now - this.timeLastSpawned > this.PROJECTILE_CREATION_DELAY) {
        this.spawn(ProjectileType.BASIC);
      }
    }
  }

  private spawn(type: ProjectileType) {
    let projectile = new Projectile(this.game, type);
    this.game.projectileList.push(projectile);
    this.timeLastSpawned = Date.now();
  }
}
