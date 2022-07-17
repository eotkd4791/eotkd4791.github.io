import React from "react";
import renderer from "react-test-renderer";

import { Menu } from "@/components/Sidebar/Menu";
import * as mocks from "@/mocks";

describe("Menu", () => {
  it("renders correctly", () => {
    const props = { menu: mocks.menu };
    const tree = renderer.create(<Menu {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
