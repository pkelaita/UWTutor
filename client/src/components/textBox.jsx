import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import * as PropTypes from 'prop-types';

import * as actionCreators from '../actions';

/**
 * Provides the user with a text box where they can input the start and end locations.
 *
 * @param actions Redux actions
 * @param type The type on this text box - either 'start' or 'end.'
 * @param query The text typed into this box.
 * @returns {*}
 */
function textBox({ actions, type, query }) {

    // Updates the redux store with the new value of the URL on each character change
    const handleChange = event => {
        switch (type) {
            case 'start':
                actions.changeStart(event.target.value);
                break;
            case 'end':
                actions.changeEnd(event.target.value);
                break;
            default:
                throw new Error(`Illegal prop: ${type}`)
        }
    };

    // Submit image on enter key
    const handleSubmit = event => {
        event.preventDefault();
        actions.submit();
    };

    const { start, end } = query;
    return (
        <form onSubmit={handleSubmit}>
            <TextField label={type}
                       onChange={handleChange}
                       value={type === 'start' ? start : end}
                       style={{ textTransform: 'capitalize' }}/>
        </form>
    );
}

textBox.propTypes = {
    actions: PropTypes.shape({
        changeStart: PropTypes.func.isRequired,
        changeEnd: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        query: state.query,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(textBox);