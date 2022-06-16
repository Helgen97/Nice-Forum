import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MetaImage from "../../../img/MetaImage.png";

const MetaTags = ({ title, description, keywords }) => {
  const MetaImgURL = "http://" + window.location.host;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name=" keywords" content={keywords} />

        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={MetaImgURL + MetaImage} />

        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={MetaImgURL + MetaImage} />

        <meta name="twitter:card" content="nice-forum_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={MetaImgURL + MetaImage} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaTags;
