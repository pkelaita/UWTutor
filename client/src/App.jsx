import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextBox from './components/textBox';
import PathButton from './components/pathButton';
import Display from './components/display';

import './App.css';
import * as actionCreators from './actions';
import * as PropTypes from 'prop-types';

const INIT_STATE = { ready: false };
const READY_STATE = { ready: true };

class App extends Component {

    constructor(props) {
        super(props);
        this.state = INIT_STATE;
    }

    componentWillMount() {
        const { loadBuildings } = this.props.actions;
        loadBuildings().then(() => this.setState(READY_STATE));
    }

    render() {
        const { ready } = this.state;
        const display = ready ? <Display/> : 'Loading display...';

        return (
            <div className='App'>
                <h1 className='App-header'>
                    CSE 331 Campus Path Finder
                </h1>
                <div className='ui-components'>
                    <TextBox type='start'/>
                    <TextBox type='end'/>
                    <PathButton type='submit'/>
                    <PathButton type='reset'/>
                </div>
                <div className='ui-display'>
                    {display}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.shape({
        loadBuildings: PropTypes.func.isRequired,
    }).isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}

function mapStateToProps(state) {
    const { actions } = state;
    return { actions };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
