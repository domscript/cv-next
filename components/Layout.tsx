import Head from "next/head";
import BaseHead from "./BaseHead";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";

interface LayoutInt {
  title: string;
  keywords: string;
  description: string;
  siteName: string;
  siteUrl: string;
  children: React.ReactNode;
}

export default function Layout({
  title,
  keywords,
  description,
  siteName,
  siteUrl,
  children,
}: LayoutInt): JSX.Element {
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
      <Header className={""} />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
      <Footer className={""} />
    </>
  );
}

Layout.defaultProps = {
  title: "Domscript",
  keywords: "game",
  description: "front end developer",
  siteName: "domscript",
  siteUrl: "https://domscript-demo.netlify.app/",
};
