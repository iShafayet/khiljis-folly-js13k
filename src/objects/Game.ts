import { InputState } from "../InputState";
import { CANVAS_BASE_HEIGHT, CANVAS_BASE_WIDTH } from "../constants";
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

  initialize() {
    this.fpsCounter = new FpsCounter();
    this.hill = new Hill();
    this.road = new Road();
    this.pc = new PlayerCharacter();
    this.pc.initialize();
  }

  showMenu() {
    this.state = GameState.MENU;
  }

  updateState(inputState: InputState) {
    this.pc.updateState(inputState);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT);

    this.hill.draw(ctx);
    this.road.draw(ctx);
    this.pc.draw(ctx);

    this.fpsCounter.draw(ctx);
  }
}
