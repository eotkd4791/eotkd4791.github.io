import React from "react";
import Helmet from "react-helmet";

import { useSiteMetadata } from "@/hooks";

import * as styles from "./Layout.module.scss";

interface Props {
  title: string;
  description?: string;
  socialImage?: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  socialImage = "",
}: Props) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage || author.photo;
  const metaImageUrl = url + metaImage;

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImageUrl} />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
