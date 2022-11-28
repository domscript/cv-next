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
let timer: NodeJS.Timeout;
function defineAngles(
  cardsSrc: cardsSrcInt[],
  startCondition: startConditionInt
) {
  const cards = cardsSrc.map((el) => el.lines.length);
  const sum = cards.reduce((acc, el) => {
    acc += el + startCondition.margin / 100;
    return acc;
  }, 0);
  const angles = cards.reduce(
    (acc, num, i) => {
      acc = [
        ...acc,
        ((num + startCondition.margin / 100) / sum) * Math.PI * 2 + acc[i],
      ];
      return acc;
    },
    [(startCondition.angleStart * Math.PI) / 180]
  );
  return angles;
}

interface coordsInt {
  x: number;
  y: number;
  canvasW: number;
  canvasH: number;
}

interface startConditionInt {
  x: number;
  y: number;
  radius: number;
  margin: number;
  angleStart: number;
  inner: number;
  outer: number;
}
function init(
  context: CanvasRenderingContext2D,
  angles: number[],
  colors: [string, string, string, string][],
  startCondition: startConditionInt,
  coords: coordsInt,
  cardsSrc: cardsSrcInt[],
  ratio: number
) {
  for (let sector in sectors) {
    sectors.shift();
  }
  for (let i = 0; i < angles.length - 1; i++) {
    sectors[i] = new Sector(
      startCondition.x,
      startCondition.y,
      startCondition.radius,
      startCondition.inner,
      startCondition.outer,
      angles[i],
      angles[i + 1 < angles.length ? i + 1 : 0],
      cardsSrc[i].lines.length,
      cardsSrc[i]
    );
    sectors[i].draw(context, colors[i], coords, ratio);
  }
}

export function wheel(
  this: DataSVG[],
  context: CanvasRenderingContext2D,
  frameCount: number,
  ratio: number
) {
  frameCount = (2 * Math.PI * frameCount) / 50;
  const data = [...this];
  if (data.length <= 0) return;
  const newData = [...new Set(data.map((el) => el.group))] as string[];
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

  const startCondition = {
    x: context.canvas.width / 2,
    y: context.canvas.height / 2,
    radius: Math.min(context.canvas.width / 2, context.canvas.height / 2),
    margin: 10,
    angleStart: 200, // deg
    inner: 40, // 40%
    outer: 15, // 15%
  };

  // const rectWidth =
  //   (1 - (1 - (inner + outer) / 100) * Math.cos(Math.PI / 4)) / 2;

  const angles = defineAngles(cardsSrc, startCondition);

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

  if (sectors.length <= 0)
    init(context, angles, colors, startCondition, coords, cardsSrc, ratio);

  // context.canvas.addEventListener(
  //   "pointerdown",
  //   (e: PointerEvent) => {
  //     if (timer) clearTimeout(timer);

  //     const clickCoords = handleClick(e);
  //     coords.x = clickCoords.x;
  //     coords.y = clickCoords.y;
  //     coords.canvasW = clickCoords.canvasW;
  //     coords.canvasH = clickCoords.canvasH;
  //     timer = setTimeout(() => {
  //       [coords.x, coords.y] = [0, 0];
  //     }, 200);

  //     for (let i = 0; i < sectors.length; i++) {
  //       sectors[i].draw(context, colors[i], coords, ratio);
  //     }
  //   },
  //   false
  // );

  // function handleClick(e: PointerEvent) {
  //   // Calculate click coordinates
  //   const { height, width, top } = context.canvas.getBoundingClientRect();
  //   const x = e.clientX - context.canvas.offsetLeft;
  //   const y = e.clientY - top;
  //   const canvasW = width;
  //   const canvasH = height;
  //   return { x, y, canvasW, canvasH };
  // }

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
