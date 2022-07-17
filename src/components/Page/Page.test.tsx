import React from "react";
import renderer from "react-test-renderer";

import { Page } from "@/components/Page";
import * as mocks from "@/mocks";

describe("Page", () => {
  it("renders correctly", () => {
    const props = {
      children: mocks.markdownRemark.html,
      title: mocks.markdownRemark.frontmatter.title,
    };

    const tree = renderer
      .create(<Page {...props}>{props.children}</Page>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
