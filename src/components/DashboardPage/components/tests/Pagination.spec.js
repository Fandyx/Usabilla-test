import React from "react";
import { shallow } from "enzyme";
import Pagination from "../Pagination";

describe("Pagination", () => {
  let wrapper;
  const setPage = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <Pagination
        page={1}
        list={Array.from(Array(20).keys())}
        setPage={setPage}
      />
    );
  });
  it("always renders a ul", () => {
    const uls = wrapper.find("ul");
    expect(uls.length).toBeGreaterThan(0);
  });

  it("contains everything else that gets rendered", () => {
    const uls = wrapper.find("ul");

    const wrappingDiv = uls.first();
    const wrappingDivChildren = wrappingDiv.children();
    const dashboardPageChildren = wrapper.children();

    expect(dashboardPageChildren).toEqual(wrappingDivChildren);
  });
  it("should handle click events", () => {
    wrapper
      .find("span")
      .first()
      .simulate("click");
    expect(setPage).toHaveBeenCalledWith(0);
    wrapper
      .find("span")
      .at(1)
      .simulate("click");
    expect(setPage).toHaveBeenCalledWith(1);
    wrapper
      .find("span")
      .last()
      .simulate("click");
    expect(setPage).toHaveBeenLastCalledWith(2);
  });
  it("should handle class name changes", () => {
    expect(
      wrapper
        .find("span")
        .first()
        .hasClass("disabled")
    ).toEqual(true);
    wrapper = shallow(
      <Pagination
        page={2}
        list={Array.from(Array(20).keys())}
        setPage={setPage}
      />
    );
    expect(
      wrapper
        .find("span")
        .first()
        .hasClass("disabled")
    ).toEqual(false);
    expect(
      wrapper
        .find("span")
        .at(2)
        .hasClass("active")
    ).toEqual(true);
  });
});
