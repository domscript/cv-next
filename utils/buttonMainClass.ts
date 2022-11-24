import DataSVG from "./pathsSVG";
export class ButtonMainClass {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public data: DataSVG,
    public el: HTMLElement
  ) {}

  draw(context: CanvasRenderingContext2D) {
    const data = this.data;
    let changed = false;

    const left = this.x - this.width / 2;
    const top = this.y - this.height;
    const right = this.x + this.width / 2;
    const center = this.x;
    const el = this.el;
    const [width, height] = [this.width, this.height];

    context.beginPath();
    context.fillStyle = data.detail[0].fill;
    context.moveTo(left, top);
    context.lineTo(left, this.y);
    context.lineTo(right, this.y);
    context.lineTo(right, top);
    context.lineTo(left, top);
    context.fill();
    context.stroke();

    // Define clickable area
    context.beginPath();
    context.rect(left, top, width, height);

    // Draw focus ring, if appropriate
    context.drawFocusIfNeeded(el);

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
      context.fill(p);
    }
    return changed;
  }
}
