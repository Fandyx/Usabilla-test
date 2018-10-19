import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/styles'

export class Filters extends React.Component {
    state = {
        searchText: "",
        ratings: [1, 2, 3, 4, 5]
    }
    handleInputChange = (event) => {
        this.setState({ searchText: event.target.value }, () => {
            this.props.setSearchText(this.state.searchText)
        })
    }
    handleRatingChange = (rating) => {
        const { ratings } = this.state;
        let newRatings = [...ratings];
        if (ratings.includes(rating)) {
            const index = newRatings.indexOf(rating);
            newRatings.splice(index, 1)
        }
        else {
            newRatings.push(rating)
        }
        this.setState({ ratings: newRatings }, () => {
            this.props.setRatings(newRatings)
        })
    }
    renderRatingList = () => (
        [1, 2, 3, 4, 5].map((i) => (<div style={styles.ratingStyle} key={i} className={`ratings${this.state.ratings.includes(i) ? ' active' : ''}`} onClick={() => { this.handleRatingChange(i) }}>{i}</div>
        ))
    )
    render() {
        const { searchText } = this.state;
        return (
            <div>
                <input type="text" placeholder="Search here!" value={searchText} onChange={this.handleInputChange} style={styles.inputSearch} />
                <div style={styles.ratingContainer}>
                    {this.renderRatingList()}
                </div>
            </div>
        );
    }
}

Filters.propTypes = {
    setRatings: PropTypes.func.isRequired,
    setSearchText: PropTypes.func.isRequired
};

export default Filters