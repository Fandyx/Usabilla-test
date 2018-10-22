import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Filters from "../DashboardPage/components/Filters";
import DashboardPage from "../DashboardPage/index";

describe("DashboardPage", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const initialState = {
    reviews: {
      list: [],
      isLoading: false,
      count: 0
    }
  };
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);

    wrapper = shallow(
      <DashboardPage
        store={store}
        reviews={initialState.reviews}
        actions={{ fetchReviews: jest.fn() }}
      />
    );
  });
  it("always renders a div", () => {
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

  it("always renders a `Filters`", () => {
    expect(wrapper.find(Filters).length).toBe(1);
  });

  it("should set searchText", () => {
    expect(wrapper.instance().state.searchText).toBe("");
    wrapper.instance().setSearchText("dummy-text");
    expect(wrapper.instance().state.searchText).toBe("dummy-text");
  });

  it("should set Ratings", () => {
    expect(wrapper.instance().state.ratings).toEqual([1, 2, 3, 4, 5]);
    wrapper.instance().setRatings([2, 3]);
    expect(wrapper.instance().state.ratings).toEqual([2, 3]);
  });
});
