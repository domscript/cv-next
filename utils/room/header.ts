import DataSVG from "@/utils/pathsSVG";
import { Room } from "@/utils/room/room";
import { ButtonMainClass } from "@/utils/room/buttonMainClass";
import { Button } from "@/utils/room/button";
import { Me } from "@/utils/room/me";

export interface positionAndSizeInt {
  x01: number;
  y01: number;
  scale: number;
}

export function header(
  this: DataSVG[],
  thisArg: positionAndSizeInt,
  context: CanvasRenderingContext2D,
  frameCount: number,
  ratio: number
) {
  const data = [...this];
  let newCount = 0;
  frameCount = frameCount % 200;
  if (frameCount > 100) newCount = 200 - frameCount;
  if (frameCount <= 100) newCount = frameCount;
  const myButtons = context.canvas.getElementsByClassName("myButtons")[0];
  const margin = 360 * ratio;
  let p = 0;
  p = p + 0.01 * newCount;

  const buttonData = data.filter(
    (el) => el.group === "lang" || el.group === "tool" || el.group === "button"
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

      if (context.isPointInPath(x * ratio, y * ratio)) {
        const sort = buttons[j].el.dataset.sort as string;
        buttons[j].el.className = "btn active";
      }
    }
  }
  const roomObjects: Room[] = [];
  const homeObjects: Me[] = [];
  newCount;
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
  roomObjects[0] = new Room(0, 0, coordsRoom.canvasW, coordsRoom.canvasH, [
    roomData[0],
  ]);
  roomObjects[0].draw(context, coordsRoom);

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
}
