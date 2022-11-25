import { useCallback, useState, useMemo } from "react";
import styles from "@/styles/Home.module.css";
import Canvas from "@/components/Canvas";
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
} from "@/utils/pathsSVG";

export default function SortComponent(): JSX.Element {
  const [buttonClicked1, setButtonClicked1] = useState("lang"); // tool
  const dataSVGlang = useMemo(() => {
    return [html5, SaSS, PostCSS, Clang, python, Css, TypeScript, JavaScript];
  }, []);

  const dataSVGtool = useMemo(() => {
    return [Webpack, NodeJS, TailwindCSS, vsCode, git];
  }, []);
  const dataSVGlangSpeak = useMemo(() => {
    return [English, Espanol, Deutsch];
  }, []);

  const buttonDataHandler = useCallback((buttonClick: string): void => {
    setButtonClicked1(buttonClick);
  }, []);

  return (
    <section className={styles.card} key="sort">
      <Canvas
        width={500}
        height={500}
        className="sort"
        data={
          buttonClicked1 === "lang"
            ? dataSVGlang
            : buttonClicked1 === "tool"
            ? dataSVGtool
            : dataSVGlangSpeak
        }
        onChangeData={buttonDataHandler}
      >
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
      </Canvas>
    </section>
  );
}
