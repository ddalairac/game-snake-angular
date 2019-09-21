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
