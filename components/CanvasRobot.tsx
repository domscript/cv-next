import React from "react";
import useCanvas from "hooks/use-canvas";

export interface CanvasRobotProps {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  draw: ((context: CanvasRenderingContext2D, frameCount: number) => void)[];
}

const CanvasRobot = (props: CanvasRobotProps): JSX.Element => {
  const { draw, width, height, ...rest } = props;
  const canvasRef = useCanvas(draw, width, height);
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
