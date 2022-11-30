import { useCallback, useMemo } from "react";
import styles from "@/styles/Home.module.css";
import Canvas from "@/components/Canvas";
import sort from "@/utils/sort/sort";

import {
  html5,
  JavaScript,
  TypeScript,
  SaSS,
  Webpack,
  NodeJS,
  Css,
  python,
  Clang,
  TailwindCSS,
  vsCode,
  PostCSS,
  git,
  English,
  Espanol,
  Deutsch,
  lang,
  WebpackButton,
  TypeScriptButton,
} from "@/utils/pathsSVG";

export default function SortComponent(): JSX.Element {
  const listItems = useMemo(() => {
    return [
      html5,
      SaSS,
      PostCSS,
      Clang,
      python,
      Css,
      TypeScript,
      JavaScript,
      Webpack,
      NodeJS,
      TailwindCSS,
      vsCode,
      git,
      English,
      Espanol,
      Deutsch,
      TypeScriptButton,
      WebpackButton,
      lang,
    ];
  }, []);
  const dataMain = useMemo(() => {
    return [TypeScriptButton, WebpackButton, lang];
  }, []);

  const draw01 = sort.bind(listItems);
  const draw0 = useCallback(draw01, [draw01]);

  return (
    <section className={styles.card} key="sort">
      <Canvas width={500} height={500} className="sort" draw={[draw0]}>
        <section className="myButtons">
          <button className="btn" type="button" data-sort="bubble">
            BS
          </button>
          <button className="btn" type="button" data-sort="bubbleBack">
            BSB
          </button>
          <button className="btn" type="button" data-sort="selection">
            SS
          </button>
          <button className="btn" type="button" data-sort="selectionBack">
            SSB
          </button>
          <button className="btn" type="button" data-sort="insertion">
            IS
          </button>
        </section>
        <section className="sortButtons">
          {dataMain.map((el) => {
            const text = el.title.toLowerCase();
            // const group = el.group.toLowerCase();
            return (
              <button key={text} className="btn" type="button" data-sort={text}>
                {text}
              </button>
            );
          })}
        </section>
      </Canvas>
    </section>
  );
}
