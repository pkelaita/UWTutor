import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';

import * as actionCreators from '../actions';

/**
 * Provides a button to either submit a path or reset the path.
 *
 * @param actions Redux actions
 * @param type Text on the button - either "submit" or "reset"
 * @returns {*}
 */
function pathButton({ actions, type }) {
    const handleClick = () => {
        switch (type) {
            case 'submit':
                actions.submit();
                break;
            case 'reset':
                actions.reset();
                break;
            default:
                throw new Error(`Illegal prop: ${type}`)
        }
    };
    return (
        <Button variant='contained'
                style={{ boxShadow: 'none' }}
                onClick={handleClick}>
            {type}
        </Button>
    );
}

pathButton.propTypes = {
    actions: PropTypes.shape({
        reset: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(pathButton);