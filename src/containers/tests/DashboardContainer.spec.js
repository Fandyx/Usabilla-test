import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import { DashboardContainer } from "../DashboardContainer";
import DashboardPage from "../../components/DashboardPage/index";

describe("<DashboardContainer />", () => {
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
      <DashboardContainer
        store={store}
        reviews={initialState.reviews}
        actions={{ fetchReviews: jest.fn() }}
      />
    );
  });

  it("should contain <DashboardPage />", () => {
    expect(wrapper.find(DashboardPage).length).toEqual(1);
  });

  it("should match snapshot", () => {
    const component = create(
      <Provider store={store}>
        <DashboardContainer
          reviews={initialState.reviews}
          actions={{ fetchReviews: jest.fn() }}
        />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
