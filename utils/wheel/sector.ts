import { lerp } from "../math";
import {
  cardsSrcInt,
  startConditionInt,
  anglesInt,
  dependDataInt,
  iconSizesAndCoordsInt,
} from "./wheelInterfaces";

export class Sector {
  constructor(
    public startCondition: startConditionInt,
    public angles: anglesInt = {
      angleS: 0,
      angleE: 180,
    },
    public cardsSrc: cardsSrcInt,
    public colors: [string, string, string, string]
  ) {}

  rotateTo(sector: Sector, frameCount = 10) {
    // frameCount always should be Int round Up
    // it makes this func independent from outside
    const deg = (1 / 180) * Math.PI;
    frameCount = Math.ceil(frameCount);
    for (let i = 1; i <= frameCount; i++) {
      const degGrow = (deg * i) / frameCount / 100;
      [this.angles.angleS, this.angles.angleE] = [
        sector.angles.angleS + degGrow,
        sector.angles.angleE + degGrow,
      ];
    }
  }

  draw(context: CanvasRenderingContext2D, ratio: number) {
    // draw sectors
    const { angleS, angleE } = this.angles;
    const cardsSrc = this.cardsSrc;

    const { x, y, inner, outer, radius } = this.startCondition;

    const radiusOuter = radius * (1 - outer / 100);
    const radiusGroup = radius * (1 - outer / 2 / 100);
    const radiusInner = radius * (1 - (outer + inner) / 100);
    const radiusIcons = radius * (1 - (outer + inner / 2) / 100);
    const innerOuterRadiusesDiff = radiusOuter - radiusInner;

    const radiusStartX = x + radius * Math.cos(angleS);
    const radiusStartY = y + radius * Math.sin(angleS);
    const radiusOuterEndX = x + radius * Math.cos(angleE) * (1 - outer / 100);
    const radiusOuterEndY = y + radius * Math.sin(angleE) * (1 - outer / 100);

    context.beginPath();
    context.fillStyle = this.colors[3];
    context.strokeStyle = this.colors[1];
    context.moveTo(radiusStartX, radiusStartY);
    context.arc(x, y, radius, angleS, angleE);
    context.lineTo(radiusOuterEndX, radiusOuterEndY);
    context.arc(x, y, radiusOuter, angleE, angleS, true);
    context.lineTo(radiusStartX, radiusStartY);
    context.fill();
    context.stroke();

    context.beginPath();
    context.fillStyle = this.colors[2];
    context.moveTo(radiusStartX, radiusStartY);
    context.arc(x, y, radiusOuter, angleS, angleE);
    context.lineTo(radiusOuterEndX, radiusOuterEndY);
    context.arc(x, y, radiusInner, angleE, angleS, true);
    context.lineTo(radiusStartX, radiusStartY);

    context.fill();
    context.stroke();

    const dependData: dependDataInt = {
      coords: { x, y },
      ratio,
      angles: { angleS, angleE },
      radiusGroup,
      radiusIcons,
      cardsSrc,
      innerOuterRadiusesDiff,
    };

    this.drawTextAround(context, dependData);
    this.drawIcons(context, dependData);
  }

  private drawTextAround(
    context: CanvasRenderingContext2D,
    dependData: dependDataInt
  ) {
    const {
      coords: { x, y },
      ratio,
      angles: { angleS, angleE },
      radiusGroup,
      cardsSrc,
    } = dependData;
    context.fillStyle = this.colors[0];
    context.font = `${0.75 * ratio}rem Arial monospace`;
    context.textBaseline = "middle";
    context.textAlign = "center";

    const textArr = cardsSrc.group.split("");
    const angleMid = (angleS + angleE) / 2;
    for (let k = 0; k < textArr.length; k++) {
      const angleL = lerp(angleS, angleE, (k + 1) / (textArr.length + 1));
      const xLerp = x + radiusGroup * Math.cos(angleL);
      const yLerp = y + radiusGroup * Math.sin(angleL);

      if (
        angleMid % (Math.PI * 2) >= 0 &&
        angleMid % (Math.PI * 2) <= Math.PI
      ) {
        context.fillText(textArr[textArr.length - k - 1], xLerp, yLerp);
        // Reset transformation matrix to the identity matrix
        context.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        context.fillText(textArr[k], xLerp, yLerp);
      }
    }
  }

  private drawIcons(
    context: CanvasRenderingContext2D,
    dependData: dependDataInt
  ) {
    const {
      coords: { x, y },
      ratio,
      angles: { angleS, angleE },
      radiusIcons,
      cardsSrc,
      innerOuterRadiusesDiff,
    } = dependData;

    const icons = cardsSrc.lines.length;

    for (let i = 1; i <= icons; i++) {
      const angDDD = lerp(angleS, angleE, i / (icons + 1));
      const [iconXCenter, iconYCenter] = [
        x + Math.cos(angDDD) * radiusIcons,
        y + Math.sin(angDDD) * radiusIcons,
      ];

      context.fillStyle = this.colors[0];
      const sizeXY = cardsSrc.lines[i - 1].viewBox.split(" ");
      const [sizeX, sizeY] = [
        Number(sizeXY[2]) - Number(sizeXY[0]),
        Number(sizeXY[3]) - Number(sizeXY[1]),
      ];

      const size = (Math.max(sizeX, sizeY) / innerOuterRadiusesDiff) * 3;

      const halfIconWidth = sizeX / size / 2;
      const halfIconHeight = sizeY / size / 2;

      const p1 = new Path2D(cardsSrc.lines[i - 1].detail[0].path);
      const m = new DOMMatrix();
      const [iconX, iconY] = [
        iconXCenter - halfIconWidth,
        iconYCenter - halfIconHeight,
      ];

      let coof = 1;
      if (
        iconXCenter + halfIconWidth >= context.canvas.width / 2 &&
        iconXCenter - halfIconWidth <= context.canvas.width / 2 &&
        iconYCenter <= context.canvas.height / 4
      ) {
        coof = coof * 1.1;
        this.drawTextAndIconInCenter(
          context,
          m,
          p1,
          cardsSrc.lines[i - 1].text,
          {
            x,
            y,
            halfIconWidth,
            halfIconHeight,
            size,
          },
          ratio
        );
      } else {
        coof = 1;
      }

      const p = new Path2D();
      const t = m
        .scale((1 / size) * coof)
        .translate((iconX * size) / coof, (iconY * size) / coof);

      p.addPath(p1, t);
      context.stroke(p);
      context.fill(p);

      this.drawTextAboveIcon(context, cardsSrc.lines[i - 1].text, ratio, {
        iconXCenter,
        iconYCenter,
        iconHeight: halfIconHeight * 2,
      });
    }
  }

  private drawTextAboveIcon(
    context: CanvasRenderingContext2D,
    textArr: string[],
    ratio: number,
    iconCoords: { iconXCenter: number; iconYCenter: number; iconHeight: number }
  ) {
    const lineN = textArr.length;
    context.font = `${0.6 * ratio}rem Arial`;
    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let j = 0; j < lineN; j++) {
      context.fillText(
        textArr[j],
        iconCoords.iconXCenter,
        iconCoords.iconYCenter -
          iconCoords.iconHeight /
            ((j * (lineN === 1 ? 1 : 0.5) + 1) * (lineN === 1 ? 1.4 : 1))
      );
    }
  }

  private drawTextAndIconInCenter(
    context: CanvasRenderingContext2D,
    m: DOMMatrix,
    p1: Path2D,
    textArr: string[],
    iconSizesAndCoords: iconSizesAndCoordsInt,
    ratio: number
  ) {
    const { x, y, halfIconWidth, halfIconHeight, size } = iconSizesAndCoords;
    const pBig = new Path2D();
    const tBig = m
      .scale(1 / size)
      .translate((x - halfIconWidth) * size, (y - halfIconHeight * 2) * size);
    pBig.addPath(p1, tBig);
    context.stroke(pBig);
    context.fill(pBig);
    const lineN = textArr.length;
    for (let j = 0; j < lineN; j++) {
      context.font = `${2 * ratio}rem Arial monospace`;
      context.fillText(
        textArr[j],
        x,
        y +
          halfIconHeight *
            2 *
            ((j * (lineN === 1 ? ratio * 0.5 : ratio) + 1) *
              (lineN === 1 ? 0.8 : 0.6))
      );
    }
  }
}
