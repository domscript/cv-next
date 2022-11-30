import { cardsSrcInt, startConditionInt } from "./wheelInterfaces";

export function defineAngles(
  cardsSrc: cardsSrcInt[],
  startCondition: startConditionInt
): number[] {
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
