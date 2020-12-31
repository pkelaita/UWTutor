import * as fetch from 'node-fetch';
import sweetalert2 from 'sweetalert2';

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

/**
 * Fetch call paramters
 *
 * @type {{method: string, headers: {"Content-Type": string}}}
 */
const options = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
};

/**
 * Updates the redux store with each change in the start field
 *
 * @param text The text
 * @returns {{type: string, payload: *}}
 */
export function changeStart(text) {
    return {
        type: CHANGE_START_TEXT,
        payload: text,
    };
}

/**
 * Updates the redux store with each change in the end field
 *
 * @param text The text
 * @returns {{type: string, payload: *}}
 */
export function changeEnd(text) {
    return {
        type: CHANGE_END_TEXT,
        payload: text,
    };
}

/**
 * Fetches the image from the given URL and dispatches the resulting image data to redux,
 * or dispatches an -1 if the URL doesn't lead to a valid image
 *
 * @returns {Function}
 */
export function submit() {
    return async (dispatch, getState) => {

        // Make sure we don't have duplicate queries
        const { query } = getState();
        const { start, end } = query;
        if (start && end && end === start) {
            sweetalert2({
                title: 'Error',
                type: 'error',
                text: 'Start and end cannot be the same location!',
            });
            return;
        }

        const startSearch = await fetch(
            `http://localhost:8080/search?query=${start}`, options);
        const startInfo = start ? await startSearch.json() : {};
        const endSearch = await fetch(
            `http://localhost:8080/search?query=${end}`, options);
        const endInfo = end ? await endSearch.json() : {};

        // Make sure both buildings are valid; if so, dispatch their info to Redux
        const invalidStart = start && !startInfo['found'];
        const invalidEnd = end && !endInfo['found'];
        if (invalidStart || invalidEnd) {
            let text;
            if (invalidStart && invalidEnd)
                text = `Building abbreviations "${start}" and "${end}" not recognized`;
            else
                text = `Building abbreviation "${invalidStart ? start : end
                    }" not recognized`;
            sweetalert2({ title: 'Error', type: 'error', text, });
            return;
        }
        dispatch({
            type: UPDATE_INFO,
            payload: {
                startInfo,
                endInfo,
            },
        });

        // Load the path between the points
        if (start && end) {
            const coordsRes = await fetch(
                `http://localhost:8080/route?to=${end}&from=${start}`, options);
            const distRes = await fetch(
                `http://localhost:8080/route/dist?to=${end}&from=${start}`, options);
            const coords = await coordsRes.json();
            const dist = await distRes.json();
            dispatch({
                type: LOAD_PATH,
                payload: {
                    coords,
                    dist,
                },
            });
        } else {
            dispatch({
                type: LOAD_PATH,
                payload: {
                    coords: [],
                    dist: 0,
                },
            });
        }
    };
}

/**
 * Fetches information about each building from the server
 *
 * @returns {Function}
 */
export function loadBuildings() {
    return async dispatch => {
        const namesRes = await fetch('http://localhost:8080/buildings', options);
        const names = await namesRes.json();

        const buildings = {};
        const promises = [];

        names.forEach(name => promises.push(new Promise(async resolve => {
            const searchRes = await fetch(`http://localhost:8080/search?query=${name}`,
                options);
            const search = await searchRes.json();
            const { x, y } = search;
            buildings[name] = { x, y };
            resolve();
        })));

        await Promise.all(promises);
        dispatch({
            type: LOAD_BUILDINGS,
            payload: buildings,
        })
    }
}

/**
 * Resets the path state in redux to an empty array.
 *
 * @returns {{type: string}}
 */
export function reset() {
    return { type: RESET };
}

export function openModal(id) {
    return { type: id === 0 ? OPEN_START_MODAL : OPEN_END_MODAL };
}

export function closeModal() {
    return { type: CLOSE_MODAL };
}