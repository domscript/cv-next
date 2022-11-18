import { useCallback, useState, useMemo } from "react";
import Head from "next/head";
import BaseHead from "../components/BaseHead";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Canvas from "../components/Canvas";
import CanvasWheel from "../components/CanvasWheel";
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
  lang,
  English,
  Espanol,
  Deutsch,
  CardHeart,
  CardClub,
} from "../utils/pathsSVG";
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
  wheell,
  sorrt,
} from "../utils/pathsSVG";
import { me, plant, belongings } from "../utils/pathsSVG";

interface HomeInt {
  title: string;
  keywords: string;
  description: string;
  siteName: string;
  siteUrl: string;
  children: React.ReactNode;
}

export default function Home({
  title,
  keywords,
  description,
  siteName,
  siteUrl,
  children,
}: HomeInt): JSX.Element {
  const [buttonClicked1, setButtonClicked1] = useState("lang"); // tool

  const dataSVGlang = [
    html5,
    SaSS,
    PostCSS,
    Clang,
    python,
    Css,
    TypeScript,
    JavaScript,
  ];
  const dataSVGtool = [Webpack, NodeJS, TailwindCSS, vsCode, git];
  const dataSVGlangSpeak = [English, Espanol, Deutsch];

  const roomSVG = [me, plant, belongings];
  const dataMain = [lang, JavaScript, git, TypeScript];

  const buttonDataHandler = useCallback((buttonClick: string): void => {
    setButtonClicked1(buttonClick);
  }, []);

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

  const sort = (
    <li className={styles.card}>
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
    </li>
  );
  const wheelCanvas = (
    <li className={styles.card}>
      <CanvasWheel
        width={500}
        height={500}
        className="wheel"
        data={listItems}
        onChangeData={buttonDataHandler}
      >
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
    </li>
  );
  const header = (
    <li className={styles.card}>
      <Canvas
        width={500}
        height={500}
        className="header"
        data={[...dataMain, ...roomSVG, CardHeart]}
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
        <section className="homeButtons">
          <Link href="/blog" className="btn" type="button" data-page="page">
            BLOG
          </Link>
        </section>
      </Canvas>
    </li>
  );
  return (
    <>
      <Head>
        <BaseHead
          title={title}
          keywords={keywords}
          description={description}
          siteName={siteName}
          siteUrl={siteUrl}
        />
      </Head>
      <Header className={styles.header} />
      <main className={styles.main}>
        <ul className={styles.grid}>
          {header}
          {sort}
          {wheelCanvas}
        </ul>
      </main>
      <Footer className={styles.footer} />
    </>
  );
}

Home.defaultProps = {
  title: "Domscript",
  keywords: "game",
  description: "front end developer",
  siteName: "domscript",
  siteUrl: "https://domscript-demo.netlify.app/",
};
