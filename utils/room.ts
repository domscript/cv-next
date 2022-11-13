// import { Button } from "./button";
import { Me } from "./me";
import { CanvasProps } from "../components/Canvas";

export default function sort(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  data: CanvasProps["data"] = []
) {
  // const myButtons = canvas.getElementsByClassName("myButtons")[0];
  // const margin = 30;
  // const buttonsGap = 8;
  // const buttons = [];
  // const buttonsNum = myButtons.children.length;
  // const buttonSpacing = (canvas.width - margin * 2) / buttonsNum;
  // for (let j = 0; j < buttonsNum; j++) {
  //   const el = myButtons.children[j] as HTMLElement;
  //   const x = j * buttonSpacing + buttonSpacing / 2 + margin;
  //   const y = canvas.height - margin;
  //   const width = buttonSpacing - buttonsGap;
  //   const height = canvas.height * 0.08;
  //   buttons[j] = new Button(x, y, width, height, el);
  //   buttons[j].draw(context);
  // }
}
