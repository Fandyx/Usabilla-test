import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import Filters from './components/Filters';
import styles from './styles/styles'
class DashboardPage extends Component {
    state = {
        searchText:'',
        ratings:[1,2,3,4,5]
    }
    setSearchText = (searchText) => {
        this.setState({searchText})
    }
    setRatings = (ratings) => {
        this.setState({ratings})
    }
    render() {
        return (
            <div style={styles.dashboardStyle}>
                <Filters setSearchText={this.setSearchText} setRatings={this.setRatings}/>
                <Dashboard {...this.props} {...this.state} />
            </div>
        );
    }
}

export default DashboardPage;