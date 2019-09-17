import { MoveOpt } from "./move-options.enum";

export class SnakeModel {
  constructor(x: number, y: number, moveNext: MoveOpt, color?: string) {
    this.x = x;
    this.y = y;
    this.moveNext = moveNext;
    if (color) {
      this.color = color;
    } else {
      this.color = "green";
    }
  }
  color: string;
  x: number;
  y: number;
  // set moveNext(direction: MoveOpt) {
  //   // console.warn("direction", direction);
  //   if (this.moveNext) {
  //     this.moveLast = this.moveNext;
  //   }
  //   this.moveNext = direction;
  // }
  // get moveNext(): MoveOpt {
  //   return this.moveNext;
  // }
  moveNext: MoveOpt | string;
  moveLast: MoveOpt | string;
}
