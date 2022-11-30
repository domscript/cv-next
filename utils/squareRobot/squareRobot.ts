import { robotHeart } from "./robotHeart";
import { robotBody } from "./robotBody";

export interface positionAndSizeInt {
  x01: number;
  y01: number;
  scale: number;
}

let newCount = 0;

export function squareRobotNew(
  this: positionAndSizeInt,
  context: CanvasRenderingContext2D,
  frameCount: number,
  ratio: number
) {
  frameCount = frameCount % 200;
  if (frameCount > 100) newCount = 200 - frameCount;
  if (frameCount <= 100) newCount = frameCount;
  frameCount = newCount;

  let { x01, y01, scale } = this as positionAndSizeInt;
  let p = 0,
    sign = frameCount;
  (x01 = x01 * ratio), (y01 = y01 * ratio);
  const x = (context.canvas.width / 2) * scale + x01,
    y = context.canvas.height * scale + y01,
    size = Math.min(
      context.canvas.width * scale,
      context.canvas.height * scale
    );

  // 0 < p < 1;
  p = p + 0.01 * sign;
  const legsArms = (p * (y - y01)) / 8;
  const y0 = (y - y01) / 8;
  const scale10 =
    (size / 15) *
    (1 + 0.3 * Math.sin(Math.PI * p) * Math.cos(Math.PI * p) ** 2);

  robotBody(context, x, y0, legsArms, p, { x01, y01, scale });
  robotHeart(context, (x - x01) * 1.2 + x01, y + y01, scale10);
}
