import React from "react";
import renderer from "react-test-renderer";

import { Copyright } from "@/components/Sidebar/Copyright";
import * as mocks from "@/mocks";

describe("Copyright", () => {
  it("renders correctly", () => {
    const props = { copyright: mocks.siteMetadata.site.siteMetadata.copyright };
    const tree = renderer.create(<Copyright {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
