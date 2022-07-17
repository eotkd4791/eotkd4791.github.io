import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";

import { Layout } from "@/components/Layout";
import * as mocks from "@/mocks";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("Layout", () => {
  const props = {
    ...mocks.siteMetadata,
    title: mocks.siteMetadata.site.siteMetadata.title,
    description: mocks.siteMetadata.site.siteMetadata.subtitle,
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Layout {...props}>test</Layout>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
