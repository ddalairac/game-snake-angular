import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SnakeModel } from "src/app/model/skake.model";

@Component({
  selector: "app-stage",
  templateUrl: "./stage.component.html",
  styleUrls: ["./stage.component.scss"]
})
export class StageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.loop();
    this.snakeLinks.push(new SnakeModel());
  }
  stageSlots = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]];
  y: number = 0;
  x: number = 0;
  modulo: number = 30;
  stageHeight: number = this.stageSlots[0].length * this.modulo;
  stageWidth: number = this.stageSlots[1].length * this.modulo;
  snakeLinks: SnakeModel[] = [];

  loop() {
    setInterval(() => {
      // console.log("loop");
    }, 1000);
  }

  onKeydown(KeyboardEvent: KeyboardEvent): void {
    // console.log(KeyboardEvent.key);
    switch (KeyboardEvent.key) {
      case "ArrowDown":
        this.move(this.modulo, 0);
        break;
      case "ArrowUp":
        this.move(-this.modulo, 0);
        break;
      case "ArrowRight":
        this.move(0, this.modulo);
        break;
      case "ArrowLeft":
        this.move(0, -this.modulo);
        break;
    }
  }

  move(y: number, x: number): void {
    this.y += y;
    this.x += x;
    if (this.y > this.stageHeight - this.modulo) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = (this.stageSlots[1].length - 1) * this.modulo;
    }

    if (this.x > this.stageWidth - this.modulo) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = (this.stageSlots[1].length - 1) * this.modulo;
    }

    // console.log("y" + this.y);
    // console.log("x" + this.x);
  }
}
