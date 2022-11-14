export interface Props {
  title: string;
  keywords: string;
  description: string;
  siteName: string;
  siteUrl: string;
  image?: string;
}

export default function BaseHead({
  title,
  keywords,
  description,
  siteName,
  siteUrl,
  image = "/favicon.ico",
}: Props) {
  return (
    <>
      {/* Global Metadata  */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />{" "}
      <meta httpEquiv="Content-Language" content="en-US" />
      <link rel="icon" href="/favicon.ico" sizes="any" type="image/svg+xml" />
      <meta name="revisit-after" content="30 days" />
      <meta name="author" content="Domscript" />
      {/* <meta name="generator" content={generator} /> */}
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="news_keywords" content={keywords} />
      <meta name="next-head-count" content="8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="google" content="notranslate" />
      <link rel="canonical" href={siteUrl} />
      {/* Primary Meta Tags  */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {/* Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={new URL(image, siteUrl).toString()} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={new URL(image, siteUrl).toString()}
      />
    </>
  );
}
