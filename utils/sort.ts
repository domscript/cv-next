import { Column } from "./column";
import { Button } from "./button";
import { bubbleSort } from "./algorithms/bubbleSort";
import { bubbleSortBack } from "./algorithms/bubbleSortBack";
import { selectionSort } from "./algorithms/selectionSort";
import { selectionSortBack } from "./algorithms/selectionSortBack";
import { insertionSort } from "./algorithms/insertionSort";
import { CanvasProps } from "@/components/Canvas";

export interface Moves {
  indices: [number, number];
  swap: boolean;
}

export default function sort(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  data: CanvasProps["data"] = [],
  scale: () => number
) {
  const myButtons = canvas.getElementsByClassName("myButtons")[0];
  const margin = 30;
  const buttonsGap = 8;
  const buttons: Button[] = [];
  const buttonsNum = myButtons.children.length;
  const buttonSpacing = (canvas.width - margin * 2) / buttonsNum;
  const ratio = scale();

  for (let j = 0; j < buttonsNum; j++) {
    const el = myButtons.children[j] as HTMLElement;
    const x = j * buttonSpacing + buttonSpacing / 2 + margin;
    const y = canvas.height - margin;
    const width = buttonSpacing - buttonsGap;
    const height = canvas.height * 0.08;
    buttons[j] = new Button(x, y, width, height, el);
    buttons[j].draw(context, ratio);
  }
  let amount = data.length;
  const maxColumnHeight = canvas.height * 0.5;
  let array: number[] = [];
  let cols: Column[] = [];
  let moves: Moves[];
  function init() {
    array = [];
    cols = [];

    const grow = (canvas.height * 0.2) / amount;

    const spacing = (canvas.width - margin * 2) / amount;
    const gap = (spacing * 2) / amount;

    for (let i = 0; i < amount; i++) {
      array[i] = Math.random() * 0.8 + 0.2;
    }
    for (let i = 0; i < array.length; i++) {
      const x = i * spacing + spacing / 2 + margin;
      const y = canvas.height * 0.85 - margin - i * grow;
      const width = spacing - gap;
      const height = maxColumnHeight * array[i];
      const colsData = data[i];
      cols[i] = new Column(x, y, width, height, colsData);
    }
  }
  init();

  canvas.addEventListener("pointerdown", (e: PointerEvent) => {
    switch (handleClick(e).sort) {
      case handleClick(e).sort:
        init();
      case "bubble":
        moves = bubbleSort(array);
        break;
      case "bubbleBack":
        moves = bubbleSortBack(array);
        break;
      case "selection":
        moves = selectionSort(array);
        break;
      case "selectionBack":
        moves = selectionSortBack(array);
        break;
      case "insertion":
        moves = insertionSort(array);
        break;
    }
  });

  function handleClick(e: PointerEvent) {
    let sort;
    // Calculate click coordinates
    const { height, width, top } = canvas.getBoundingClientRect();
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - top;
    const canvasW = width;
    const canvasH = height;
    // Focus button1, if appropriate
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].draw(context, ratio);
      if (context.isPointInPath(x * ratio, y * ratio)) {
        sort = buttons[j].el.dataset.sort;
      }
    }
    return { x, y, canvasW, canvasH, sort };
  }

  animate();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let changed = false;
    let frameCount;

    for (let j = 0; j < buttons.length; j++) {
      buttons[j].draw(context, ratio);
    }

    for (let i = 0; i < cols.length; i++) {
      changed = cols[i].draw(context) || changed;
    }

    if (!changed && moves?.length > 0) {
      const move = moves.shift();
      if (move) {
        const [i, j] = move.indices;
        if (move.swap) {
          cols[i].moveTo(cols[j], 1, frameCount);
          cols[j].moveTo(cols[i], -1, frameCount);
          [cols[i], cols[j]] = [cols[j], cols[i]];
        } else {
          // todo
        }
      }
    }
    requestAnimationFrame(animate);
  }
}
