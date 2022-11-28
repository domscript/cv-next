import { useCallback, useState, useMemo } from "react";
import styles from "@/styles/Home.module.css";
import Canvas from "@/components/Canvas";
import { header } from "@/utils/header";
import { ButtonMainClass } from "@/utils/buttonMainClass";
import { Button } from "@/utils/button";
import { Me } from "@/utils/me";
import { squareRobotNew } from "@/utils/squareRobot";

import { JavaScript, TypeScript, git, lang } from "@/utils/pathsSVG";

import { me, plant, belongings, room } from "@/utils/pathsSVG";

export default function RoomComponent(): JSX.Element {
  const roomSVG = useMemo(() => {
    return [room, me, plant, belongings];
  }, []);
  const dataMain = useMemo(() => {
    return [lang, JavaScript, git, TypeScript];
  }, []);
  // const positionAndSize = {
  //   x01: 200 + (170 * ratio * frameCount) / 100,
  //   y01: 380 * ratio,
  //   scale: 0.2, // 1 === 100%
  // };
  const positionAndSizeRobot = {
    x01: 100,
    y01: 380,
    scale: 0.2, // 1 === 100%
  };
  const positionAndSizeRoom = {
    x01: 0,
    y01: 0,
    scale: 1, // 1 === 100%
  };

  const draw0 = header.bind(roomSVG, positionAndSizeRoom);
  const draw1 = squareRobotNew.bind(positionAndSizeRobot);
  return (
    <section className={styles.card} key="room">
      <Canvas width={500} height={500} className="header" draw={[draw0, draw1]}>
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
