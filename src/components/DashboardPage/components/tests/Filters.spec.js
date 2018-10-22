import React from "react";
import { shallow } from "enzyme";
import Filters from "../Filters";

describe("Filters", () => {
  let wrapper;
  const setRatings = jest.fn();
  const setSearchText = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Filters setRatings={setRatings} setSearchText={setSearchText} />
    );
  });
  it("always renders a ul", () => {
    const divs = wrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("contains everything else that gets rendered", () => {
    const divs = wrapper.find("div");

    const wrappingDiv = divs.first();
    const wrappingDivChildren = wrappingDiv.children();
    const dashboardPageChildren = wrapper.children();

    expect(dashboardPageChildren).toEqual(wrappingDivChildren);
  });
  it("should handle click events", () => {
    wrapper
      .find(".ratings")
      .first()
      .simulate("click");
    expect(wrapper.instance().state.ratings).toEqual([2, 3, 4, 5]);
    wrapper
      .find(".ratings")
      .first()
      .simulate("click");
    expect(wrapper.instance().state.ratings).toEqual([2, 3, 4, 5, 1]);
    const event = {
      preventDefault() {},
      target: { value: "the-value" }
    };
    wrapper
      .find("input")
      .first()
      .simulate("change", event);

    expect(wrapper.instance().state.searchText).toEqual("the-value");
  });
});
