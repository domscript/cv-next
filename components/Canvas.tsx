import React, { useRef, useEffect, useState } from "react";
import DataSVG from "../utils/pathsSVG";
import sort from "../utils/sort";
import room from "../utils/room";
import wheel from "../utils/wheel";
import { buttonMainClass } from "../utils/buttonMainClass.js";

export interface CanvasProps {
  children: React.ReactNode;
  className: string;
  width: number;
  height: number;
  data: DataSVG[];
  onChangeData: (data: string) => void;
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
  }, [props.data]);

  function header(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    data: CanvasProps["data"] = []
  ) {
    const myButtons = canvas.getElementsByClassName("myButtons")[0];
    const margin = 30;

    let amount = data.length;
    const buttonHeight = canvas.height * 0.4;
    let array = [];
    let buttons: buttonMainClass[] = [];

    const spacing = (canvas.width - margin * 2) / amount;
    const gap = 2;

    for (let i = 0; i < amount; i++) {
      array[i] = buttonHeight;
      const el = myButtons.children[i];
      const x = i * spacing + spacing / 2 + margin;
      const y = canvas.height * 0.8 - margin;
      const width = spacing - gap;
      const height = buttonHeight;
      buttons[i] = new buttonMainClass(x, y, width, height, data[i], el);
      buttons[i].draw(context);
    }
    canvas.addEventListener("pointerdown", (e: PointerEvent) => {
      handleClick(e);
    });

    function handleClick(e: PointerEvent) {
      // Calculate click coordinates
      const { height, width, top } = canvas.getBoundingClientRect();
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - top;

      // Focus button1, if appropriate
      for (let j = 0; j < amount; j++) {
        buttons[j].draw(context);
        if (context.isPointInPath(x, y)) {
          const sort = buttons[j].el.dataset.sort;
          props.onChangeData(sort);
          buttons[j].el.className = "btn active";
        }
      }
    }

    // animate();

    // function animate() {
    //   context.clearRect(0, 0, canvas.width, canvas.height);
    //   for (let j = 0; j < amount; j++) {
    //     buttons[j].draw(context);
    //   }
    // for (let i = 0; i < buttons.length; i++) {
    //   changed = buttons[i].draw(context);
    // }
    //   requestAnimationFrame(animate);
    // }
  }

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

export default Canvas;
