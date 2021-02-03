import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button/index';
import TextField from '@material-ui/core/TextField/index';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import * as actionCreators from '../actions/userActions';

const defaultState = {
  emailInput: '',
  pwInput: '',
  openArr: [],
};

class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    const { openArr } = this.state;
    for (let i = 0; i < 5; i += 1) openArr[i] = 0;
    this.setState({ openArr });
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    const { openArr } = this.state;
    const open = openArr[index];
    openArr[index] = !open;
    this.setState({ openArr });
  }

  render() {
    const { openArr } = this.state;
    return (
      <div className="panel-outer">
        <div className="panel-inner">
          <form>
            <h4>Select Class</h4>
            <List
              component="nav"
              className="root"
            >
              <ListItem button onClick={() => this.handleClick(0)}>
                <ListItemText primary="CSE" />
                { openArr[0] ? <ExpandLess /> : <ExpandMore /> }
              </ListItem>
              <Collapse in={openArr[0]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className="class-button">
                    <ListItemText primary="  142" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  143" inset="true" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => this.handleClick(1)}>
                <ListItemText primary="BIOL" />
                { openArr[1] ? <ExpandLess /> : <ExpandMore /> }
              </ListItem>
              <Collapse in={openArr[1]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className="nested">
                    <ListItemText primary="  180" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  200" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  220" inset="true" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => this.handleClick(2)}>
                <ListItemText primary="MATH" />
                { openArr[2] ? <ExpandLess /> : <ExpandMore /> }
              </ListItem>
              <Collapse in={openArr[2]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className="nested">
                    <ListItemText primary="  124" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  125" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  126" inset="true" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => this.handleClick(3)}>
                <ListItemText primary="CHEM" />
                { openArr[3] ? <ExpandLess /> : <ExpandMore /> }
              </ListItem>
              <Collapse in={openArr[3]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className="nested">
                    <ListItemText primary="  142" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  152" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  162" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  237" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  238" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  239" inset="true" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => this.handleClick(4)}>
                <ListItemText primary="PHYS" />
                { openArr[4] ? <ExpandLess /> : <ExpandMore /> }
              </ListItem>
              <Collapse in={openArr[4]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className="nested">
                    <ListItemText primary="  114" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  115" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  116" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  121" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  122" inset="true" />
                  </ListItem>
                  <ListItem button className="nested">
                    <ListItemText primary="  123" inset="true" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </form>
        </div>
      </div>
    );
  }
}

// LoginPanel.propTypes = {
//   actions: PropTypes.objectOf(PropTypes.func).isRequired,
// };
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LoginPanel);
