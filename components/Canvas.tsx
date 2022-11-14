import React, { useRef, useEffect, useState } from "react";
import DataSVG from "../utils/pathsSVG";
import sort from "../utils/sort";
import room from "../utils/room";
import { ButtonMainClass } from "../utils/buttonMainClass";
import { Button } from "../utils/button";
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
    const homeButtons = canvas.getElementsByClassName("homeButtons")[0];
    const margin = 360;

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
    const buttonHeight = canvas.height * 0.17;
    let buttons: ButtonMainClass[] = [];
    let pageButton: Button[] = [];
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
      // pageButton[0].draw(context);
      // if (context.isPointInPath(x, y)) {
      //   const page = pageButton[0].el.dataset.page as string;
      //   // console.log(page);
      // }
    }
    const homeObjects: Me[] = [];

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

      for (let i = 0; i < 1; i++) {
        const [x, y] = [0, 0];
        homeObjects[i] = new Me(x, y, 100, 100, roomData);
        homeObjects[i].draw(context, coords);
      }
      for (let i = 0; i < amount; i++) {
        const el = myButtons.children[i] as HTMLElement;
        const x = spacing / 2 + margin;
        const y = canvas.height * 0.32 + i * (buttonHeight + gap);
        const width = spacing - gap;
        const height = buttonHeight;
        buttons[i] = new ButtonMainClass(
          x,
          y,
          width,
          height,
          buttonData[i],
          el
        );
        buttons[i].draw(context);
      }
      for (let i = 0; i < amoutHome; i++) {
        const el = homeButtons.children[i] as HTMLElement;
        const x = spacing / 2 + margin;
        const y = canvas.height * 0.1 + i * (buttonHeight + gap);
        const width = spacing - gap;
        const height = buttonHeight / 3;
        pageButton[i] = new Button(x, y, width, height, el);
        // pageButton[i].draw(context);
      }

      // squareRobot(canvas, context, 0.2, 400, 350);

      let p = 0,
        sign = 1,
        scale = 0.2,
        y01 = 380,
        x01 = 250;
      const x = (canvas.width / 2) * scale + x01,
        y = canvas.height * scale + y01,
        size = Math.min(canvas.width * scale, canvas.height * scale);

      animate();

      function animate() {
        // 0 < p < 1;
        p = p + 0.01 * sign;
        if (p > 1 || p < 0) sign = sign * -1;
        const legsArms = (p * (y - y01)) / 8;
        const y0 = (y - y01) / 8;
        const scale10 =
          (size / 10) *
          (1 + 0.3 * Math.sin(Math.PI * p) * Math.cos(Math.PI * p) ** 2);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 1; i++) {
          homeObjects[i].draw(context, coords);
        }
        for (let i = 0; i < amount; i++) {
          buttons[i].draw(context);
        }
        robotBody(160 + (x * p) / 2, y, y0, legsArms);
        heart(160 + ((x + 8) * p) / 2, y + y01, scale10 / 1.5);

        requestAnimationFrame(animate);
      }

      function robotBody(x: number, y: number, y0: number, p: number) {
        // x, y - coord, size - size
        const height = canvas.height * scale;
        const widht = canvas.width * scale;
        const heightBody = height / 2.2;
        const widhtBody = widht / 1.5;
        const heightEars = height / 10;
        const heightHead = height / 3.5;
        const heightNeck = (height - heightBody - heightHead - heightEars) / 4;
        const widhtHead = widht - heightBody;

        // background
        // context.beginPath();
        // context.lineWidth = 1;
        // context.strokeStyle = "green";
        // context.fillStyle = "green";
        // context.rect(0, 0, widht, height);
        // context.fill();
        // body
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "#991b1b";
        context.rect(
          x - widhtBody / 2,
          heightHead + heightNeck + heightEars + y01,
          widhtBody,
          heightBody
        );
        // head
        context.moveTo(x - widhtHead / 2, heightEars + y01);
        context.rect(
          x - widhtHead / 2,
          heightEars + y01,
          widhtHead,
          heightHead
        );
        // leg from right
        context.moveTo(
          x - widhtBody / 5,
          heightBody + heightHead + heightNeck + heightEars - p + y01
        );
        context.rect(
          x + widhtBody / 5,
          heightBody + heightHead + heightNeck + heightEars - p + y01,
          widhtBody / 5,
          heightBody / 5
        );
        // leg from left
        context.moveTo(
          x + widhtBody / 2.5,
          heightHead + heightNeck + heightEars + p - y0 + y01
        );
        context.rect(
          x - widhtBody / 2.5,
          heightBody + heightHead + heightNeck + heightEars + p - y0 + y01,
          widhtBody / 5,
          heightBody / 5
        );
        // arm from right
        context.moveTo(x + widhtBody / 2, heightHead + heightNeck - p + y01);
        context.rect(
          x + widhtBody / 2,
          heightHead + heightNeck + heightEars - p + y01,
          widhtBody / 5,
          heightBody / 5
        );
        // arm from left
        context.moveTo(x + widhtBody / 2, heightHead + heightNeck + p + y01);
        context.rect(
          x - widhtBody / 2,
          heightHead + heightNeck + heightEars - p + y01,
          -widhtBody / 5,
          heightBody / 5
        );
        // ear from left
        context.moveTo(x - widhtHead / 4 + p / 2, y01);
        context.rect(
          x - widhtHead / 4 + p / 2,
          y01,
          widhtBody / 10,
          heightBody / 5
        );
        // ear from right
        context.moveTo(x + widhtHead / 4 + p / 2, y01);
        context.rect(
          x + widhtHead / 4 + p / 2,
          y01,
          widhtBody / 10,
          heightBody / 5
        );
        context.fill();
        context.stroke();
        // eyes
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.rect(
          x - widhtHead / 3,
          heightHead / 7 + heightEars + y0 / 4 - p / 4 + y01,
          widhtHead / 5,
          heightHead / 7 + p / 4 - y0 / 4
        );
        context.moveTo(x + widhtHead / 3, heightHead / 3 + y01);
        context.rect(
          x + widhtHead / 3,
          heightHead / 7 + heightEars + y0 / 4 - p / 4 + y01,
          -widhtHead / 5,
          heightHead / 7 + p / 4 - y0 / 4
        );
        context.fill();
        //mouth
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "white";
        context.rect(
          x - ((widhtHead / 5) * p) / 12,
          heightHead / 1.5 + heightEars + y01,
          ((widhtHead / 5) * p) / 12,
          heightHead / 8
        );
        context.moveTo(x + ((widhtHead / 5) * p) / 12, heightHead / 1.5 + y01);
        context.rect(
          x + ((widhtHead / 5) * p) / 12,
          heightHead / 1.5 + heightEars + y01,
          ((-widhtHead / 5) * p) / 12,
          heightHead / 8
        );
        context.stroke();
        context.fill();
      }
      function heart(x: number, y: number, scale2: number) {
        const xHeart = x + scale2 * 1.4,
          yHeart = y / 2 + scale2;
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.fillStyle = "#166534";
        context.arc(xHeart, yHeart, scale2, Math.PI, 2.2 * Math.PI);
        context.lineTo(xHeart - scale2 * 0.95, yHeart + scale2 * 2.2);
        context.arc(
          xHeart - scale2 * 1.95,
          yHeart,
          scale2,
          Math.PI * 0.8,
          2 * Math.PI
        );
        context.fill();
        context.stroke();
      }

      requestAnimationFrame(animate);
    };
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
