import { Sector } from "./sector";
import DataSVG from "./pathsSVG";

export interface cardsSrcInt {
  group: string;
  lines: {
    text: string[];
    viewBox: string;
    detail: {
      fill: string;
      path: string;
    }[];
  }[];
}
const sectors: Sector[] = [];

export function wheel(
  this: DataSVG[],
  context: CanvasRenderingContext2D,
  frameCount: number,
  ratio: number
) {
  console.log(frameCount);
  frameCount = (2 * Math.PI * frameCount) / 50;
  const data = [...this];
  if (data.length <= 0) return;
  const newData = data
    .map((el) => el.group)
    .reduce((acc: string[], el) => {
      if (acc.length === 0) {
        acc = [el];
      } else if (acc.includes(el)) {
        acc = [...acc];
      } else {
        acc.push(el);
      }
      return acc;
    }, []);
  const cardsSrc: cardsSrcInt[] = newData.map((el) => ({
    group: el,
    lines: [],
  }));
  data.forEach((el, i) => {
    cardsSrc.forEach((k) => {
      k.group === el.group &&
        k.lines.push({
          viewBox: data[i].viewBox,
          detail: [...data[i].detail],
          text: data[i].text as string[],
        });
    });
  });
  const margin = 10;
  const angleStart = 200;
  const [inner, outer] = [40, 15];
  const rectWidth =
    (1 - (1 - (inner + outer) / 100) * Math.cos(Math.PI / 4)) / 2;
  function defineAngles(cardsSrc: cardsSrcInt[], angleStart: number) {
    const cards = cardsSrc.map((el) => el.lines.length);
    const sum = cards.reduce((acc, el) => {
      acc += el + margin / 100;
      return acc;
    }, 0);
    const angles = cards.reduce(
      (acc, num, i) => {
        acc = [...acc, ((num + margin / 100) / sum) * Math.PI * 2 + acc[i]];
        return acc;
      },
      [(angleStart * Math.PI) / 180]
    );
    return angles;
  }

  const angles = defineAngles(cardsSrc, angleStart);

  const colors: [string, string, string, string][] = [
    ["#274d83", "#5b98f0", "#b5d0f8", "#d7e6fc"],
    ["#407676", "#8be2e4", "#c4f3f3", "#dbf9f9"],
    ["#80384d", "#e47a98", "#f3c2d0", "#f9dfe6"],
    ["#815a30", "#f6c08b", "#fadbba", "#fcebd7"],
    ["#4a7d5c", "#9cedb7", "#cff7dc", "#e2fbea"],
    ["#80384d", "#e47a98", "#f3c2d0", "#f9dfe6"],
    ["#815a30", "#f6c08b", "#fadbba", "#fcebd7"],
    ["#4a7d5c", "#9cedb7", "#cff7dc", "#e2fbea"],
  ];

  const coords = {
    x: 0,
    y: 0,
    canvasW: context.canvas.width,
    canvasH: context.canvas.height,
  };

  function init() {
    console.log(" hi sectors");
    for (let sector in sectors) {
      sectors.shift();
    }
    for (let i = 0; i < angles.length - 1; i++) {
      const [x, y] = [context.canvas.width / 2, context.canvas.height / 2];
      const radius = context.canvas.width / 2;
      sectors[i] = new Sector(
        x,
        y,
        radius,
        inner,
        outer,
        angles[i] + frameCount,
        angles[i + 1 < angles.length ? i + 1 : 0] + frameCount,
        cardsSrc[i].lines.length,
        cardsSrc[i]
      );
      sectors[i].draw(context, colors[i], coords, ratio);
    }
  }

  if (sectors.length <= 0) init();

  let timer: NodeJS.Timeout;
  context.canvas.addEventListener(
    "pointerdown",
    (e: PointerEvent) => {
      if (timer) clearTimeout(timer);

      const clickCoords = handleClick(e);
      coords.x = clickCoords.x;
      coords.y = clickCoords.y;
      coords.canvasW = clickCoords.canvasW;
      coords.canvasH = clickCoords.canvasH;
      timer = setTimeout(() => {
        [coords.x, coords.y] = [0, 0];
      }, 200);

      // context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      for (let i = 0; i < sectors.length; i++) {
        sectors[i].draw(context, colors[i], coords, ratio);
      }
    },
    false
  );

  function handleClick(e: PointerEvent) {
    // Calculate click coordinates
    const { height, width, top } = context.canvas.getBoundingClientRect();
    const x = e.clientX - context.canvas.offsetLeft;
    const y = e.clientY - top;
    const canvasW = width;
    const canvasH = height;
    console.log({ x, y, canvasW, canvasH });
    return { x, y, canvasW, canvasH };
  }

  for (let i = 0; i < sectors.length; i++) {
    // context.clearRect(
    //   0,
    //   0,
    //   context.canvas.width * rectWidth,
    //   context.canvas.height
    // );
    // context.clearRect(
    //   context.canvas.width * (1 - rectWidth),
    //   0,
    //   context.canvas.width,
    //   context.canvas.height
    // );
    // context.clearRect(
    //   0,
    //   0,
    //   context.canvas.width,
    //   context.canvas.height * rectWidth
    // );
    // context.clearRect(
    //   0,
    //   context.canvas.height * (1 - rectWidth),
    //   context.canvas.width,
    //   context.canvas.height
    // );
    sectors[i].draw(context, colors[i], coords, ratio);
    sectors[i].rotateTo(sectors[i]);
  }
}
