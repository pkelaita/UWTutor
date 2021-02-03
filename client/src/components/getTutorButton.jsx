import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button/index';
import { withRouter } from 'react-router-dom';
import registerPanel from './registerPanel';
import * as actionCreators from '../actions/userActions';
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import selectClass from './classSelection';

class TutorButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(loggedIn) {
    if (loggedIn) {
      const { clicked } = this.state;
      this.setState({ clicked: !clicked });
    } else {
      const { history } = this.props;
      history.push('/login');
    }
    console.log('The button was clicked.');
  }

  render() {
    const { clicked } = this.state;
    const { loggedIn } = this.props;
    return (
      <div className="panel-outer">
        { clicked ? (
          <selectClass />
        ) : (
          <Button variant="contained" onClick={() => this.handleClick(loggedIn)}>
            Get Tutor
          </Button>
        )}
      </div>
    );
  }
}

TutorButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: !!state.user.id,
  };
}

export default withRouter(connect(mapStateToProps, null)(TutorButton));
