import DataSVG from "../pathsSVG";
import { cardsSrcInt } from "./wheelInterfaces";

export function transformData(data: DataSVG[]): cardsSrcInt[] {
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
  return [...cardsSrc];
}
