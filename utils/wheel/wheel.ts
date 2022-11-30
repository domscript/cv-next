import DataSVG from "../pathsSVG";
import { init } from "./initWheel";
import { Sector } from "./sector";
let sectors: Sector[] = [];

export function wheel(
  this: DataSVG[],
  context: CanvasRenderingContext2D,
  frameCount: number,
  ratio: number
) {
  const data = [...this];
  frameCount = (2 * Math.PI * frameCount) / 50;
  if (data.length <= 0) return;

  if (sectors.length <= 0) sectors = Object.assign(init(context, data, ratio));

  for (let i = 0; i < sectors.length; i++) {
    sectors[i].draw(context, ratio);
    sectors[i].rotateTo(sectors[i]);
  }
}
