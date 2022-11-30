import { Column } from "./column";
import { Button } from "./button";
import { ButtonMainClass } from "./buttonMainClass";
import DataSVG from "@/utils/pathsSVG";
import {
  bubbleSort,
  bubbleSortBack,
  selectionSort,
  selectionSortBack,
  insertionSort,
} from "./algorithms";

export interface Moves {
  indices: [number, number];
  swap: boolean;
}
let array: number[] = [];
let cols: Column[] = [];
let moves: Moves[];
const buttons: Button[] = [];
const buttonsSort: ButtonMainClass[] = [];
let newDataFilter: DataSVG[] = [];

export default function sort(
  this: DataSVG[],
  context: CanvasRenderingContext2D,
  newCount: number,
  ratio: number
) {
  const dataAll = [...this];
  const myButtons = context.canvas.getElementsByClassName("myButtons")[0];
  const sortButtons = context.canvas.getElementsByClassName("sortButtons")[0];
  const buttonData = dataAll.filter((el) => el.group === "button");
  const data = dataAll.filter((el) => el.group !== "button");
  const margin = 30;
  const buttonsGap = 8;
  const buttonsNum = myButtons.children.length;
  const buttonsSortNum = sortButtons.children.length;
  const buttonSpacing = (context.canvas.width - margin * 2) / buttonsNum;
  for (let j = 0; j < buttonsNum; j++) {
    const el = myButtons.children[j] as HTMLElement;
    const x = j * buttonSpacing + buttonSpacing / 2 + margin;
    const y = context.canvas.height - margin;
    const width = buttonSpacing - buttonsGap;
    const height = context.canvas.height * 0.08;
    buttons[j] = new Button(x, y, width, height, el);
    buttons[j].draw(context, ratio);
  }
  for (let j = 0; j < buttonsSortNum; j++) {
    const el = sortButtons.children[j] as HTMLElement;
    const x = (j * buttonSpacing) / 1.5 + buttonSpacing / 2 + margin;
    const width = buttonSpacing / 2;
    const height = context.canvas.height * 0.08;
    const y = margin + width;
    buttonsSort[j] = new ButtonMainClass(
      x,
      y,
      width,
      height,
      buttonData[j],
      el
    );
    buttonsSort[j].draw(context);
  }
  const maxColumnHeight = context.canvas.height * 0.5;

  function init(data: DataSVG[]) {
    array = [];
    cols = [];
    let amount = data.length;
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

  if (cols.length <= 0) init(data);

  context.canvas.addEventListener("pointerdown", (e: PointerEvent) => {
    if (newDataFilter.length <= 0) newDataFilter = data;
    switch (handleClick(e).type) {
      case "lang":
        newDataFilter = data.filter((el) => el.group === "lang");
        init(newDataFilter);
        moves = bubbleSort(array);
        break;
      case "tool":
        newDataFilter = data.filter((el) => el.group === "tool");
        init(newDataFilter);
        moves = bubbleSort(array);
        break;
      case "langspeak":
        newDataFilter = data.filter((el) => el.group === "langspeak");
        init(newDataFilter);
        moves = bubbleSort(array);
        break;
    }
    switch (handleClick(e).sort) {
      case "bubble":
        init(newDataFilter);
        moves = bubbleSort(array);
        break;
      case "bubbleBack":
        init(newDataFilter);
        moves = bubbleSortBack(array);
        break;
      case "selection":
        init(newDataFilter);
        moves = selectionSort(array);
        break;
      case "selectionBack":
        init(newDataFilter);
        moves = selectionSortBack(array);
        break;
      case "insertion":
        init(newDataFilter);
        moves = insertionSort(array);
        break;
    }
  });

  function handleClick(e: PointerEvent) {
    let sort;
    let type;
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
    for (let j = 0; j < buttonsSort.length; j++) {
      buttonsSort[j].draw(context);
      if (context.isPointInPath(x * ratio, y * ratio)) {
        type = buttonsSort[j].el.dataset.sort;
      }
    }

    return { x, y, canvasW, canvasH, sort, type };
  }

  let changed = false;
  let frameCount;

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
