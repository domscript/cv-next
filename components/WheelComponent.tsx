import { useCallback, useMemo } from "react";
import styles from "@/styles/Home.module.css";
import CanvasWheel from "@/components/CanvasWheel";
import { wheel } from "@/utils/wheel";

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
} from "@/utils/pathsSVG";

export default function WheelComponent(): JSX.Element {
  const listItems = useMemo(() => {
    return [
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
    ];
  }, []);

  const draw01 = wheel.bind(listItems);
  const draw0 = useCallback(draw01, [draw01]);

  return (
    <section className={styles.card} key="wheel">
      <CanvasWheel width={500} height={500} className="wheel" draw={[draw0]}>
        <section className="myButtons">
          {listItems.map((el) => {
            const text = el.title.toLowerCase();
            return (
              <button key={text} className="btn" type="button" data-sort={text}>
                {text}
              </button>
            );
          })}
        </section>
      </CanvasWheel>
    </section>
  );
}
