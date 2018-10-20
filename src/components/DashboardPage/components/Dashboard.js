import React from "react";
import PropTypes from "prop-types";
import memoize from "memoize-one";
import styles from "../styles/styles";
import TablePlaceholder from "./TablePlaceholder";
import Pagination from "./Pagination";

export class Dashboard extends React.Component {
  state = {
    page: 1,
    filteredList: [],
    detailsShowIndexList: []
  };
  filter = memoize((list, searchText, ratings) => {
    return list.filter(
      item => item.comment.includes(searchText) && ratings.includes(item.rating)
    );
  });
  static getDerivedStateFromProps(props, state) {
    if (
      props.searchText !== state.prevSearchText ||
      props.ratings !== state.prevRatings
    ) {
      return {
        prevSearchText: props.searchText,
        prevRatings: props.ratings,
        page: 1
      };
    }
    return null;
  }
  renderHeader = () => {
    const headerList = [
      "Rating",
      "Comment",
      "Browser",
      "Device",
      "Platform",
      "Details"
    ];
    return headerList.map((item, index) => (
      <th
        key={index}
        style={styles.headerItemStyle}
        className={`${index !== 1 ? "center" : ""}${
          index === 1 ? "padding-comment" : ""
        }`}
      >
        {item}
      </th>
    ));
  };
  toggleDetails = index => {
    const { detailsShowIndexList } = this.state;
    if (!detailsShowIndexList.includes(index)) {
      this.setState({ detailsShowIndexList: [...detailsShowIndexList, index] });
    } else {
      const newDetailsShowIndexList = [...detailsShowIndexList];
      var itemIndex = newDetailsShowIndexList.indexOf(index);
      newDetailsShowIndexList.splice(itemIndex, 1);
      this.setState({ detailsShowIndexList: newDetailsShowIndexList });
    }
  };
  renderElementDetails = (item, index, isDetailsShow) => {
    const {
      custom: { subject },
      computed_location,
      geo: { country, city },
      email,
      url
    } = item;
    return (
      <td colSpan={6} id={`details-${index}`} className="responsive-details">
        {isDetailsShow && (
          <div style={styles.detailsContainer}>
            <div className="left">
              <p>
                <span className="label">Subject:</span> {subject}
              </p>
              <p>
                <span className="label">Location:</span> {city},{" "}
                {computed_location}{" "}
                <img
                  src={`https://www.countryflags.io/${country}/shiny/24.png`}
                />
              </p>
            </div>
            <div className="right">
              <p>
                <span className="label">Email:</span> {email || "--"}
              </p>
              <p>
                <span className="label">Url:</span> {url}
              </p>
            </div>
          </div>
        )}
      </td>
    );
  };
  renderTableElement = (item, index, isDetailsShow) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      item.userAgent
    );
    const {
      rating,
      comment,
      computed_browser: { Browser, Version, Platform }
    } = item;
    return (
      <React.Fragment>
        <tr key={index} className="table-row">
          <td className="padding-row center rating">
            <div
              style={styles.ratingStyle}
              className="ratings active no-cursor"
            >
              {rating}
            </div>
          </td>
          {comment ? <td className="padding-comment">{comment}</td> : <td />}
          <td className="center browser">
            {Browser}
            <br />
            {Version}
          </td>
          <td className="center device">{isMobile ? "Mobile" : "Desktop"}</td>
          <td className="center platform">{Platform}</td>
          <td
            className="center details"
            onClick={() => this.toggleDetails(index)}
          >
            {isDetailsShow ? (
              <span className="glyphicon glyphicon-menu-up" />
            ) : (
              <span className="glyphicon glyphicon-menu-down" />
            )}
          </td>
        </tr>
        <tr>{this.renderElementDetails(item, index, isDetailsShow)}</tr>
      </React.Fragment>
    );
  };
  renderBody = filteredList => {
    const { reviews } = this.props;
    if (reviews.isLoading || true) {
      return <TablePlaceholder />;
    }
    if (filteredList.length === 0) {
      return (
        <tr>
          <td className="no-data">No data to match your filters</td>
        </tr>
      );
    }
    return filteredList.map((item, index) => {
      const { detailsShowIndexList } = this.state;
      const isDetailsShow = detailsShowIndexList.includes(index);
      return this.renderTableElement(item, index, isDetailsShow);
    });
  };
  setPage = page => {
    this.setState({ page });
  };
  render() {
    const { reviews, searchText, ratings } = this.props;
    const { page } = this.state;
    const filteredListComplete = this.filter(reviews.list, searchText, ratings);
    const start = 10 * (page - 1);
    const end = 10 * page;
    const filteredList = filteredListComplete.slice(start, end);
    return (
      <div>
        <div style={styles.tableContainer}>
          <table cellSpacing="0" cellPadding="10" style={styles.tableStyle}>
            <thead style={styles.tableHeaderStyle}>
              <tr>{this.renderHeader()}</tr>
            </thead>
            <tbody style={styles.tableBodyStyle}>
              {this.renderBody(filteredList)}
            </tbody>
          </table>
        </div>
        {!reviews.isLoading &&
          filteredList.length > 0 && (
            <Pagination
              setPage={this.setPage}
              {...this.state}
              list={filteredListComplete}
            />
          )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  reviews: PropTypes.object.isRequired
};

export default Dashboard;
