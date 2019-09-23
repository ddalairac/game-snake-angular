import { Injectable } from "@angular/core";
import { SnakeModel } from "../model/skake.class";
import { MoveOpt } from "../model/move-options.enum";
import { AppleModel } from "../model/apple.class";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor() {}

  public stageSlots: Array<number[]> = [];
  public snakeLinks: SnakeModel[] = [];
  public apples: AppleModel[] = [];

  private _module: number;
  private _stageHeight: number;
  private _snakeMovQueue: Array<string | MoveOpt> = [];
  private _stageWidth: number;
  private _snakeHeadMov: string | MoveOpt;
  private _appleApearIteration: number;
  private _interval;
  private _i: number = 0;

  public get module(): number {
    return this._module;
  }
  public get stageWidth() {
    return this._stageWidth;
  }

  public createStage() {
    this.stageSlots = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    this._module = 30;
    this._stageHeight = this.stageSlots[0].length * this._module;
    this._stageWidth = this.stageSlots[1].length * this._module;
    this._appleApearIteration = 10;
  }
  public starGame() {
    this._snakeHeadMov = MoveOpt.ArrowRight;
    this._snakeMovQueue.push(MoveOpt.ArrowRight);
    // this.snakeLinks.push(new SnakeModel(90, 0)); //! borrar
    // this.snakeLinks.push(new SnakeModel(60, 0)); //! borrar
    // this.snakeLinks.push(new SnakeModel(30, 0)); //! borrar
    this.snakeLinks.push(new SnakeModel(0, 0));
    this.loop();
    this.applePush();
  }
  public newUserEvent(KeyboardEvent: KeyboardEvent): void {
    if (
      KeyboardEvent.key == MoveOpt.ArrowDown ||
      KeyboardEvent.key == MoveOpt.ArrowUp ||
      KeyboardEvent.key == MoveOpt.ArrowLeft ||
      KeyboardEvent.key == MoveOpt.ArrowRight
    ) {
      if (
        (this._snakeHeadMov == MoveOpt.ArrowRight &&
          KeyboardEvent.key != MoveOpt.ArrowLeft) ||
        (this._snakeHeadMov == MoveOpt.ArrowLeft &&
          KeyboardEvent.key != MoveOpt.ArrowRight) ||
        (this._snakeHeadMov == MoveOpt.ArrowDown &&
          KeyboardEvent.key != MoveOpt.ArrowUp) ||
        (this._snakeHeadMov == MoveOpt.ArrowUp &&
          KeyboardEvent.key != MoveOpt.ArrowDown)
      ) {
        this._snakeHeadMov = KeyboardEvent.key;
      }
    }
  }
  private loop() {
    let nextApplepush = this._appleApearIteration;
    this._interval = setInterval(() => {
      this.eatApple();
      this.eatItself();
      this.update_SnakeMovQueue();
      this.snakeMove();
      this._i++;
    }, 100);
  }
  private update_SnakeMovQueue() {
    this._snakeMovQueue.unshift(this._snakeHeadMov);
    this._snakeMovQueue.pop();
  }
  private snakeMove() {
    for (let i = 0; i < this.snakeLinks.length; i++) {
      this.snakeLinkDirection(this._snakeMovQueue[i], this.snakeLinks[i]);
    }
  }
  private snakeLinkDirection(
    direction: string | MoveOpt,
    link: SnakeModel
  ): void {
    this.snakeLinks[0].headAngle = 15;
    this.snakeLinks[0].headFlip = false;
    switch (direction) {
      case "ArrowDown":
        this.snakeLinkMove(this._module, 0, link);
        this.snakeLinks[0].headAngle += 45;
        break;
      case "ArrowUp":
        this.snakeLinkMove(-this._module, 0, link);
        this.snakeLinks[0].headAngle += 270;
        break;
      case "ArrowRight":
        this.snakeLinkMove(0, this._module, link);
        break;
      case "ArrowLeft":
        this.snakeLinkMove(0, -this._module, link);
        this.snakeLinks[0].headAngle += 90;
        this.snakeLinks[0].headFlip = true;
        break;
    }
  }
  private snakeLinkMove(y: number, x: number, link: SnakeModel): void {
    link.y += y;
    link.x += x;
    if (link.y > this._stageHeight - this._module) {
      link.y = 0;
    } else if (link.y < 0) {
      link.y = (this.stageSlots[1].length - 1) * this._module;
    }

    if (link.x > this._stageWidth - this._module) {
      link.x = 0;
    } else if (link.x < 0) {
      link.x = (this.stageSlots[1].length - 1) * this._module;
    }
  }
  private findEmptySlot(): [number, number] {
    let empty = false;
    let x: number;
    let y: number;

    while (!empty) {
      x =
        (Math.floor(Math.random() * this.stageSlots[1].length) + 0) *
        this._module;
      y =
        (Math.floor(Math.random() * this.stageSlots[0].length) + 0) *
        this._module;
      for (let i = 0; i < this.snakeLinks.length; i++) {
        if (this.snakeLinks[i].x == x && this.snakeLinks[i].y == y) {
          break;
        }
        if (i == this.snakeLinks.length - 1) {
          empty = true;
        }
      }
    }
    return [x, y];
  }
  private applePush() {
    let applePosition: number[] = [];
    applePosition = this.findEmptySlot();
    this.apples.push(new AppleModel(applePosition[0], applePosition[1], "red"));
  }
  private eatApple() {
    let colition = false;
    let newLink = {
      x: this.snakeLinks[this.snakeLinks.length - 1].lastX,
      y: this.snakeLinks[this.snakeLinks.length - 1].lastY
    };
    for (let i = 0; i < this.apples.length; i++) {
      if (
        this.snakeLinks[0].x == this.apples[i].x &&
        this.snakeLinks[0].y == this.apples[i].y
      ) {
        // console.log("colition!");
        colition = true;
        let lastIndex = this._snakeMovQueue.length - 1;
        this._snakeMovQueue.push(this._snakeMovQueue[lastIndex]);
        this.snakeLinks.push(new SnakeModel(newLink.x, newLink.y));
        this.apples[i].color = "yellow";
        this.apples.splice(i, 1);
        this.applePush();
        break;
      }
    }
    return colition;
  }
  private eatItself(): boolean {
    let dead = false;
    for (let i = 0; i < this.snakeLinks.length; i++) {
      for (let j = i + 1; j < this.snakeLinks.length; j++) {
        if (
          this.snakeLinks[i].x == this.snakeLinks[j].x &&
          this.snakeLinks[i].y == this.snakeLinks[j].y
        ) {
          dead = true;
          break;
        }
      }
    }
    if (dead) {
      for (let link of this.snakeLinks) {
        link.color = "red";
      }
      clearInterval(this._interval);

      alert("GAME OVER!");
    }
    return dead;
  }
}
