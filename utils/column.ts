import { lerp } from "./math";
import DataSVG from "./pathsSVG";
interface Queue {
  x: number;
  y: number;
}

export class Column {
  x: number;
  y: number;
  width: number;
  height: number;
  data: DataSVG;
  queue: Queue[];
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    data: DataSVG
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.data = data;
    this.queue = [];
  }

  moveTo(loc: Column, yOffset = 1, frameCount = 20) {
    // frameCount always should be Int round Up
    // it makes this func independent from outside
    frameCount = Math.ceil(frameCount);
    for (let i = 1; i <= frameCount; i++) {
      const t = i / frameCount;
      const u = Math.sin(t * Math.PI);
      this.queue.push({
        x: lerp(this.x, loc.x, t),
        y: lerp(this.y, loc.y, t) + ((u * this.width) / 3) * yOffset,
      });
    }
  }

  draw(context: CanvasRenderingContext2D) {
    const data = this.data;

    let changed = false;
    if (this.queue.length > 0) {
      const { x, y } = this.queue.shift() as Queue;
      this.x = x;
      this.y = y;
      changed = true;
    }
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    const [width, height] = [this.width, this.height];

    context.beginPath();
    context.fillStyle = data.detail[0].fill;
    context.moveTo(left, top);
    context.lineTo(left, this.y);
    context.ellipse(
      this.x,
      this.y,
      this.width / 2,
      this.width / 4,
      0,
      Math.PI,
      Math.PI * 2,
      true
    );
    context.lineTo(right, top);
    context.ellipse(
      this.x,
      top,
      this.width / 2,
      this.width / 4,
      0,
      0,
      Math.PI * 2,
      true
    );
    context.fill();
    context.stroke();

    const sizeXY = data.viewBox?.split(" ");
    const [sizeX, sizeY] = [
      Number(sizeXY[2]) - Number(sizeXY[0]),
      Number(sizeXY[3]) - Number(sizeXY[1]),
    ];
    const size = sizeX / width;

    const zoom = 0.99;
    for (let i = 0; i < data.detail.length; i++) {
      context.fillStyle = data.detail[i].fill;

      const p1 = new Path2D(data.detail[i].path);
      const m = new DOMMatrix();
      const p = new Path2D();
      const t = m
        .scale((1 / size) * zoom)
        .translate(
          (left * size) / zoom,
          ((top + height / 2 - width / 2) * size) / zoom
        );

      p.addPath(p1, t);
      // context.stroke(p);
      context.fill(p);
    }
    return changed;
  }
}
