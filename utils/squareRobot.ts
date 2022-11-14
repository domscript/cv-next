export default function squareRobot(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  scale: number,
  x01: number,
  y01: number
) {
  function robotBody(x: number, y: number, y0: number, p: number) {
    // x, y - coord, size - size
    const height = canvas.height * scale;
    const widht = canvas.width * scale;
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
      heightBody + heightHead + heightNeck + heightEars - p + y01
    );
    context.rect(
      x + widhtBody / 5,
      heightBody + heightHead + heightNeck + heightEars - p + y01,
      widhtBody / 5,
      heightBody / 5
    );
    // leg from left
    context.moveTo(
      x + widhtBody / 2.5,
      heightHead + heightNeck + heightEars + p - y0 + y01
    );
    context.rect(
      x - widhtBody / 2.5,
      heightBody + heightHead + heightNeck + heightEars + p - y0 + y01,
      widhtBody / 5,
      heightBody / 5
    );
    // arm from right
    context.moveTo(x + widhtBody / 2, heightHead + heightNeck - p + y01);
    context.rect(
      x + widhtBody / 2,
      heightHead + heightNeck + heightEars - p + y01,
      widhtBody / 5,
      heightBody / 5
    );
    // arm from left
    context.moveTo(x + widhtBody / 2, heightHead + heightNeck + p + y01);
    context.rect(
      x - widhtBody / 2,
      heightHead + heightNeck + heightEars - p + y01,
      -widhtBody / 5,
      heightBody / 5
    );
    // ear from left
    context.moveTo(x - widhtHead / 4 + p / 2, y01);
    context.rect(
      x - widhtHead / 4 + p / 2,
      y01,
      widhtBody / 10,
      heightBody / 5
    );
    // ear from right
    context.moveTo(x + widhtHead / 4 + p / 2, y01);
    context.rect(
      x + widhtHead / 4 + p / 2,
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
      heightHead / 7 + heightEars + y0 / 4 - p / 4 + y01,
      widhtHead / 5,
      heightHead / 7 + p / 4 - y0 / 4
    );
    context.moveTo(x + widhtHead / 3, heightHead / 3 + y01);
    context.rect(
      x + widhtHead / 3,
      heightHead / 7 + heightEars + y0 / 4 - p / 4 + y01,
      -widhtHead / 5,
      heightHead / 7 + p / 4 - y0 / 4
    );
    context.fill();
    //mouth
    context.beginPath();
    context.strokeStyle = "black";
    context.fillStyle = "white";
    context.rect(
      x - ((widhtHead / 5) * p) / 12,
      heightHead / 1.5 + heightEars + y01,
      ((widhtHead / 5) * p) / 12,
      heightHead / 8
    );
    context.moveTo(x + ((widhtHead / 5) * p) / 12, heightHead / 1.5 + y01);
    context.rect(
      x + ((widhtHead / 5) * p) / 12,
      heightHead / 1.5 + heightEars + y01,
      ((-widhtHead / 5) * p) / 12,
      heightHead / 8
    );
    context.stroke();
    context.fill();
  }
  function heart(x: number, y: number, scale2: number) {
    const xHeart = x + scale2 * 1.4,
      yHeart = y / 2 + scale2;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.fillStyle = "#166534";
    context.arc(xHeart, yHeart, scale2, Math.PI, 2.2 * Math.PI);
    context.lineTo(xHeart - scale2 * 0.95, yHeart + scale2 * 2.2);
    context.arc(
      xHeart - scale2 * 1.95,
      yHeart,
      scale2,
      Math.PI * 0.8,
      2 * Math.PI
    );
    context.fill();
    context.stroke();
  }
  let p = 0,
    sign = 1;
  const x = (canvas.width / 2) * scale + x01,
    y = canvas.height * scale + y01,
    size = Math.min(canvas.width * scale, canvas.height * scale);

  function animate() {
    // 0 < p < 1;
    p = p + 0.01 * sign;
    if (p > 1 || p < 0) sign = sign * -1;
    const legsArms = (p * (y - y01)) / 8;
    const y0 = (y - y01) / 8;
    const scale10 =
      (size / 10) *
      (1 + 0.3 * Math.sin(Math.PI * p) * Math.cos(Math.PI * p) ** 2);
    context.clearRect(0, 0, canvas.width, canvas.height);
    robotBody(x, y, y0, legsArms);
    heart(x + 8, y + y01, scale10 / 1.5);
    requestAnimationFrame(animate);
  }

  animate();
}
