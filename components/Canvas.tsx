import React, { useRef, useEffect } from "react";
import DataSVG from "../utils/pathsSVG";
import sort from "../utils/sort";
import room from "../utils/room";
import wheel from "../utils/wheel";
import header from "../utils/header";

export interface CanvasProps {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  data: DataSVG[] | [];
}

const Canvas = (props: CanvasProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext("2d");
    if (context === null) return;
    switch (props.className) {
      case "sort":
        sort(canvas, context, props.data);
        break;
      case "room":
        room(canvas, context, props.data);
        break;
      case "wheel":
        wheel(canvas, context, props.data);
        break;
      case "header":
        header(canvas, context, props.data);
        break;
      default:
        break;
    }
  }, []);
  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
