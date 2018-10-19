import React from 'react';
import PropTypes from 'prop-types';
import memoize from "memoize-one";
import styles from '../styles/styles'
export class Dashboard extends React.Component {

  filter = memoize(
    (list, searchText, ratings) => list.filter(item => item.comment.includes(searchText) && ratings.includes(item.rating))
  )
  renderHeader = () => {
    const headerList = ["Rating", "Comment", "Browser", "Device", "Platform"]
    return headerList.map((item, index) => (
      <th key={index} style={styles.headerItemStyle} className={`${index!==1?'center':''}`}>
        {item}
      </th>
    ))
  }
  renderBody = () => {
    const { reviews, searchText, ratings } = this.props;
    const filteredList = this.filter(reviews.list, searchText, ratings)
    return filteredList.map((item, index) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(item.userAgent);

      const { rating, comment, computed_browser: { Browser, Version, Platform } } = item;
      return <tr key={index}>
        <td className='plr-50'> <div style={styles.ratingStyle}>{rating}</div></td>
        <td>{comment}</td>
        <td>{Browser}<br />{Version}</td>
        <td>{isMobile ? 'Mobile' : 'Desktop'}</td>
        <td>{Platform}</td>
      </tr>
    })
  }
  render() {
    return (
      <div style={styles.tableContainer}>
        <table cellspacing="0" cellpadding="10" style={styles.tableStyle}>
          <thead style={styles.tableHeaderStyle}>
            <tr>
              {this.renderHeader()}
            </tr>
          </thead>
          <tbody style={styles.tableBodyStyle}>
            {this.renderBody()}
          </tbody>
        </table>
      </div>
    );
  }
}

Dashboard.propTypes = {
  reviews: PropTypes.object.isRequired
};


export default Dashboard