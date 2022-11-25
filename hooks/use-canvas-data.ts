import { useRef, useEffect } from "react";
import { setInterval } from "timers/promises";

const useCanvasData = (
  draw: ((
    context: CanvasRenderingContext2D,
    frameCount: number,
    ratio: number
  ) => void)[],
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
      return ratio;
    };
    let frameCount = 0;
    let newCount = 0;
    let animationFrameID: number;

    const render = () => {
      // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      frameCount++;
      newCount = Math.floor(frameCount / 100) % 50;
      const ratio = scale();
      for (let i = 0; i < draw.length; i++) {
        draw[i](context, newCount, ratio);
      }

      animationFrameID = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameID);
  }, [draw, height, width]);
  return canvasRef;
};

export default useCanvasData;
