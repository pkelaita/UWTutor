import { React } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button/index';

import * as actionCreators from '../actions/userActions';

function LogoutButton({ visible, actions }) {
  const button = (
    <div className="logout-button">
      <Button variant="contained" onClick={actions.logout}>
        Log Out
      </Button>
    </div>
  );
  return visible ? button : null;
}

LogoutButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state) {
  return {
    visible: !!state.user.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
