import React from "react";
import renderer from "react-test-renderer";

import { Icon } from "@/components/Icon";
import { ICONS } from "@/constants";
import { getIcon } from "@/utils";

describe("Icon", () => {
  it("renders correctly", () => {
    const [twitter] = Object.keys(ICONS) as Array<keyof typeof ICONS>;
    const props = { name: twitter, icon: getIcon(twitter) };
    const tree = renderer.create(<Icon {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
