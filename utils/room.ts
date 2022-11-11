import { Button } from "./button";
import { coordsDataSVG, Me } from "./me";
import { CanvasProps } from "../components/Canvas";

export default function sort(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  data: coordsDataSVG[] = []
) {
  const myButtons = canvas.getElementsByClassName("myButtons")[0];
  const margin = 30;
  const buttonsGap = 8;
  const buttons = [];
  const buttonsNum = myButtons.children.length;
  const buttonSpacing = (canvas.width - margin * 2) / buttonsNum;

  for (let j = 0; j < buttonsNum; j++) {
    const el = myButtons.children[j] as HTMLElement;
    const x = j * buttonSpacing + buttonSpacing / 2 + margin;
    const y = canvas.height - margin;
    const width = buttonSpacing - buttonsGap;
    const height = canvas.height * 0.08;
    buttons[j] = new Button(x, y, width, height, el);
    buttons[j].draw(context);
  }

  context.beginPath();
  const img = new Image();
  img.src = "image/room2.svg";
  img.onload = () => {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    data[0].coords = {
      x: 200,
      y: 255,
      zoom: 1,
    };
    data[1].coords = {
      x: 390,
      y: 42,
      zoom: 0.5,
    };
    data[2].coords = {
      x: 210,
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
      homeObjects[i] = new Me(x, y, 100, 100, data);
      homeObjects[i].draw(context, coords);
    }
  };
}
