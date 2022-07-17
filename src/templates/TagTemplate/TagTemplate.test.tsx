import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";

import TagTemplate from "./TagTemplate";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("TagTemplate", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  it("renders correctly", () => {
    const props = {
      data: {
        allMarkdownRemark: mocks.allMarkdownRemark,
      },
      pageContext: mocks.pageContext,
    };

    const tree = renderer.create(<TagTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
