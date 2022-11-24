import { CanvasProps } from "@/components/Canvas";

export class Me {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public cardsSrc: CanvasProps["data"]
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
    const meX = coords.x;
    const meY = coords.y;
    const meWidht = coords.canvasW;

    for (let j = 0; j < this.cardsSrc.length; j++) {
      const sizeXY = this.cardsSrc[j].viewBox.split(" ");
      const [sizeX, sizeY] = [
        Number(sizeXY[2]) - Number(sizeXY[0]),
        Number(sizeXY[3]) - Number(sizeXY[1]),
      ];
      const size = (Math.max(sizeX, sizeY) / coords.canvasH) * 0.3;
      if (this.cardsSrc[j].coords) {
        const meX = this.cardsSrc[j].coords?.x;
        const meY = this.cardsSrc[j].coords?.y;
        const zoom = this.cardsSrc[j].coords?.zoom;
        if (meX && meY && zoom) {
          for (let i = 0; i < this.cardsSrc[j].detail.length; i++) {
            context.beginPath();
            context.moveTo(meX, meY);
            context.fillStyle = this.cardsSrc[j].detail[i].fill;

            const p1 = new Path2D(this.cardsSrc[j].detail[i].path);
            const m = new DOMMatrix();
            const p = new Path2D();
            const t = m
              .scale((1 / size) * zoom)
              .translate((meX * size) / zoom, (meY * size) / zoom);

            p.addPath(p1, t);
            context.stroke(p);
            context.fill(p);
          }
        }
      }
    }
  }
}
