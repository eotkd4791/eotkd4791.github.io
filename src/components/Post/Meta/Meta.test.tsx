import React from "react";
import renderer from "react-test-renderer";

import { Meta } from "@/components/Post/Meta";
import * as mocks from "@/mocks";

describe("Meta", () => {
  it("renders correctly", () => {
    const props = {
      date: mocks.markdownRemark.frontmatter.date,
    };

    const tree = renderer.create(<Meta {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
