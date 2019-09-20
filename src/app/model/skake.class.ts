import { MoveOpt } from "./move-options.enum";
import { extend } from "webdriver-js-extender";

export class AppleModel {
  constructor(x: number, y: number, color?: string) {
    this.x = x;
    this.y = y;

    if (color) {
      this.color = color;
    } else {
      this.color = "red";
    }
  }
  color: string;
  x: number;
  y: number;
}

export class SnakeModel {
  constructor(x: number, y: number, color?: string) {
    console.log("new snake link", x, y);
    this.x = x;
    this.y = y;

    if (color) {
      this.color = color;
    } else {
      this.color = "green";
    }
  }
  private _x: number;
  private _y: number;
  private _prevX: number;
  private _prevY: number;
  color: string;

  set x(value: number) {
    this._prevX = this._x;
    this._x = value;
  }
  get x(): number {
    return this._x;
  }
  get lastX(): number {
    return this._prevX;
  }

  set y(value: number) {
    this._prevY = this._y;
    this._y = value;
  }
  get y(): number {
    return this._y;
  }
  get lastY(): number {
    return this._prevY;
  }
}
