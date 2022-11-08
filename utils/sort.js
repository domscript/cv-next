import { Column } from "./column.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";

export default function sort(canvas, context) {
  const myButtons = canvas.getElementsByClassName("myButtons")[0];
  const margin = 30;
  let amount = 10;
  // let speed;
  const maxColumnHeight = canvas.height * 0.7;
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
    console.log(array);
    moves = [];
    for (let i = 0; i < array.length; i++) {
      const x = i * spacing + spacing / 2 + margin;
      const y = canvas.height - margin - i * grow;
      const width = spacing - gap;
      const height = maxColumnHeight * array[i];
      cols[i] = new Column(x, y, width, height);
    }
    moves = bubbleSort(array);
  }
  init();

  animate();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let changed = false;
    let frameCount;

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
