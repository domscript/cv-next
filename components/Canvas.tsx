import React, { useRef, useEffect, useState } from "react";
import DataSVG from "../utils/pathsSVG";
import sort from "../utils/sort";
import room from "../utils/room";
import { buttonMainClass } from "../utils/buttonMainClass";
import { Me } from "../utils/me";

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
    const margin = 360;

    const buttonData = data.filter(
      (el) =>
        el.group === "lang" || el.group === "tool" || el.group === "button"
    );
    const roomData = data.filter(
      (el) => el.group === "room" || el.group === "me"
    );
    let amount = buttonData.length;
    const buttonHeight = canvas.height * 0.17;
    let array = [];
    let buttons: buttonMainClass[] = [];

    const spacing = buttonHeight;
    const gap = 5;

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
          const sort = buttons[j].el.dataset.sort as string;
          props.onChangeData(sort);
          buttons[j].el.className = "btn active";
        }
      }
    }

    context.beginPath();
    const img = new Image();
    img.src = "image/room2.svg";
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      roomData[0].coords = {
        x: 150,
        y: 255,
        zoom: 1,
      };
      roomData[1].coords = {
        x: 40,
        y: 370,
        zoom: 0.5,
      };
      roomData[2].coords = {
        x: 160,
        y: 290,
        zoom: 1,
      };

      const coords: {
        x: number;
        y: number;
        canvasW: number;
        canvasH: number;
      } = {
        x: 50,
        y: 50,
        canvasW: canvas.width / 8,
        canvasH: canvas.height / 8,
      };

      const homeObjects = [];

      for (let i = 0; i < 1; i++) {
        const [x, y] = [0, 0];
        homeObjects[i] = new Me(x, y, 100, 100, roomData);
        homeObjects[i].draw(context, coords);
      }
      for (let i = 0; i < amount; i++) {
        array[i] = buttonHeight;
        const el = myButtons.children[i] as HTMLElement;
        const x = spacing / 2 + margin;
        const y = canvas.height * 0.32 + i * (buttonHeight + gap);
        const width = spacing - gap;
        const height = buttonHeight;
        buttons[i] = new buttonMainClass(
          x,
          y,
          width,
          height,
          buttonData[i],
          el
        );
        buttons[i].draw(context);
      }
    };

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
