import { useRef, useEffect } from "react";
export interface positionAndSizeInt {
  x01: number;
  y01: number;
  scale: number;
}

const useCanvas = (
  draw: (
    context: CanvasRenderingContext2D,
    frameCount: number,
    positionAndSize: positionAndSizeInt
  ) => void,
  positionAndSize: positionAndSizeInt,
  width: number,
  height: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    const scale = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    };
    let frameCount = 0;
    let newCount = 0;
    let animationFrameID: number;
    const render = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      frameCount++;
      frameCount = frameCount % 200;
      if (frameCount > 100) newCount = 200 - frameCount;
      if (frameCount <= 100) newCount = frameCount;
      scale();
      draw(context, newCount, positionAndSize);
      animationFrameID = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameID);
  }, [draw, positionAndSize, height, width]);
  return canvasRef;
};

export default useCanvas;
