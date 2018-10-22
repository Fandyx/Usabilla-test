import React from "react";
import { shallow } from "enzyme";
import TablePlaceholder from "../TablePlaceholder";

describe("TablePlaceholder", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TablePlaceholder />);
  });
  it("always renders a ul", () => {
    const trs = wrapper.find("tr");
    expect(trs.length).toBeGreaterThan(0);
  });

  it("should contains a ContentLoader", () => {
    const trs = wrapper.find("ContentLoader");
    expect(trs.length).toBeGreaterThan(1);
  });
});
