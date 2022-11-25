import { useRef, useEffect } from "react";
export interface positionAndSizeInt {
  x01: number;
  y01: number;
  scale: number;
}

const useCanvas = (
  draw: ((context: CanvasRenderingContext2D, frameCount: number) => void)[],
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
      for (let i = 0; i < draw.length; i++) {
        draw[i](context, newCount);
      }
      animationFrameID = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameID);
  }, [draw, height, width]);
  return canvasRef;
};

export default useCanvas;
