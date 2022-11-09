import { Sector } from "./sector.js";

import {
  Events,
  Apps,
  Phone,
  Video,
  Webinars,
  TeamChat,
  MarketPlace,
  Solvvy,
  Whiteboard,
  Api,
  ZoomOI,
  DigitalSignage,
  ConferenceRooms,
  WorkSpace,
  ContactCenter,
} from "./pathsSVG";

export default function sort(canvas, context, data = []) {
  const margin = 10;
  const cardsSrc = [
    {
      group: "mOne",
      lines: [Phone],
    },
    {
      group: "mAI",
      lines: [ZoomOI],
    },
    { group: "mD", lines: [MarketPlace] },
    { group: "mCC", lines: [ContactCenter, Solvvy] },
    { group: "mZC", lines: [WorkSpace, ConferenceRooms, DigitalSignage] },
  ];
  const angleStart = 200;
  const [inner, outer] = [40, 15];

  function defineAngles(cardsSrc, angleStart) {
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

  const colors = [
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
    canvasW: canvas.width,
    canvasH: canvas.height,
  };
  const sectors = [];

  function init() {
    for (let i = 0; i < angles.length - 1; i++) {
      const [x, y] = [canvas.width / 2, canvas.height / 2];
      const radius = canvas.width / 2;
      sectors[i] = new Sector(
        x,
        y,
        radius,
        inner,
        outer,
        angles[i],
        angles[i + 1 < angles.length ? i + 1 : 0],
        cardsSrc[i].lines.length,
        cardsSrc[i]
      );
      sectors[i].draw(context, colors[i], coords);
    }
  }

  init();

  let timer;
  canvas.addEventListener(
    "click",
    (e) => {
      if (timer) clearTimeout(timer);

      const clickCoords = handleClick(e);
      coords.x = clickCoords.x;
      coords.y = clickCoords.y;
      coords.canvasW = clickCoords.canvasW;
      coords.canvasH = clickCoords.canvasH;
      timer = setTimeout(() => {
        [coords.x, coords.y] = [0, 0];
      }, 5000);

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < sectors.length; i++) {
        sectors[i].draw(context, colors[i], coords);
      }
    },
    false
  );

  function handleClick(e) {
    // Calculate click coordinates
    const { height, width, top } = canvas.getBoundingClientRect();
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - top;
    const canvasW = e.target.clientWidth;
    const canvasH = e.target.clientHeight;
    return { x, y, canvasW, canvasH };
  }

  function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < sectors.length; i++) {
      sectors[i].draw(context, colors[i], coords);
      sectors[i].rotateTo(sectors[i]);
    }
  }

  animate();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < sectors.length; i++) {
      sectors[i].draw(context, colors[i], coords);
      sectors[i].rotateTo(sectors[i]);
    }
    requestAnimationFrame(animate);
  }
}
