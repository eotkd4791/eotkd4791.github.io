import React from "react";
import renderer from "react-test-renderer";

import { Contacts } from "@/components/Sidebar/Contacts";
import * as mocks from "@/mocks";

describe("Contacts", () => {
  it("renders correctly", () => {
    const props = { contacts: mocks.contacts };
    const tree = renderer.create(<Contacts {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
