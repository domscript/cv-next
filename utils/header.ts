import { buttonMainClass } from "./buttonMainClass.js";
import { CanvasProps } from "../components/Canvas";

export default function header(
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
  let buttonData: string = "";
  canvas.addEventListener("pointerdown", (e: PointerEvent) => {
    buttonData = handleClick(e);
    console.log(buttonData);
  });

  function handleClick(e: PointerEvent) {
    let sort;
    // Calculate click coordinates
    const { height, width, top } = canvas.getBoundingClientRect();
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - top;

    // Focus button1, if appropriate
    for (let j = 0; j < amount; j++) {
      buttons[j].draw(context);
      if (context.isPointInPath(x, y)) {
        sort = buttons[j].el.dataset.sort;
        buttons[j].el.className = "btn active";
      }
    }
    return sort;
  }
  console.log(buttonData);
  return buttonData;

  // animate();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < amount; j++) {
      buttons[j].draw(context);
    }
    // for (let i = 0; i < buttons.length; i++) {
    //   changed = buttons[i].draw(context);
    // }
    requestAnimationFrame(animate);
  }
}
