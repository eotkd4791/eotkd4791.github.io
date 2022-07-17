import React from "react";
import renderer from "react-test-renderer";

import { Feed } from "@/components/Feed";
import * as mocks from "@/mocks";

describe("Feed", () => {
  it("renders correctly", () => {
    const props = { edges: mocks.edges };
    const tree = renderer.create(<Feed {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
