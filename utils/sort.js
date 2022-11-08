import { Column } from "./column.js";
import { Button } from "./button.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { bubbleSortBack } from "./algorithms/bubbleSortBack.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { selectionSortBack } from "./algorithms/selectionSortBack.js";
import { insertionSort } from "./algorithms/insertionSort.js";

export default function sort(canvas, context) {
  const myButtons = canvas.getElementsByClassName("myButtons")[0];
  const margin = 30;
  const buttonsGap = 8;
  const buttons = [];
  const buttonsNum = myButtons.children.length;

  const buttonSpacing = (canvas.width - margin * 2) / buttonsNum;

  for (let j = 0; j < buttonsNum; j++) {
    const el = myButtons.children[j];
    const x = j * buttonSpacing + buttonSpacing / 2 + margin;
    const y = canvas.height - margin;
    const width = buttonSpacing - buttonsGap;
    const height = canvas.height * 0.08;
    buttons[j] = new Button(x, y, width, height, el);
    buttons[j].draw(context);
  }
  let amount = 10;
  // let speed;
  const maxColumnHeight = canvas.height * 0.5;
  let array = [];
  let cols = [];
  let moves = [];
  function init() {
    array = [];
    cols = [];
    // amount = setAmount();
    // speed = setSpeed();
    const grow = (canvas.height * 0.2) / amount;

    const spacing = (canvas.width - margin * 2) / amount;
    const gap = (spacing * 2) / amount;

    for (let i = 0; i < amount; i++) {
      array[i] = Math.random() * 0.8 + 0.15;
    }
    moves = [];
    for (let i = 0; i < array.length; i++) {
      const x = i * spacing + spacing / 2 + margin;
      const y = canvas.height * 0.8 - margin - i * grow;
      const width = spacing - gap;
      const height = maxColumnHeight * array[i];
      cols[i] = new Column(x, y, width, height);
    }
  }
  init();

  canvas.addEventListener("click", (e) => {
    switch (handleClick(e)) {
      case "bubble":
        bubble();
        break;
      case "bubbleBack":
        bubbleBack();
        break;
      case "selection":
        selection();
        break;
      case "selectionBack":
        selectionBack();
        break;
      case "insertion":
        insertion();
        break;
    }
  });

  function handleClick(e) {
    let sort;
    // Calculate click coordinates
    const { height, width, top } = canvas.getBoundingClientRect();
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - top;
    const canvasW = e.target.clientWidth;
    const canvasH = e.target.clientHeight;

    // Focus button1, if appropriate
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].draw(context, myButtons.children[j]);
      if (context.isPointInPath(x, y)) {
        sort = buttons[j].el.dataset.sort;
      }
    }
    return sort;
  }

  // function setAmount() {
  //   return document.getElementById("amount").value;
  // }
  // function setSpeed() {
  //   return document.getElementById("speed").value;
  // }

  function bubble() {
    init();
    moves = bubbleSort(array);
  }
  function bubbleBack() {
    init();
    moves = bubbleSortBack(array);
  }
  function insertion() {
    init();
    moves = insertionSort(array);
  }
  function selection() {
    init();
    moves = selectionSort(array);
  }
  function selectionBack() {
    init();
    moves = selectionSortBack(array);
  }

  animate();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let changed = false;
    let frameCount;

    for (let j = 0; j < buttons.length; j++) {
      buttons[j].draw(context, myButtons.children[j]);
    }

    for (let i = 0; i < cols.length; i++) {
      changed = cols[i].draw(context) || changed;
    }

    if (!changed && moves.length > 0) {
      const move = moves.shift();
      const [i, j] = move.indices;
      if (move.swap) {
        // switch (speed) {
        //   case "1":
        //     frameCount = 100;
        //     break;
        //   case "2":
        //     frameCount = 50;
        //     break;
        //   case "3":
        //     frameCount = 20;
        //     break;
        //   case "4":
        //     frameCount = 10;
        //     break;
        //   case "5":
        //     frameCount = 1;
        //     break;
        //   default:
        //     frameCount = 25;
        //     break;
        // }

        cols[i].moveTo(cols[j], 1, frameCount);
        cols[j].moveTo(cols[i], -1, frameCount);
        [cols[i], cols[j]] = [cols[j], cols[i]];
      } else {
        // todo
      }
    }
    requestAnimationFrame(animate);
  }
}
