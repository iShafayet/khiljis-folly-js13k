import { InputState } from "../InputState";
import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Backdrop } from "./Backdrop";
import { Enemy } from "./Enemy";
import { EnemyFactory } from "./EnemyFactory";
import { EnemyType } from "./EnemyType";
import { FpsCounter } from "./FpsCounter";
import { GameState } from "./GameState";
import { Hill } from "./Hill";
import { PlayerCharacter } from "./PlayerCharacter";
import { Projectile } from "./Projectile";
import { ProjectileFactory } from "./ProjectileFactory";
import { Road } from "./Road";
import { TrajectoryVisualizer } from "./TrajectoryVisualizer";

export class Game {
  state = GameState.IDLE;

  hill: Hill;
  pc: PlayerCharacter;
  fpsCounter: FpsCounter;
  road: Road;
  enemyFactory: EnemyFactory;
  enemyList: Enemy[];
  projectileFactory: ProjectileFactory;
  projectileList: Projectile[];
  backdrop: Backdrop;

  time: number;
  trajectoryVisualizer: TrajectoryVisualizer;

  public initialize() {
    this.updateTime();

    this.backdrop = new Backdrop(this);
    this.fpsCounter = new FpsCounter(this);
    this.enemyFactory = new EnemyFactory(this);
    this.hill = new Hill(this);
    this.road = new Road(this);
    this.pc = new PlayerCharacter(this);
    this.trajectoryVisualizer = new TrajectoryVisualizer(this);
    this.projectileFactory = new ProjectileFactory(this);

    this.enemyList = [];
    this.projectileList = [];

    this.backdrop.initialize();
    this.pc.initialize();
  }

  public showMenu() {
    this.state = GameState.MENU;
    this.enemyFactory.notifyMenuShown();
    this.projectileFactory.notifyMenuShown();
  }

  public startGame() {
    this.state = GameState.STARTED;
    this.enemyFactory.notifyGameStart();
    this.projectileFactory.notifyGameStart();
  }

  public updateState(inputState: InputState) {
    this.pc.updateState(inputState);

    this.enemyFactory.updateState();
    this.projectileFactory.updateState(inputState);

    this.enemyList.forEach((enemy: Enemy) => {
      enemy.updateState();
    });

    this.projectileList.forEach((projectile: Projectile) => {
      projectile.updateState();
    });
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT);

    this.backdrop.draw(ctx);

    this.hill.draw(ctx);
    this.road.draw(ctx);
    this.pc.draw(ctx);

    this.trajectoryVisualizer.draw(ctx);

    this.enemyList.forEach((enemy: Enemy) => {
      enemy.draw(ctx);
    });

    this.projectileList.forEach((projectile: Projectile) => {
      projectile.draw(ctx);
    });

    this.fpsCounter.draw(ctx);
  }

  private updateTime() {
    this.time = Date.now();
  }
}
