export function robotHeart(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale2: number
) {
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
