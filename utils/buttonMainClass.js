import { lerp } from "./math.js";

export class buttonMainClass {
  constructor(x, y, width, height, data, el) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.data = data;
    this.el = el;
    // this.queue = [];
  }

  // moveTo(loc, yOffset = 1, frameCount = 20) {
  //   // frameCount always should be Int round Up
  //   // it makes this func independent from outside
  //   frameCount = Math.ceil(frameCount);
  //   for (let i = 1; i <= frameCount; i++) {
  //     const t = i / frameCount;
  //     const u = Math.sin(t * Math.PI);
  //     this.queue.push({
  //       x: lerp(this.x, loc.x, t),
  //       y: lerp(this.y, loc.y, t) + ((u * this.width) / 3) * yOffset,
  //     });
  //   }
  // }

  draw(context) {
    const data = this.data;

    let changed = false;
    // if (this.queue.length > 0) {
    //   const { x, y } = this.queue.shift();
    //   this.x = x;
    //   this.y = y;
    //   changed = true;
    // }
    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    const center = this.x;
    const el = this.el;
    const [width, height] = [this.width, this.height];

    context.beginPath();
    context.fillStyle = data.detail[0].fill;
    context.moveTo(left, top + height / 6);
    context.lineTo(left, this.y);
    context.lineTo(center, this.y + height / 6);
    context.lineTo(right, this.y);
    context.lineTo(right, top + height / 6);
    context.lineTo(center, top);
    context.lineTo(left, top + height / 6);
    context.fill();
    context.stroke();

    // Define clickable area
    context.beginPath();
    context.rect(left, top, width, height);

    // Draw focus ring, if appropriate
    context.drawFocusIfNeeded(el);

    const sizeXY = data.viewBox?.split(" ");
    const [sizeX, sizeY] = [sizeXY[2] - sizeXY[0], sizeXY[3] - sizeXY[1]];
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
