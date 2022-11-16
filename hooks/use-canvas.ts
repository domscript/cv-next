import { useRef, useEffect } from "react";

const useCanvas = (
  draw: (
    context: CanvasRenderingContext2D,
    frameCount: number,
    scale: number,
    x01: number,
    y01: number
  ) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    let frameCount = 0;
    let newCount = 0;
    const scale = 1;
    const x01 = 0;
    const y01 = 0;
    let animationFrameID: number;
    const render = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      frameCount++;
      frameCount = frameCount % 200;
      if (frameCount > 100) newCount = 200 - frameCount;
      if (frameCount <= 100) newCount = frameCount;
      draw(context, newCount, scale, x01, y01);
      animationFrameID = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameID);
  }, [draw]);
  return canvasRef;
};

export default useCanvas;
