import { MoveOpt } from "./move-options.enum";
import { extend } from "webdriver-js-extender";

export class ElementModel {
  constructor(x: number, y: number, color?: string) {
    this.x = x;
    this.y = y;

    if (color) {
      this.color = color;
    } else {
      this.color = "green";
    }
  }
  color: string;
  x: number;
  y: number;
}

export class SnakeModel {
  constructor(
    x: number,
    y: number,
    moveNext: MoveOpt | string,
    color?: string
  ) {
    console.warn("new snake link", x, y, moveNext);
    this.moveNext = moveNext;
    this.x = x;
    this.y = y;
  }
  private _moveNext: MoveOpt | string;
  private _moveLast: MoveOpt | string;
  private _x: number;
  private _y: number;
  private _prevX: number;
  private _prevY: number;

  set moveNext(value: MoveOpt | string) {
    if (
      value != MoveOpt.ArrowDown &&
      value != MoveOpt.ArrowUp &&
      value != MoveOpt.ArrowLeft &&
      value != MoveOpt.ArrowRight
    ) {
      console.log("Movimiento no valido", value);
    }
    this._moveLast = this._moveNext;
    this._moveNext = value;
  }
  get moveNext(): MoveOpt | string {
    return this._moveNext;
  }
  get moveLast(): MoveOpt | string {
    return this._moveLast;
  }

  set x(value: number) {
    this._prevX = this._x;
    this._x = value;
  }
  get x(): number {
    return this._x;
  }
  get lastX(): number {
    return this._x;
  }

  set y(value: number) {
    this._prevY = this._y;
    this._y = value;
  }
  get y(): number {
    return this._y;
  }
  get lastY(): number {
    return this._y;
  }
}
// export class SnakeModel extends ElementModel {
//   constructor(
//     x: number,
//     y: number,
//     moveNext?: MoveOpt | string,
//     color?: string
//   ) {
//     super(x, y, color);
//     this.moveNext = moveNext;
//   }
//   moveNext: MoveOpt | string;
//   moveLast: MoveOpt | string;

//   private _x: number;

//   x() {
//       get:
//       {
//           return this._name;
//       }
//       set:
//       {
//           this._name = ???;
//       }
//   }
// }
