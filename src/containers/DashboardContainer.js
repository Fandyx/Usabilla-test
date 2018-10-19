import React from 'react';
import PropTypes from 'prop-types';
import DashboardPage from "../components/DashboardPage"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/reviews';

export class Reviews extends React.Component
{
      componentDidMount() {
        this.props.actions.fetchReviews()
      }  

      render(){
        return (
          <div>
            <DashboardPage {...this.props}/>
          </div>
        );
      }
}

Reviews.propTypes = {
    actions: PropTypes.object.isRequired,
    reviews: PropTypes.object.isRequired
  };

function mapStateToProps(state) {
    return {
      reviews: state.reviews
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Reviews);