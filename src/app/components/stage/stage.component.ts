import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SnakeModel } from "src/app/model/skake.class";
import { MoveOpt } from "src/app/model/move-options.enum";

@Component({
  selector: "app-stage",
  templateUrl: "./stage.component.html",
  styleUrls: ["./stage.component.scss"]
})
export class StageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.snakeLinks.push(new SnakeModel(0, 0, MoveOpt.ArrowRight));
    // this.snakeHeadMov = MoveOpt.ArrowRight;
    this.loop();
    // this.movesqQueue.push(MoveOpt.ArrowRight);
  }
  stageSlots = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
  modulo: number = 30;
  stageHeight: number = this.stageSlots[0].length * this.modulo;
  stageWidth: number = this.stageSlots[1].length * this.modulo;
  snakeLinks: SnakeModel[] = [];
  snakeHeadMov: string | MoveOpt;
  // movesqQueue: string[] | MoveOpt[] = [];

  i: number = 0;
  loop() {
    setInterval(() => {
      // console.log("mov", this.snakeHeadMov);
      // console.log("mov head", this.snakeLinks[0]);
      // this.snakeLinkDirection(this.snakeLinks[0]);
      this.snakeMove();
      if (this.i < 2) {
        this.snakeLinks.push(new SnakeModel(0, 0, MoveOpt.ArrowRight));
      }
      this.i++;
    }, 1000);
  }
  onKeydown(KeyboardEvent: KeyboardEvent): void {
    // console.log("onKeydown: ", KeyboardEvent.key);
    if (
      KeyboardEvent.key == MoveOpt.ArrowDown ||
      KeyboardEvent.key == MoveOpt.ArrowUp ||
      KeyboardEvent.key == MoveOpt.ArrowLeft ||
      KeyboardEvent.key == MoveOpt.ArrowRight
    ) {
      this.snakeHeadMov = KeyboardEvent.key;
    }
  }
  snakeLinkDirection(link: SnakeModel): void {
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

    // console.log("link: ", link);
  }

  snakeMove() {
    for (let i = 0; i < this.snakeLinks.length; i++) {
      if (i == 0) {
        this.snakeLinks[0].moveLast = this.snakeLinks[0].moveNext;
        this.snakeLinks[0].moveNext = this.snakeHeadMov;
      } else {
        this.snakeLinks[i].moveLast = this.snakeLinks[i].moveNext;
        this.snakeLinks[i].moveNext = this.snakeLinks[i - 1].moveLast;
      }
      console.log("link " + i + ": ", this.snakeLinks[i]);
      this.snakeLinkDirection(this.snakeLinks[i]);
    }
  }
}
