import React from "react";

import { graphql } from "gatsby";

import { Layout } from "@/components/Layout";
import { Post } from "@/components/Post";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";

interface Props {
  data: {
    markdownRemark: Node;
  };
}

const PostTemplate: React.FC<Props> = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const { title, description = "", socialImage } = frontmatter;
  const metaDescription = description || siteSubtitle;

  return (
    <Layout
      title={`${title} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <Post post={data.markdownRemark} />
    </Layout>
  );
};

export const query = graphql`
  query PostTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage
      }
    }
  }
`;

export default PostTemplate;
