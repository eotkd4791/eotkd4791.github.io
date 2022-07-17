import React from "react";
import renderer from "react-test-renderer";

import { StaticQuery } from "gatsby";

import { Author } from "@/components/Sidebar/Author";
import * as mocks from "@/mocks";

const mockedStaticQuery = StaticQuery as jest.Mock;

describe("Author", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(() => null);
  });

  it("renders correctly", () => {
    const props = { isIndex: false, author: mocks.author };
    const tree = renderer.create(<Author {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
