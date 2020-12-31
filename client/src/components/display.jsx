import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import sweetalert2 from 'sweetalert2';

import * as actionCreators from '../actions';

import mapImage from '../www/campus_map.jpg';
import pin1 from '../www/pin1.png';
import pin2 from '../www/pin2.png';

import 'bootstrap/dist/css/bootstrap.min.css';

// import Modal from './modal';

// constants from our original images
const imgHeight = 2964;
const imgWidth = 4330;
const pinDims = 128;

// enumerates pin modal types
const pinModalTypes = {
    start: {
        id: 0,
        icon: pin1,
        title: 'Starting location',
    },
    end: dist => {
        return {
            id: 1,
            icon: pin2,
            title: 'Destination',
            dist,
        }
    },
};

// Buffer zone around pin icons that the user can click
const pinBuffer = 20;

// Hold our event listeners for pin and building icons
let pinListeners = [];
let buildingListeners = [];

//// Pin Functions

/**
 * Draws a pin at a given location
 *
 * @param point Holds x and y coordinates
 * @param pin React element holding pin image
 * @param ctx HTML Canvas 2d context
 */
function drawPin(point, pin, ctx) {
    const scale = 0.7;
    const { x: px, y: py } = point;
    const x = px - (pinDims * scale) / 2;
    const y = py - (pinDims * scale);
    const height = pinDims * scale;
    const width = pinDims * scale;
    ctx.drawImage(pin, x, y, height, width);
    return { x, y, height, width, };
}

/**
 * Drops pins at start and end locations, with event listeners to show their modals.
 *
 * @param start Start location info
 * @param end End location info
 * @param pin1 Start pin HTML element
 * @param pin2 End pin HTML element
 * @param canvas HTML5 canvas
 * @param actions Redux actions
 * @returns {{x, y, height, width}}
 */
function setPinLocations(start, end, pin1, pin2, canvas, actions) {
    const ctx = canvas.getContext('2d');
    let p1rect;
    let p2rect;
    if (start || end) {
        if (start) {
            p1rect = drawPin(start, pin1, ctx);
            const l1 = getPinListener(
                canvas, p1rect, start.full, pinModalTypes.start, !end.full, actions);
            pinListeners.push(l1);
            canvas.addEventListener('click', l1);
        }
        if (end) { // our end pin modal initially has a distance of zero
            p2rect = drawPin(end, pin2, ctx);
            const l2 = getPinListener(
                canvas, p2rect, end.full, pinModalTypes.end(0), !start.full, actions);
            pinListeners.push(l2);
            canvas.addEventListener('click', l2);
        }

        // remove building event listeners that clash with our pins
        buildingListeners = buildingListeners.filter(func => {
            const { point } = func;
            const p1 = p1rect && insideRect(point, p1rect, pinBuffer);
            const p2 = p2rect && insideRect(point, p2rect, pinBuffer);
            if (!p1 && !p2)
                return true;
            canvas.removeEventListener('click', func);
            return false;
        });
    }
    return p2rect;
}

/**
 * Returns an event listener to show a message about a location when the user clicks
 * inside a rectangle containing a pin on that location.
 *
 * @param canvas HTML canvas
 * @param pinRect Rectangle containing pin location
 * @param locName Full name of the location
 * @param type Pin modal type
 * @param showTextBox True if this pin's modal should show a text box
 * @param actions Redux actions
 * @returns {Function}
 */
function getPinListener(canvas, pinRect, locName, type, showTextBox, actions) {
    const scaleX = canvas.width / canvas.offsetWidth;
    const scaleY = canvas.height / canvas.offsetHeight;
    const func = evt => {
        const point = {
            x: (evt.pageX - canvas.offsetLeft) * scaleX,
            y: (evt.pageY - canvas.offsetTop) * scaleY,
        };
        if (insideRect(point, pinRect, pinBuffer))
            showPinModal(locName, type, showTextBox, actions).catch(e =>
                console.error(e));
    };
    func.type = type;
    return func;
}

/**
 * Shows the modal associated with a start or end pin
 *
 * @param name Name of the location associated with the pin.
 * @param type Enumerated pin type containing its information.
 * @param showTextBox True if this modal should show a text box.
 * @param actions Redux actions
 */
async function showPinModal(name, type, showTextBox, actions) {
    const { id, title, icon, dist } = type;
    const subtext = dist
        ? ('<br/><br/>'
            + 'Total distance: '
            + `<strong>${Math.round(dist)}</strong> feet`)
        : '';
    const inputSubtext = showTextBox
        ? `<br/><br/> Set ${
            id === pinModalTypes.start.id
                ? 'destination'
                : 'start location'}: `
        : '';
    const button = '<br/><br/>' +
        '<button id="remove" class="btn btn-outline-danger">' +
        'Remove this pin' +
        '</button>';
    const options = {
        title,
        html: name + subtext + button + inputSubtext,
        imageUrl: icon,
        imageHeight: 70,
        showCloseButton: true,
        showConfirmButton: false,
        onBeforeOpen: () => {
            const content = sweetalert2.getContent();
            const $ = content.querySelector.bind(content);
            const remove = $('#remove');
            remove.addEventListener('click', () => {
                (id === pinModalTypes.start.id
                        ? actions.changeStart
                        : actions.changeEnd
                )('');
                actions.submit();
                sweetalert2.close();
            });
        },
    };
    if (showTextBox) {
        Object.assign(options, {
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Submit',
        });
    }
    const result = await sweetalert2(options);
    if (result.value && showTextBox) {
        (id === pinModalTypes.start.id
                ? actions.changeEnd
                : actions.changeStart
        )(result.value);
        actions.submit();
    }
}

//// Path functions

/**
 * Draws a path between two points.
 *
 * @param start Point to start at
 * @param coords List containing each point in the path.
 * @param ctx HTML Canvas 2d context.
 */
function drawPath(start, coords, ctx) {
    ctx.strokeStyle = '#ff6400';
    ctx.lineWidth = 11;

    let { x, y } = start;
    coords.forEach(point => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        x = point.x;
        y = point.y;
        ctx.lineTo(x, y);
        ctx.stroke();
    });
}

//// Building functions

/**
 * Labels each building and adds a click event listener
 *
 * @param buildings Object containing building abbreviations as keys and their
 * coordinates as values
 * @param canvas HTML5 Canvas element
 * @param actions Redux actions
 */
function labelBuildings(buildings, canvas, actions) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00c4ff';

    const buffer = 0;
    const scaleX = canvas.width / canvas.offsetWidth;
    const scaleY = canvas.height / canvas.offsetHeight;

    Object.keys(buildings).forEach(key => {
        const { x, y } = buildings[key];

        // Draw icon
        const radius = 11;
        const rect = {
            x: x - radius,
            y: y - radius,
            width: radius * 2,
            height: radius * 2,
        };
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();

        // Add event listener
        const listener = evt => {
            const point = {
                x: (evt.pageX - canvas.offsetLeft) * scaleX,
                y: (evt.pageY - canvas.offsetTop) * scaleY,
            };
            if (insideRect(point, rect, buffer)) {
                if (!evt.shiftKey)
                    actions.changeStart(key);
                else
                    actions.changeEnd(key);
                actions.submit();
            }
        };
        listener.point = { x, y };

        buildingListeners.push(listener);
        canvas.addEventListener('click', listener);
    });
}

//// Helper functions

/**
 * Returns true if a point is inside a given rectangle.
 *
 * @param point The point
 * @param rect The rectange
 * @param buffer Buffer zone outside the rectangle
 * @returns {boolean}
 */
function insideRect(point, rect, buffer) {
    const { x, y } = point;
    const left = x > rect.x - buffer; // right of left bound
    const right = x < rect.x + rect.width + buffer; // left of right bound
    const lower = y < rect.y + rect.height + buffer; // above lower bound
    const upper = y > rect.y - buffer; // below upper bound
    return left && right && lower && upper;
}

/**
 * Restores the display to its initial state and clears its event listeners.
 *
 * @param display React element for the display
 */
function restore(display) {
    const { buildings, actions } = display.props;
    const { current: canvas } = display.canvas;
    const { current: background } = display.background;

    while (pinListeners.length)
        canvas.removeEventListener('click', pinListeners.pop());
    while (buildingListeners.length)
        canvas.removeEventListener('click', buildingListeners.pop());
    display.ctx.clearRect(0, 0, imgWidth, imgHeight);

    display.ctx.drawImage(background, 0, 0);
    labelBuildings(buildings, canvas, actions);
}

/**
 * Provides a display showing a campus map that is able to have paths drawn on it.
 */
class Display extends Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.background = React.createRef();
        this.pin1 = React.createRef();
        this.pin2 = React.createRef();
    }

    componentDidMount() {
        this.ctx = this.canvas.current.getContext('2d');
        this.background.current.onload = () => restore(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { path, start, end, actions } = this.props;
        const { current: canvas } = this.canvas;

        restore(this);

        const endRect = setPinLocations(start, end,
            this.pin1.current,
            this.pin2.current,
            this.canvas.current,
            actions);

        const { coords, dist } = path;
        if (coords.length) {
            drawPath(start, coords, this.ctx);

            // redraw our pins so they aren't covered by the path
            drawPin(start, this.pin1.current, this.ctx);
            drawPin(end, this.pin2.current, this.ctx);

            // update our end pin listener to display the distance
            pinListeners = pinListeners.filter(func => {
                if (func.type.id !== pinModalTypes.end.id)
                    return true;
                canvas.removeEventListener('click', func);
                return false;
            });
            const l2 = getPinListener(
                canvas, endRect, end.full, pinModalTypes.end(dist), false, actions);
            pinListeners.push(l2);
            canvas.addEventListener('click', l2);
        }
    }

    render() {
        return (<>
            <canvas ref={this.canvas} width={imgWidth} height={imgHeight} id='ui-canvas'/>
            <div style={{ display: 'none' }}>
                <img ref={this.background} src={mapImage} alt='background'/>
                <img ref={this.pin1} src={pin1} alt='start pin'/>
                <img ref={this.pin2} src={pin2} alt='end pin'/>
            </div>
        </>);
    }
}

Display.propTypes = {
    path: PropTypes.shape({
        coords: PropTypes.array.isRequired,
        dist: PropTypes.number.isRequired,
    }).isRequired,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    buildings: PropTypes.objectOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,
    actions: PropTypes.shape({
        submit: PropTypes.func.isRequired,
        changeStart: PropTypes.func.isRequired,
        changeEnd: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
    const { path, pointInfo, buildings } = state;
    const { start, end } = pointInfo;
    return { path, start, end, buildings };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);