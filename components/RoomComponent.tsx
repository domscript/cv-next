import { useCallback, useState, useMemo } from "react";
import styles from "@/styles/Home.module.css";
import Canvas from "@/components/Canvas";
import { JavaScript, TypeScript, git, lang } from "@/utils/pathsSVG";

import { me, plant, belongings, room } from "@/utils/pathsSVG";

export default function RoomComponent(): JSX.Element {
  const [buttonClicked1, setButtonClicked1] = useState("lang"); // tool

  const buttonDataHandler = useCallback((buttonClick: string): void => {
    setButtonClicked1(buttonClick);
  }, []);
  const roomSVG = useMemo(() => {
    return [room, me, plant, belongings];
  }, []);
  const dataMain = useMemo(() => {
    return [lang, JavaScript, git, TypeScript];
  }, []);

  return (
    <section className={styles.card} key="room">
      <Canvas
        width={500}
        height={500}
        className="header"
        data={[...dataMain, ...roomSVG]}
        onChangeData={buttonDataHandler}
      >
        <section className="myButtons">
          {dataMain.map((el) => {
            const text = el.title.toLowerCase();
            const group = el.group.toLowerCase();
            return (
              <button
                key={text}
                className="btn"
                type="button"
                data-sort={group}
              >
                {text}
              </button>
            );
          })}
        </section>
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
