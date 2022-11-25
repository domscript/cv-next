import React from "react";
import useCanvasData from "hooks/use-canvas-data";

export interface CanvasWheelProps {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  draw: ((
    context: CanvasRenderingContext2D,
    frameCount: number,
    ratio: number
  ) => void)[];
}

const CanvasWheel = (props: CanvasWheelProps): JSX.Element => {
  const { draw, width, height, ...rest } = props;
  const canvasRef = useCanvasData(draw, width, height);
  return (
    <canvas
      ref={canvasRef}
      width={`${width}px`}
      height={`${height}px`}
      {...rest}
    />
  );
};

export default CanvasWheel;
