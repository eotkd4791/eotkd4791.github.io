import { CreatePagesArgs } from "gatsby";

import * as types from "../types";

export interface PostsQueryResult {
  allMarkdownRemark: {
    edges?: Array<types.Edge>;
  };
}

const postsQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<PostsQueryResult>(`
    {
      allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return result?.data?.allMarkdownRemark;
};

export default postsQuery;
