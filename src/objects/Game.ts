import { InputState } from "../InputState";
import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Backdrop } from "./Backdrop";
import { CleanupService } from "./CleanupService";
import { Enemy } from "./Enemy";
import { EnemyFactory } from "./EnemyFactory";
import { EnemyType } from "./EnemyType";
import { FpsCounter } from "./FpsCounter";
import { GameOverNotice } from "./GameOverNotice";
import { GameState } from "./GameState";
import { Hill } from "./Hill";
import { Level } from "./Level";
import { LifeKeeper } from "./LifeKeeper";
import { MenuWithCredits } from "./MenuWithCredits";
import { PlayerCharacter } from "./PlayerCharacter";
import { Projectile } from "./Projectile";
import { ProjectileFactory } from "./ProjectileFactory";
import { ProjectileSwitcher } from "./ProjectileSwitcher";
import { Road } from "./Road";
import { ScoreKeeper } from "./ScoreKeeper";
import { TrajectoryVisualizer } from "./TrajectoryVisualizer";

export class Game {
  state = GameState.IDLE;

  inDebugMode: boolean = true;

  hill: Hill;
  pc: PlayerCharacter;
  fpsCounter: FpsCounter;
  road: Road;
  enemyFactory: EnemyFactory;
  enemyList: Enemy[];
  projectileFactory: ProjectileFactory;
  projectileList: Projectile[];
  backdrop: Backdrop;
  scoreKeeper: ScoreKeeper;
  lifeKeeper: LifeKeeper;
  cleanupService: CleanupService;
  menuWithCredits: MenuWithCredits;
  gameOverNotice: GameOverNotice;
  projectileSwitcher: ProjectileSwitcher;
  level: Level;

  time: number;
  trajectoryVisualizer: TrajectoryVisualizer;
  gameResetSubscriberFn: Function;

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
    this.scoreKeeper = new ScoreKeeper(this);
    this.cleanupService = new CleanupService(this);
    this.lifeKeeper = new LifeKeeper(this);
    this.menuWithCredits = new MenuWithCredits(this);
    this.gameOverNotice = new GameOverNotice(this);
    this.projectileSwitcher = new ProjectileSwitcher(this);
    this.level = new Level(this);

    this.enemyList = [];
    this.projectileList = [];

    this.scoreKeeper.initialize();
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
    if (this.state === GameState.MENU && inputState.space) {
      this.state = GameState.STARTED;
      inputState.space = false;
    }

    if (this.gameOverNotice.shouldResetGame(inputState)) {
      this.gameResetSubscriberFn();
      return;
    }

    this.level.updateState();

    this.projectileSwitcher.updateState(inputState);

    this.pc.updateState(inputState);

    this.enemyFactory.updateState();
    this.projectileFactory.updateState(inputState);

    this.enemyList.forEach((enemy: Enemy) => {
      enemy.updateState();
    });

    this.projectileList.forEach((projectile: Projectile) => {
      projectile.updateState();
    });

    this.cleanupService.updateState();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT);

    this.backdrop.draw(ctx);

    this.menuWithCredits.draw(ctx);

    this.gameOverNotice.draw(ctx);

    this.level.draw(ctx);

    this.hill.draw(ctx);
    this.road.draw(ctx);
    this.pc.draw(ctx);

    this.projectileSwitcher.draw(ctx);

    this.trajectoryVisualizer.draw(ctx);

    this.enemyList.forEach((enemy: Enemy) => {
      enemy.draw(ctx);
    });

    this.projectileList.forEach((projectile: Projectile) => {
      projectile.draw(ctx);
    });

    this.scoreKeeper.draw(ctx);
    this.lifeKeeper.draw(ctx);

    this.fpsCounter.draw(ctx);
  }

  private updateTime() {
    this.time = Date.now();
  }

  public triggerGameOver() {
    this.state = GameState.ENDED;
    this.gameOverNotice.notifyGameOver();
  }

  public subscribeToGameReset(subscriberFn: Function) {
    this.gameResetSubscriberFn = subscriberFn;
  }
}
