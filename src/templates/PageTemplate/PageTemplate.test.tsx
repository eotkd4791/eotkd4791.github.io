import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";

import PageTemplate from "./PageTemplate";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("PageTemplate", () => {
  const props = {
    data: {
      markdownRemark: mocks.markdownRemark,
    },
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<PageTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
