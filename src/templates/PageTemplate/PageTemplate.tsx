import React from "react";

import { graphql } from "gatsby";

import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";

interface Props {
  data: {
    markdownRemark: Node;
  };
}

const PageTemplate: React.FC<Props> = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: body } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title, description = "", socialImage } = frontmatter;
  const metaDescription = description || siteSubtitle;

  return (
    <Layout
      title={`${title} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <Sidebar />
      <Page title={title}>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`;

export default PageTemplate;
