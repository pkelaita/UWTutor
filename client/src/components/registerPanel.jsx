import { React, Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button/index';
import TextField from '@material-ui/core/TextField/index';

import * as actionCreators from '../actions/userActions';

const defaultState = {
  emailInput: '',
  idInput: '',
  pwInput: '',
  nameInput: 'Test Value',
};

class RegisterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  render() {
    const { emailInput, idInput, pwInput, nameInput } = this.state;
    const { actions } = this.props;
    return (
      <div className="panel-outer">
        <div className="panel-inner">
          <form>
            <h4>Register</h4>
            <div className="form-group">
              <TextField
                id="email-input"
                label="Email"
                variant="outlined"
                value={emailInput}
                onChange={(e) => this.setState({ emailInput: e.target.value })}
              />
            </div>
            <div className="form-group">
              <TextField
                id="id-input"
                label="Username"
                variant="outlined"
                value={idInput}
                onChange={(e) => this.setState({ idInput: e.target.value })}
              />
            </div>
            <div className="form-group">
              <TextField
                id="pw-input"
                label="Password"
                variant="outlined"
                value={pwInput}
                onChange={(e) => this.setState({ pwInput: e.target.value })}
              />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                console.log(nameInput);
                actions.register(emailInput, idInput, pwInput, nameInput);
              }}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

RegisterPanel.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(RegisterPanel);
