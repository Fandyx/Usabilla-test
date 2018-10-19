import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import Filters from './components/Filters';
import styles from './styles/styles'
class DashboardPage extends Component {
    state = {
        searchText: '',
        ratings: [1, 2, 3, 4, 5]
    }
    setSearchText = (searchText) => {
        this.setState({ searchText })
    }
    setRatings = (ratings) => {
        this.setState({ ratings })
    }
    render() {
        return (
            <div> <nav style={styles.navBar}>
                <span className="glyphicon glyphicon-dashboard"></span>
                <h2 style={styles.dashboardTitle}>Dashboard</h2>
            </nav><div style={styles.dashboardStyle}>

                    <Filters setSearchText={this.setSearchText} setRatings={this.setRatings} />
                    <Dashboard {...this.props} {...this.state} />
                </div>
            </div>
        );
    }
}

export default DashboardPage;