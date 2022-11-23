import React, { useEffect } from "react";
import useCanvas, { positionAndSizeInt } from "hooks/use-canvas";

export interface CanvasRobotProps {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  draw: (
    context: CanvasRenderingContext2D,
    frameCount: number,
    positionAndSize: positionAndSizeInt
  ) => void;
  positionAndSize: positionAndSizeInt;
}

const CanvasRobot = (props: CanvasRobotProps): JSX.Element => {
  const { draw, positionAndSize, width, height, ...rest } = props;

  const canvasRef = useCanvas(draw, positionAndSize, width, height);
  return (
    <canvas
      ref={canvasRef}
      width={`${width}px`}
      height={`${height}px`}
      {...rest}
    />
  );
};

export default CanvasRobot;
