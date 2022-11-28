import DataSVG from "./pathsSVG";

export class Room {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public cardsSrc: DataSVG[]
  ) {}

  draw(
    context: CanvasRenderingContext2D,
    coords: {
      x: number;
      y: number;
      canvasW: number;
      canvasH: number;
    }
  ) {
    for (let j = 0; j < this.cardsSrc.length; j++) {
      const sizeXY = this.cardsSrc[j].viewBox.split(" ");
      const [sizeX, sizeY] = [
        Number(sizeXY[2]) - Number(sizeXY[0]),
        Number(sizeXY[3]) - Number(sizeXY[1]),
      ];
      const sizeH = coords.canvasH;
      const sizeW = coords.canvasW;
      if (this.cardsSrc[j].coords) {
        for (let i = 0; i < this.cardsSrc[j].detail.length; i++) {
          context.beginPath();
          context.moveTo(0, 0);
          context.fillStyle = this.cardsSrc[j].detail[i].fill;

          const p1 = new Path2D(this.cardsSrc[j].detail[i].path);
          const m = new DOMMatrix();
          const p = new Path2D();
          const t = m.scale(sizeW / sizeX, sizeH / sizeY);

          p.addPath(p1, t);
          context.stroke(p);
          context.fill(p);
        }
      }
    }
  }
}
