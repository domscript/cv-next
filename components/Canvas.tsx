import React, { useRef, useEffect } from "react";
import sort from "../utils/sort";

interface CanvasProps {
  children: React.ReactNode;
  name?: string;
  width: number;
  height: number;
}

const Canvas = (props: CanvasProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    sort(canvas, context);
  }, []);
  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;