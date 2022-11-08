import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Canvas from "../components/Canvas";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <ul className={styles.grid}>
          <li className={styles.card}>
            <p>Learn!</p>
          </li>

          <li className={styles.card}>
            <p>Discover.</p>
          </li>

          <li className={styles.card}>
            <p>Instantly.</p>
          </li>
          <li className={styles.card}>
            <Canvas width="300" height="300">
              <section className="myButtons">
                <button className="btn" type="button" data-sort="bubble">
                  Bubble Sort
                </button>
                <button className="btn" type="button" data-sort="bubbleBack">
                  Bubble Sort Back
                </button>
                <button className="btn" type="button" data-sort="selection">
                  Selection Sort
                </button>
                <button className="btn" type="button" data-sort="selectionBack">
                  Selection Sort Back
                </button>
                <button className="btn" type="button" data-sort="insertion">
                  Insertion Sort
                </button>
              </section>
              {/* <section className="myRange">
                <ul>
                  <li>
                    <label htmlFor="speed">Speed</label>
                    <br />
                    <input
                      type="range"
                      name="speed"
                      id="speed"
                      defaultValue="3"
                      min="1"
                      max="5"
                      // onChange={setSpeed()}
                    />
                  </li>
                  <li>
                    <label htmlFor="amount">Amount</label>
                    <br />
                    <input
                      type="range"
                      name="amount"
                      id="amount"
                      defaultValue="15"
                      min="3"
                      max="100"
                      // onChange="setAmount()"
                    />
                  </li>
                </ul>
              </section> */}
            </Canvas>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
