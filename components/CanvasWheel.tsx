import React, { useRef, useEffect, useState } from "react";
import DataSVG from "@/utils/pathsSVG";
import { wheel } from "@/utils/wheel";

export interface CanvasPropsWheel {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  data: DataSVG[];
  onChangeData: (data: string) => void;
}

const CanvasWheel = (props: CanvasPropsWheel): JSX.Element => {
  const { data, width, height, ...rest } = props;
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
    const ratio = scale();
    wheel(canvas, context, data, ratio);
  }, [data, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      {...rest}
    />
  );
};

export default CanvasWheel;
