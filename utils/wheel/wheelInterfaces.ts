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

export interface startConditionInt {
  x: number;
  y: number;
  radius: number;
  margin: number;
  angleStart: number;
  inner: number;
  outer: number;
}

export interface anglesInt {
  angleS: number;
  angleE: number;
}

export interface dependDataInt {
  coords: { x: number; y: number };
  ratio: number;
  angles: { angleS: number; angleE: number };
  radiusGroup: number;
  radiusIcons: number;
  cardsSrc: cardsSrcInt;
  innerOuterRadiusesDiff: number;
}

export interface iconSizesAndCoordsInt {
  x: number;
  y: number;
  halfIconWidth: number;
  halfIconHeight: number;
  size: number;
}
