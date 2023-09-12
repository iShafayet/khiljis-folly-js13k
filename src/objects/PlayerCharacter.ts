import { InputState } from "../InputState";
import { Game } from "./Game";
import { GameState } from "./GameState";
import monkIdleSpriteSheetFile from "../../assets/monkIdle.png";
import monkRunningSpriteSheetFile from "../../assets/monkRunning.png";
import monkShootingSpriteSheetFile from "../../assets/monkShooting.png";

import { PlayerCharacterState } from "./PlayerCharacterState";
import { mirrorImageVertical } from "../lib/utility";

const monkIdleImage = new Image();
monkIdleImage.src = monkIdleSpriteSheetFile;

const monkRunningImage = new Image();
monkRunningImage.src = monkRunningSpriteSheetFile;

const monkShootingImage = new Image();
monkShootingImage.src = monkShootingSpriteSheetFile;

export class PlayerCharacter {
  game: Game;
  state: PlayerCharacterState;
  idleStateTotalFrame: number;
  idleStateCurrentFrame: number;
  runningStateCurrentFrame: number;
  runningStateTotalFrame: number;
  shootingStateCurrentFrame: number;
  shootingStateTotalFrame: number;

  constructor(game: Game) {
    this.game = game;
    this.state = PlayerCharacterState.IDLE;
    this.idleStateCurrentFrame = 0;
    this.idleStateTotalFrame = 6;
    this.runningStateCurrentFrame = 0;
    this.runningStateTotalFrame = 8;
    this.shootingStateCurrentFrame = 0;
    this.shootingStateTotalFrame = 6;
  }

  projectileAngle = 45;
  angleMin = -45;
  angleMax = 45;

  xPosition = 0;

  xOffset = 1000;
  xMin = 0;
  xMax = 200;

  yOffset = 530;
  yMin = 0;
  yMax = 90;

  public computeCurrentCoordinates(): [number, number] {
    let x = this.xOffset + this.xPosition;
    let y = this.yOffset - (this.xPosition / this.xMax) * this.yMax;
    return [x, y];
  }

  initialize() {
    this.xPosition = 0;
  }

  updateState(inputState: InputState) {
    if (this.game.state !== GameState.STARTED) {
      return;
    }

    if (inputState.left) {
      if (this.xPosition > this.xMin) {
        this.xPosition -= 1;
      }
    }
    if (inputState.right) {
      if (this.xPosition < this.xMax) {
        this.xPosition += 1;
      }
    }
    if (inputState.down) {
      if (this.projectileAngle > this.angleMin) {
        this.projectileAngle -= 1;
      }
    }
    if (inputState.up) {
      if (this.projectileAngle < this.angleMax) {
        this.projectileAngle += 1;
      }
    }

    if (!inputState.left && !inputState.right && this.state != PlayerCharacterState.SHOOTING) {
      this.state = PlayerCharacterState.IDLE;
    }
    if (inputState.left) {
      this.state = PlayerCharacterState.MOVING_LEFT;
    }
    if (inputState.right) {
      this.state = PlayerCharacterState.MOVING_RIGHT;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let image: HTMLImageElement;
    let currentFrame: number;
    let totalFrame: number;

    let [x, y] = this.computeCurrentCoordinates();

    if (this.state == PlayerCharacterState.IDLE) {
      image = monkIdleImage;
      this.idleStateCurrentFrame += 0.3;

      if (this.idleStateCurrentFrame >= this.idleStateTotalFrame) {
        this.idleStateCurrentFrame = 0;
      }

      currentFrame = this.idleStateCurrentFrame;
      totalFrame = this.idleStateTotalFrame;
    } else if (this.state == PlayerCharacterState.MOVING_LEFT || this.state == PlayerCharacterState.MOVING_RIGHT) {
      image = monkRunningImage;
      this.runningStateCurrentFrame += 0.25;

      if (this.runningStateCurrentFrame >= this.runningStateTotalFrame) {
        this.runningStateCurrentFrame = 0;
      }

      currentFrame = this.runningStateCurrentFrame;
      totalFrame = this.runningStateTotalFrame;

      if (this.state == PlayerCharacterState.MOVING_LEFT) {
        image = mirrorImageVertical(image);
      }
    } else if (this.state == PlayerCharacterState.SHOOTING) {
      image = monkShootingImage;
      this.shootingStateCurrentFrame += 0.2;

      if (this.shootingStateCurrentFrame >= this.shootingStateTotalFrame) {
        this.shootingStateCurrentFrame = 0;
        this.state = PlayerCharacterState.IDLE;
      }

      currentFrame = this.shootingStateCurrentFrame;
      totalFrame = this.shootingStateTotalFrame;
    }

    let frame = Math.floor(currentFrame);
    let pieceWidth = image.width / totalFrame;
    let pieceHeight = image.height;

    const destinationScale = 1.5;
    ctx.drawImage(
      image,
      frame * pieceWidth,
      0,
      pieceWidth,
      pieceHeight,
      x - pieceWidth / 2,
      y - pieceHeight / 2,
      pieceWidth * destinationScale,
      pieceHeight * destinationScale
    );

    console.log(this.state);
  }
}
