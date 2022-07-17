import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";

import { Comments } from "@/components/Post/Comments";
import * as mocks from "@/mocks";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("Comments", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );

    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  it("renders correctly", () => {
    const props = {
      postTitle: mocks.markdownRemark.frontmatter.title,
      postSlug: mocks.markdownRemark.fields.slug,
    };

    const tree = renderer.create(<Comments {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
