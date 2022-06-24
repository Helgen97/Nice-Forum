import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MetaImage from "../../../img/MetaImage.png";

const MetaTags = ({ title, description, keywords, noRobots }) => {
  const MetaImgURL = "https://" + window.location.host;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        {noRobots ? <meta name="robots" content="noindex"/> : <meta name="robots" content="index,follow" />}
        <meta name="description" content={description} />
        <meta name=" keywords" content={keywords} />
        <link rel="canonical" href={window.location.href}/>

        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={MetaImgURL + MetaImage} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={MetaImgURL + MetaImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={MetaImgURL + MetaImage} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaTags;
