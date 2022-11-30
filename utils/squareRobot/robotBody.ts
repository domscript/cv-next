import { positionAndSizeInt } from "./squareRobot";

export function robotBody(
  context: CanvasRenderingContext2D,
  x: number,
  y0: number,
  legsArms: number,
  p: number,
  positionAndSize: positionAndSizeInt
) {
  // x, y - coord, size - size
  const { y01, scale } = positionAndSize;
  const height = context.canvas.height * scale;
  const widht = context.canvas.width * scale;
  const heightBody = height / 2.2;
  const widhtBody = widht / 1.5;
  const heightEars = height / 10;
  const heightHead = height / 3.5;
  const heightNeck = (height - heightBody - heightHead - heightEars) / 4;
  const widhtHead = widht - heightBody;

  // background
  // context.beginPath();
  // context.lineWidth = 1;
  // context.strokeStyle = "green";
  // context.fillStyle = "green";
  // context.rect(0, 0, widht, height);
  // context.fill();
  // body
  context.beginPath();
  context.strokeStyle = "black";
  context.fillStyle = "#991b1b";
  context.rect(
    x - widhtBody / 2,
    heightHead + heightNeck + heightEars + y01,
    widhtBody,
    heightBody
  );
  // head
  context.moveTo(x - widhtHead / 2, heightEars + y01);
  context.rect(x - widhtHead / 2, heightEars + y01, widhtHead, heightHead);
  // leg from right
  context.moveTo(
    x - widhtBody / 5,
    heightBody + heightHead + heightNeck + heightEars - legsArms + y01
  );
  context.rect(
    x + widhtBody / 5,
    heightBody + heightHead + heightNeck + heightEars - legsArms + y01,
    widhtBody / 5,
    heightBody / 5
  );
  // leg from left
  context.moveTo(
    x + widhtBody / 2.5,
    heightHead + heightNeck + heightEars + legsArms - y0 + y01
  );
  context.rect(
    x - widhtBody / 2.5,
    heightBody + heightHead + heightNeck + heightEars + legsArms - y0 + y01,
    widhtBody / 5,
    heightBody / 5
  );
  // arm from right
  context.moveTo(x + widhtBody / 2, heightHead + heightNeck - legsArms + y01);
  context.rect(
    x + widhtBody / 2,
    heightHead + heightNeck + heightEars - legsArms + y01,
    widhtBody / 5,
    heightBody / 5
  );
  // arm from left
  context.moveTo(x + widhtBody / 2, heightHead + heightNeck + legsArms + y01);
  context.rect(
    x - widhtBody / 2,
    heightHead + heightNeck + heightEars - legsArms + y01,
    -widhtBody / 5,
    heightBody / 5
  );
  // ear from left
  context.moveTo(x - widhtHead / 4 + legsArms / 2, y01);
  context.rect(
    x - widhtHead / 4 + legsArms / 2,
    y01,
    widhtBody / 10,
    heightBody / 5
  );
  // ear from right
  context.moveTo(x + widhtHead / 4 + legsArms / 2, y01);
  context.rect(
    x + widhtHead / 4 + legsArms / 2,
    y01,
    widhtBody / 10,
    heightBody / 5
  );
  context.fill();
  context.stroke();
  // eyes
  context.beginPath();
  context.strokeStyle = "black";
  context.fillStyle = "black";
  context.rect(
    x - widhtHead / 3,
    heightHead / 7 + heightEars + y0 / 4 - legsArms / 4 + y01,
    widhtHead / 5,
    heightHead / 7 + legsArms / 4 - y0 / 4
  );
  context.moveTo(x + widhtHead / 3, heightHead / 3 + y01);
  context.rect(
    x + widhtHead / 3,
    heightHead / 7 + heightEars + y0 / 4 - legsArms / 4 + y01,
    -widhtHead / 5,
    heightHead / 7 + legsArms / 4 - y0 / 4
  );
  context.fill();
  //mouth
  context.beginPath();
  context.strokeStyle = "black";
  context.fillStyle = "white";
  context.rect(
    x - (widhtHead / 5) * p,
    heightHead / 1.5 + heightEars + y01,
    (widhtHead / 5) * p,
    heightHead / 8
  );
  context.moveTo(x + ((widhtHead / 5) * p) / 12, heightHead / 1.5 + y01);
  context.rect(
    x + (widhtHead / 5) * p,
    heightHead / 1.5 + heightEars + y01,
    (-widhtHead / 5) * p,
    heightHead / 8
  );
  context.stroke();
  context.fill();
}
