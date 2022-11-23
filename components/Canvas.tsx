import React, { useRef, useEffect, useState } from "react";
import DataSVG from "../utils/pathsSVG";
import sort from "../utils/sort";
import { Room } from "../utils/room";
import { ButtonMainClass } from "../utils/buttonMainClass";
import { Button } from "../utils/button";
import { Me } from "../utils/me";
import { squareRobotNew } from "@/utils/squareRobot";

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
    const scale = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(props.width * ratio);
      canvas.height = Math.floor(props.height * ratio);
      canvas.style.width = props.width + "px";
      canvas.style.height = props.height + "px";
      // context.scale(ratio, ratio);
      return ratio;
    };
    switch (props.className) {
      case "sort":
        scale();
        sort(canvas, context, props.data, scale);
        break;
      case "room":
      //   // scale();
      //   // room(canvas, context, props.data);
      //   break;
      case "header":
        let frameCount = 0;
        let newCount = 0;
        let animationFrameID: number;
        const render = () => {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          frameCount++;
          frameCount = frameCount % 200;
          if (frameCount > 100) newCount = 200 - frameCount;
          if (frameCount <= 100) newCount = frameCount;
          const ratio = scale();
          const positionAndSize = {
            x01: 200 + (170 * ratio * newCount) / 100,
            y01: 380 * ratio,
            scale: 0.2, // 1 === 100%
          };
          // const positionAndSize2 = {
          //   x01: (100 * ratio * newCount) / 100,
          //   y01: 200 * ratio,
          //   scale: 0.2, // 1 === 100%
          // };
          header(context, newCount, props.data, scale);
          squareRobotNew(context, newCount, positionAndSize);
          // squareRobotNew(context, newCount, positionAndSize2);
          animationFrameID = window.requestAnimationFrame(render);
        };
        render();
        return () => window.cancelAnimationFrame(animationFrameID);

        break;
      default:
        break;
    }
  }, [props.data, props.width, props.height]);

  function header(
    context: CanvasRenderingContext2D,
    count: number,
    data: CanvasProps["data"] = [],
    scale: () => number
  ) {
    const ratio = scale();
    const myButtons = context.canvas.getElementsByClassName("myButtons")[0];
    const homeButtons = context.canvas.getElementsByClassName("homeButtons")[0];
    const margin = 360 * 2;
    let p = 0;
    p = p + 0.01 * count;

    const buttonData = data.filter(
      (el) =>
        el.group === "lang" || el.group === "tool" || el.group === "button"
    );
    const roomData = data.filter(
      (el) => el.group === "room" || el.group === "me"
    );
    const pageData = data.filter((el) => el.group === "page");

    const amount = buttonData.length;
    const amoutHome = pageData.length;
    const buttonHeight = context.canvas.height * 0.17;
    let buttons: ButtonMainClass[] = [];
    let pageButton: Button[] = [];
    const spacing = buttonHeight;
    const gap = 5;

    context.canvas.addEventListener("pointerdown", (e: PointerEvent) => {
      handleClick(e);
    });
    function handleClick(e: PointerEvent) {
      // Calculate click coordinates
      const { height, width, top } = context.canvas.getBoundingClientRect();
      const x = e.clientX - context.canvas.offsetLeft;
      const y = e.clientY - top;
      // Focus button1, if appropriate
      for (let j = 0; j < amount; j++) {
        buttons[j].draw(context);
        console.log(buttons);

        if (context.isPointInPath(x * ratio, y * ratio)) {
          const sort = buttons[j].el.dataset.sort as string;
          props.onChangeData(sort);
          buttons[j].el.className = "btn active";
        }
      }
      // pageButton[0].draw(context);
      // if (context.isPointInPath(x, y)) {
      //   const page = pageButton[0].el.dataset.page as string;
      //   // console.log(page);
      // }
    }
    const roomObjects: Room[] = [];
    const homeObjects: Me[] = [];
    count;
    // context.beginPath();
    roomData[0].coords = {
      x: 0,
      y: 0,
      zoom: 1,
    };
    roomData[1].coords = {
      x: 150 * ratio,
      y: 255 * ratio,
      zoom: 1,
    };
    roomData[2].coords = {
      x: 40 * ratio,
      y: 370 * ratio,
      zoom: 0.5,
    };
    roomData[3].coords = {
      x: 160 * ratio,
      y: 290 * ratio,
      zoom: 1,
    };

    const coords: {
      x: number;
      y: number;
      canvasW: number;
      canvasH: number;
    } = {
      x: 50 * ratio,
      y: 50 * ratio,
      canvasW: context.canvas.width / 8,
      canvasH: context.canvas.height / 8,
    };
    const coordsRoom: {
      x: number;
      y: number;
      canvasW: number;
      canvasH: number;
    } = {
      x: 0,
      y: 0,
      canvasW: context.canvas.width,
      canvasH: context.canvas.height,
    };
    homeObjects[0] = new Room(0, 0, coordsRoom.canvasW, coordsRoom.canvasH, [
      roomData[0],
    ]);
    homeObjects[0].draw(context, coordsRoom);

    for (let i = 1; i < roomData.length; i++) {
      const [x, y] = [0, 0];
      homeObjects[i] = new Me(x, y, 100, 100, roomData.slice(1));
      homeObjects[i].draw(context, coords);
    }
    for (let i = 0; i < amount; i++) {
      const el = myButtons.children[i] as HTMLElement;
      const x = spacing / 2 + margin;
      const y = context.canvas.height * 0.32 + i * (buttonHeight + gap);
      const width = spacing - gap;
      const height = buttonHeight;
      buttons[i] = new ButtonMainClass(x, y, width, height, buttonData[i], el);
      buttons[i].draw(context);
    }
    for (let i = 0; i < amoutHome; i++) {
      const el = homeButtons.children[i] as HTMLElement;
      const x = (spacing / 2 + margin) * ratio;
      const y =
        (context.canvas.height * 0.1 + i * (buttonHeight + gap)) * ratio;
      const width = spacing - gap;
      const height = buttonHeight / 3;
      pageButton[i] = new Button(x, y, width, height, el);
      // pageButton[i].draw(context);
      // }
    }
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
