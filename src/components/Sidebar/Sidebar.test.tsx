import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery, useStaticQuery } from "gatsby";

import { Sidebar } from "@/components/Sidebar";
import * as mocks from "@/mocks";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("Sidebar", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  it("renders correctly", () => {
    const props = { isIndex: true };
    const tree = renderer.create(<Sidebar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
