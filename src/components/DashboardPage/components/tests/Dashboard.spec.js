import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Dashboard from "../Dashboard";
import records from "./records";
import TablePlaceholder from "../TablePlaceholder";
describe("Dashboard", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const initialState = {
    reviews: {
      list: records,
      isLoading: false,
      count: 0
    }
  };
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Dashboard
        store={store}
        searchText={""}
        ratings={[1, 2, 3, 4, 5]}
        reviews={initialState.reviews}
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

  it("should toggle Details", () => {
    expect(wrapper.instance().state.detailsShowIndexList).toEqual([]);
    wrapper.instance().toggleDetails(1);
    expect(wrapper.instance().state.detailsShowIndexList).toEqual([1]);
    wrapper.instance().toggleDetails(1);
    expect(wrapper.instance().state.detailsShowIndexList).toEqual([]);
  });
  it("should set page", () => {
    expect(wrapper.instance().state.page).toEqual(1);
    wrapper.instance().setPage(2);
    expect(wrapper.instance().state.page).toEqual(2);
  });
  it("should handle click events", () => {
    wrapper
      .find(".details")
      .first()
      .simulate("click");

    expect(wrapper.instance().state.detailsShowIndexList).toEqual([0]);
    wrapper
      .find(".details")
      .first()
      .simulate("click");
    expect(wrapper.instance().state.detailsShowIndexList).toEqual([]);
  });
  it("should show a placeholder", () => {
    const loadingState = {
      reviews: {
        list: [],
        isLoading: true,
        count: 0
      }
    };
    store = mockStore(loadingState);
    wrapper = shallow(
      <Dashboard
        store={store}
        searchText={""}
        ratings={[1, 2, 3, 4, 5]}
        reviews={loadingState.reviews}
      />
    );
    expect(wrapper.find(TablePlaceholder).length).toEqual(1);
  });
});
