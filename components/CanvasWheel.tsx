import React, { useRef, useEffect, useState } from "react";
import DataSVG from "../utils/pathsSVG";
import wheel from "../utils/wheel";

export interface CanvasPropsWheel {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  data: DataSVG[];
  onChangeData: (data: string) => void;
}

const CanvasWheel = (props: CanvasPropsWheel): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    wheel(canvas, context, props.data);
  }, [props.data]);

  return (
    <canvas
      ref={canvasRef}
      className={props.className}
      width={props.width}
      height={props.height}
    >
      {props.children}
    </canvas>
  );
};

export default CanvasWheel;
