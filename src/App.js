import React, { Component } from 'react';
import DashboardContainer from './containers/DashboardContainer'
class App extends Component {
  render() {
    return (
      <div className="App">
        <DashboardContainer {...this.props}/>
      </div>
    );
  }
}

export default App;
