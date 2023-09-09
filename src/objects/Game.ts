import { InputState } from "../InputState";
import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
import { Enemy } from "./Enemy";
import { EnemyFactory } from "./EnemyFactory";
import { EnemyType } from "./EnemyType";
import { FpsCounter } from "./FpsCounter";
import { GameState } from "./GameState";
import { Hill } from "./Hill";
import { PlayerCharacter } from "./PlayerCharacter";
import { Road } from "./Road";

export class Game {
  state = GameState.IDLE;

  hill: Hill;
  pc: PlayerCharacter;
  fpsCounter: FpsCounter;
  road: Road;
  enemyFactory: EnemyFactory;
  enemyList: Enemy[];

  time: number;

  public initialize() {
    this.updateTime();

    this.fpsCounter = new FpsCounter(this);
    this.enemyFactory = new EnemyFactory(this);
    this.hill = new Hill(this);
    this.road = new Road(this);
    this.pc = new PlayerCharacter(this);
    this.pc.initialize();
    this.enemyList = [];
  }

  public showMenu() {
    this.state = GameState.MENU;
    this.enemyFactory.notifyMenuShown();
  }

  public startGame() {
    this.state = GameState.STARTED;
    this.enemyFactory.notifyGameStart();
  }

  public updateState(inputState: InputState) {
    this.pc.updateState(inputState);

    this.enemyFactory.updateState();

    this.enemyList.forEach((enemy: Enemy) => {
      enemy.updateState();
    });
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT);

    this.hill.draw(ctx);
    this.road.draw(ctx);
    this.pc.draw(ctx);

    this.enemyList.forEach((enemy: Enemy) => {
      enemy.draw(ctx);
    });

    this.fpsCounter.draw(ctx);
  }

  private updateTime() {
    this.time = Date.now();
  }
}
