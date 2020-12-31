import { combineReducers } from 'redux';

import {
    CHANGE_START_TEXT,
    CHANGE_END_TEXT,
    LOAD_PATH,
    RESET,
    UPDATE_INFO,
    LOAD_BUILDINGS,
    OPEN_START_MODAL,
    OPEN_END_MODAL,
    CLOSE_MODAL,
} from './actionTypes';

const defaultState = {
    query: {
        start: '',
        end: '',
    },
    path: {
        coords: [],
        dist: -1,
    },
    pointInfo: {
        start: {},
        end: {},
    },
    buildings: {},
    modal: -1,
};

const query = (state = defaultState.query, action) => {
    switch (action.type) {
        case CHANGE_START_TEXT:
            return {
                ...state,
                start: action.payload,
            };
        case CHANGE_END_TEXT:
            return {
                ...state,
                end: action.payload,
            };
        case RESET:
            return defaultState.query;
        default:
            return state;
    }
};

const path = (state = defaultState.path, action) => {
    switch (action.type) {
        case LOAD_PATH:
            return action.payload;
        case RESET:
            return defaultState.path;
        default:
            return state;
    }
};

const pointInfo = (state = defaultState.pointInfo, action) => {
    switch (action.type) {
        case UPDATE_INFO:
            const { startInfo, endInfo } = action.payload;
            return {
                start: {
                    full: startInfo.full,
                    x: startInfo.x,
                    y: startInfo.y,
                },
                end: {
                    full: endInfo.full,
                    x: endInfo.x,
                    y: endInfo.y,
                }
            };
        case RESET:
            return defaultState.pointInfo;
        default:
            return state;
    }
};

const modal = (state = defaultState.modal, action) => {
    switch (action.type) {
        case OPEN_START_MODAL:
            return 0;
        case OPEN_END_MODAL:
            return 1;
        case CLOSE_MODAL:
            return -1;
        default:
            return state;
    }
};

const buildings = (state = defaultState.buildings, action) => {
    switch (action.type) {
        case LOAD_BUILDINGS:
            return action.payload;
        default:
            return state;
    }
};

/**
 * Root reducer - controls Redux state.
 */
export default combineReducers({
    query,
    path,
    pointInfo,
    modal,
    buildings,
});