import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SnakeModel, AppleModel } from "src/app/model/skake.class";
import { MoveOpt } from "src/app/model/move-options.enum";

@Component({
  selector: "app-stage",
  templateUrl: "./stage.component.html",
  styleUrls: ["./stage.component.scss"]
})
export class StageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.stageSlots = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    this.modulo = 30;
    this.stageHeight = this.stageSlots[0].length * this.modulo;
    this.stageWidth = this.stageSlots[1].length * this.modulo;
    this.snakeLinks = [];
    this.snakeHeadMov = MoveOpt.ArrowRight;
    this.snakeMovQueue.push(MoveOpt.ArrowRight);
    this.apples = [];
    this.appleApearIteration = 10;
    this.snakeLinks.push(new SnakeModel(0, 0));
    this.loop();
    this.applePush();
  }
  stageSlots: Array<number[]>;
  modulo: number;
  stageHeight: number;
  stageWidth: number;
  snakeLinks: SnakeModel[];
  snakeHeadMov: string | MoveOpt;
  apples: AppleModel[];
  appleApearIteration: number;

  snakeMovQueue: Array<string | MoveOpt> = [];
  interval;

  i: number = 0;
  loop() {
    let nextApplepush = this.appleApearIteration;
    this.interval = setInterval(() => {
      this.checkColition();
      this.selfEat();
      this.updateSnakeMovQueue();
      this.snakeMove();
      this.i++;
    }, 100);
  }
  onKeydown(KeyboardEvent: KeyboardEvent): void {
    if (
      KeyboardEvent.key == MoveOpt.ArrowDown ||
      KeyboardEvent.key == MoveOpt.ArrowUp ||
      KeyboardEvent.key == MoveOpt.ArrowLeft ||
      KeyboardEvent.key == MoveOpt.ArrowRight
    ) {
      if (
        (this.snakeHeadMov == MoveOpt.ArrowRight &&
          KeyboardEvent.key != MoveOpt.ArrowLeft) ||
        (this.snakeHeadMov == MoveOpt.ArrowLeft &&
          KeyboardEvent.key != MoveOpt.ArrowRight) ||
        (this.snakeHeadMov == MoveOpt.ArrowDown &&
          KeyboardEvent.key != MoveOpt.ArrowUp) ||
        (this.snakeHeadMov == MoveOpt.ArrowUp &&
          KeyboardEvent.key != MoveOpt.ArrowDown)
      ) {
        this.snakeHeadMov = KeyboardEvent.key;
      }
    }
  }
  updateSnakeMovQueue() {
    this.snakeMovQueue.unshift(this.snakeHeadMov);
    this.snakeMovQueue.pop();
    // console.log(this.snakeMovQueue);
  }
  snakeMove() {
    for (let i = 0; i < this.snakeLinks.length; i++) {
      this.snakeLinkDirection(this.snakeMovQueue[i], this.snakeLinks[i]);
    }
  }
  snakeLinkDirection(direction: string | MoveOpt, link: SnakeModel): void {
    switch (direction) {
      case "ArrowDown":
        this.snakeLinkMove(this.modulo, 0, link);
        break;
      case "ArrowUp":
        this.snakeLinkMove(-this.modulo, 0, link);
        break;
      case "ArrowRight":
        this.snakeLinkMove(0, this.modulo, link);
        break;
      case "ArrowLeft":
        this.snakeLinkMove(0, -this.modulo, link);
        break;
    }
  }
  snakeLinkMove(y: number, x: number, link: SnakeModel): void {
    link.y += y;
    link.x += x;
    if (link.y > this.stageHeight - this.modulo) {
      link.y = 0;
    } else if (link.y < 0) {
      link.y = (this.stageSlots[1].length - 1) * this.modulo;
    }

    if (link.x > this.stageWidth - this.modulo) {
      link.x = 0;
    } else if (link.x < 0) {
      link.x = (this.stageSlots[1].length - 1) * this.modulo;
    }
  }

  findEmptySlot(): [number, number] {
    let empty = false;
    let x: number;
    let y: number;

    while (!empty) {
      x =
        (Math.floor(Math.random() * this.stageSlots[1].length) + 0) *
        this.modulo;
      y =
        (Math.floor(Math.random() * this.stageSlots[0].length) + 0) *
        this.modulo;
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
  applePush() {
    let applePosition: number[] = [];
    applePosition = this.findEmptySlot();
    this.apples.push(new AppleModel(applePosition[0], applePosition[1], "red"));
  }
  checkColition() {
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
        let lastIndex = this.snakeMovQueue.length - 1;
        this.snakeMovQueue.push(this.snakeMovQueue[lastIndex]);
        this.snakeLinks.push(new SnakeModel(newLink.x, newLink.y));
        this.apples[i].color = "yellow";
        this.apples.splice(i, 1);
        this.applePush();
        break;
      }
    }
    return colition;
  }
  selfEat(): boolean {
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
        link.color = "yellow";
      }
      clearInterval(this.interval);

      alert("GAME OVER!");
    }
    return dead;
  }
}
