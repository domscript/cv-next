import Head from "next/head";
import BaseHead from "@/components/BaseHead";
import Header from "@/components/Header";
import MainFirstPage from "@/components/MainFirstPage";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

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
      <MainFirstPage className={styles.main} />
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
