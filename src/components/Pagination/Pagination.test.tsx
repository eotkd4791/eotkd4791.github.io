import React from "react";
import renderer from "react-test-renderer";

import { Pagination } from "@/components/Pagination";
import * as mocks from "@/mocks";

describe("Pagination", () => {
  it("renders correctly", () => {
    const props = { ...mocks.pageContext.pagination };
    const tree = renderer.create(<Pagination {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
