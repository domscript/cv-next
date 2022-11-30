import { Sector } from "./sector";
import DataSVG from "../pathsSVG";
import { transformData } from "./transformData";
import { startConditionInt, anglesInt } from "./wheelInterfaces";
import { defineAngles } from "./defineAngles";
import { margin, angleStart, inner, outer, colors } from "./config";

const sectors: Sector[] = [];

export function init(
  context: CanvasRenderingContext2D,
  data: DataSVG[],
  ratio: number
): Sector[] {
  const cardsSrc = transformData(data);
  const startCondition: startConditionInt = {
    x: context.canvas.width / 2,
    y: context.canvas.height / 2,
    radius: Math.min(context.canvas.width / 2, context.canvas.height / 2),
    margin: margin,
    angleStart: angleStart,
    inner: inner,
    outer: outer,
  };

  const anglesArr = defineAngles(cardsSrc, startCondition);

  for (let i = 0; i < anglesArr.length - 1; i++) {
    const angles: anglesInt = {
      angleS: anglesArr[i],
      angleE: anglesArr[i + 1 < anglesArr.length ? i + 1 : 0],
    };
    sectors[i] = new Sector(startCondition, angles, cardsSrc[i], colors[i]);
    sectors[i].draw(context, ratio);
  }
  return sectors;
}
