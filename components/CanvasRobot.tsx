import React, { useCallback } from "react";
import useCanvas from "hooks/use-canvas";

export interface CanvasRobotProps {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  draw: (
    context: CanvasRenderingContext2D,
    frameCount: number,
    scale: number,
    x01: number,
    y01: number
  ) => void;
}

const CanvasRobot = (props: CanvasRobotProps): JSX.Element => {
  const { draw, ...rest } = props;

  const canvasRef = useCanvas(draw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default CanvasRobot;
