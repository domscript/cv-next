import { Column } from "./column";
import { Button } from "./button";
import { bubbleSort } from "./algorithms/bubbleSort";
import { bubbleSortBack } from "./algorithms/bubbleSortBack";
import { selectionSort } from "./algorithms/selectionSort";
import { selectionSortBack } from "./algorithms/selectionSortBack";
import { insertionSort } from "./algorithms/insertionSort";
import DataSVG from "./pathsSVG";

export interface Moves {
  indices: [number, number];
  swap: boolean;
}
let array: number[] = [];
let cols: Column[] = [];
let moves: Moves[];

export default function sort(
  this: DataSVG[],
  context: CanvasRenderingContext2D,
  newCount: number,
  ratio: number
) {
  const data = [...this];
  const myButtons = context.canvas.getElementsByClassName("myButtons")[0];
  const margin = 30;
  const buttonsGap = 8;
  const buttons: Button[] = [];
  const buttonsNum = myButtons.children.length;
  const buttonSpacing = (context.canvas.width - margin * 2) / buttonsNum;
  // console.log("hi", ratio);
  for (let j = 0; j < buttonsNum; j++) {
    const el = myButtons.children[j] as HTMLElement;
    const x = j * buttonSpacing + buttonSpacing / 2 + margin;
    const y = context.canvas.height - margin;
    const width = buttonSpacing - buttonsGap;
    const height = context.canvas.height * 0.08;
    buttons[j] = new Button(x, y, width, height, el);
    buttons[j].draw(context, ratio);
  }
  let amount = data.length;
  const maxColumnHeight = context.canvas.height * 0.5;

  function init() {
    array = [];
    cols = [];

    const grow = (context.canvas.height * 0.2) / amount;

    const spacing = (context.canvas.width - margin * 2) / amount;
    const gap = (spacing * 2) / amount;

    for (let i = 0; i < amount; i++) {
      array[i] = Math.random() * 0.8 + 0.2;
    }
    for (let i = 0; i < array.length; i++) {
      const x = i * spacing + spacing / 2 + margin;
      const y = context.canvas.height * 0.85 - margin - i * grow;
      const width = spacing - gap;
      const height = maxColumnHeight * array[i];
      const colsData = data[i];
      cols[i] = new Column(x, y, width, height, colsData);
    }
  }
  if (cols.length <= 0) init();

  context.canvas.addEventListener("pointerdown", (e: PointerEvent) => {
    handleClick(e).sort && init();
    switch (handleClick(e).sort) {
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
    const { height, width, top } = context.canvas.getBoundingClientRect();
    const x = e.clientX - context.canvas.offsetLeft;
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
}
