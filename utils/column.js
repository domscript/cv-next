import { lerp } from "./math.js";

export class Column {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.queue = [];
  }

  moveTo(loc, yOffset = 1, frameCount = 20) {
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

  draw(context) {
    let changed = false;
    if (this.queue.length > 0) {
      const { x, y } = this.queue.shift();
      this.x = x;
      this.y = y;
      changed = true;
    }
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;

    context.beginPath();
    context.fillStyle = "#333";
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
    return changed;
  }
}
