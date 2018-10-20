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
    prevSearchText: "",
    prevRatings: [1, 2, 3, 4, 5]
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
    const headerList = ["Rating", "Comment", "Browser", "Device", "Platform"];
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
  renderBody = filteredList => {
    const { reviews } = this.props;
    if (reviews.isLoading) {
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
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        item.userAgent
      );

      const {
        rating,
        comment,
        computed_browser: { Browser, Version, Platform }
      } = item;
      return (
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
        </tr>
      );
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
