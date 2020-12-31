import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import * as actionCreators from '../actions';

const style = {
    content: {
        left: '20%',
        right: '20%',
        top: '20%',
        bottom: '20%',
    }
};

function modal({ modalID, pointInfo, actions }) {
    const { full } = modalID === 0 ? pointInfo.start : pointInfo.end; // TODO
    return (
        <ReactModal
            isOpen={modalID !== -1}
            onRequestClose={actions.closeModal}
            style={style}
            ariaHideApp={false}>
            This is a Modal for
            <br/>
            {full}
            <br/>
            which is the {modalID === 0 ? 'Starting location' : 'Destination'}
        </ReactModal>
    );
}

modal.propTypes = {
    modalID: PropTypes.number.isRequired,
    pointInfo: PropTypes.object.isRequired, // TODO
    // TODO actions
};

function mapStateToProps(state) {
    return {
        modalID: state.modal,
        pointInfo: state.pointInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(modal);