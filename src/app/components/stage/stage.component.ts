import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SnakeModel, ElementModel } from "src/app/model/skake.class";
import { MoveOpt } from "src/app/model/move-options.enum";

@Component({
  selector: "app-stage",
  templateUrl: "./stage.component.html",
  styleUrls: ["./stage.component.scss"]
})
export class StageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.stageSlots = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
    this.modulo = 30;
    this.stageHeight = this.stageSlots[0].length * this.modulo;
    this.stageWidth = this.stageSlots[1].length * this.modulo;
    this.snakeLinks = [];
    this.snakeHeadMov = MoveOpt.ArrowRight;
    this.snakeMovQueue.push(MoveOpt.ArrowRight);
    this.apples = [];
    this.appleApearIteration = 10;
    this.snakeLinks.push(new SnakeModel(0, 0, MoveOpt.ArrowRight));
    this.loop();
    this.applePush();
  }
  stageSlots: Array<number[]>;
  modulo: number;
  stageHeight: number;
  stageWidth: number;
  snakeLinks: SnakeModel[];
  snakeHeadMov: string | MoveOpt;
  apples: ElementModel[];
  appleApearIteration: number;

  snakeMovQueue: Array<string | MoveOpt>;
  // snakeSize:number;

  i: number = 0; // TODO, eliminar cuando crezca dinamicamente
  loop() {
    let nextApplepush = this.appleApearIteration;
    setInterval(() => {
      this.snakeMove();
      this.checkColition();
      this.i++;
    }, 200);
  }
  onKeydown(KeyboardEvent: KeyboardEvent): void {
    if (
      KeyboardEvent.key == MoveOpt.ArrowDown ||
      KeyboardEvent.key == MoveOpt.ArrowUp ||
      KeyboardEvent.key == MoveOpt.ArrowLeft ||
      KeyboardEvent.key == MoveOpt.ArrowRight
    ) {
      this.snakeHeadMov = KeyboardEvent.key;
    }
    console.log("onKeydown", this.snakeHeadMov);
  }
  snakeMove() {
    for (let i = 0; i < this.snakeLinks.length; i++) {
      if (i == 0) {
        // this.snakeLinks[0].moveLast = this.snakeLinks[0].moveNext;
        this.snakeLinks[0].moveNext = this.snakeHeadMov;
      } else {
        // this.snakeLinks[i].moveLast = this.snakeLinks[i].moveNext;
        this.snakeLinks[i].moveNext = this.snakeLinks[i - 1].moveLast;
      }
      // console.log("link " + i + ": ", this.snakeLinks[i]);
      this.snakeLinkDirection(this.snakeLinks[i]);
      // console.log("snakeMove()", this.snakeLinks[i]);
    }
  }
  snakeLinkDirection(link: SnakeModel): void {
    // console.log("snakeLinkDirection", link);
    // console.log("moveNext", link.moveNext);
    switch (link.moveNext) {
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
    // console.log("snakeLinkMove", x, y, link);
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
    // return [30, 30];
  }
  applePush() {
    let applePosition: number[] = [];
    // if (this.i == nextApplepush && this.apples.length < 2) {
    // nextApplepush += this.appleApearIteration;
    applePosition = this.findEmptySlot();
    this.apples.push(
      new ElementModel(applePosition[0], applePosition[1], "red")
    );
    // }
    // return nextApplepush;
  }
  checkColition() {
    let colition = false;
    let newLink = {
      x: this.snakeLinks[this.snakeLinks.length - 1].x,
      y: this.snakeLinks[this.snakeLinks.length - 1].x,
      moveNext: this.snakeLinks[this.snakeLinks.length - 1].moveNext
    };
    for (let i = 0; i < this.apples.length; i++) {
      if (
        this.snakeLinks[0].x == this.apples[i].x &&
        this.snakeLinks[0].y == this.apples[i].y
      ) {
        console.log("colition!");
        colition = true;
        this.snakeLinks.push(
          new SnakeModel(newLink.x, newLink.y, newLink.moveNext)
        );
        this.apples.splice(i, 1);
        this.applePush();
        break;
      }
    }
    return colition;
  }
}
