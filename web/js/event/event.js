/**
 * Event publishing / subscribe module.
 * Just a simple observer pattern.
 * @version 1
 */
const event = (() => {
    const topics = {};

    // internal listener index
    let _index = 0;

    return {
        /**
         * Subscribes onto some event.
         *
         * @param topic The name of the event.
         * @param listener A callback function to call during the event.
         * @param order A number in a queue of event handlers to run callback in ordered manner.
         * @returns {{unsub: unsub}} The function to remove this subscription.
         * @example
         * const sub01 = event.sub('rapture', () => {a}, 1)
         * ...
         * sub01.unsub()
         */
        sub: (topic, listener, order = undefined) => {
            if (!topics[topic]) topics[topic] = {};
            // order index * big pad + next internal index (e.g. 1*100+1=101)
            // use some arbitrary big number to not overlap with non-ordered
            let i = (order !== undefined ? order * 1000000 : 0) + _index++;
            topics[topic][i] = listener;
            return Object.freeze({
                unsub: () => {
                    delete topics[topic][i]
                }
            });
        },

        /**
         * Publishes some event for handling.
         *
         * @param topic The name of the event.
         * @param data Additional data for the event handling.
         * Because of compatibility we have to use a dumb obj wrapper {a: a, b: b} for params instead of (topic, ...data).
         * @example
         * event.pub('rapture', {time: now()})
         */
        pub: (topic, data) => {
            if (!topics[topic]) return;
            Object.keys(topics[topic]).forEach((ls) => {
                topics[topic][ls](data !== undefined ? data : {})
            });
        }
    }
})();

// events
const LATENCY_CHECK_REQUESTED = 'latencyCheckRequested';
const PING_REQUEST = 'pingRequest';
const PING_RESPONSE = 'pingResponse';

const WORKER_LIST_FETCHED = 'workerListFetched';

const GAME_ROOM_AVAILABLE = 'gameRoomAvailable';
const GAME_SAVED = 'gameSaved';
const GAME_LOADED = 'gameLoaded';
const GAME_PLAYER_IDX = 'gamePlayerIndex';
const GAME_PLAYER_IDX_SET = 'gamePlayerIndexSet'
const GAME_ERROR_NO_FREE_SLOTS = 'gameNoFreeSlots'

const WEBRTC_CONNECTION_CLOSED = 'webrtcConnectionClosed';
const WEBRTC_CONNECTION_READY = 'webrtcConnectionReady';
const WEBRTC_ICE_CANDIDATE_FOUND = 'webrtcIceCandidateFound'
const WEBRTC_ICE_CANDIDATE_RECEIVED = 'webrtcIceCandidateReceived';
const WEBRTC_ICE_CANDIDATES_FLUSH = 'webrtcIceCandidatesFlush';
const WEBRTC_NEW_CONNECTION = 'webrtcNewConnection';
const WEBRTC_SDP_ANSWER = 'webrtcSdpAnswer'
const WEBRTC_SDP_OFFER = 'webrtcSdpOffer';

const MESSAGE = 'message'

const GAMEPAD_CONNECTED = 'gamepadConnected';
const GAMEPAD_DISCONNECTED = 'gamepadDisconnected';

const MENU_HANDLER_ATTACHED = 'menuHandlerAttached';
const MENU_PRESSED = 'menuPressed';
const MENU_RELEASED = 'menuReleased';

const KEY_PRESSED = 'keyPressed';
const KEY_RELEASED = 'keyReleased';
const KEYBOARD_TOGGLE_FILTER_MODE = 'keyboardToggleFilterMode';
const KEYBOARD_KEY_PRESSED = 'keyboardKeyPressed';
const KEYBOARD_KEY_DOWN = 'keyboardKeyDown';
const KEYBOARD_KEY_UP = 'keyboardKeyUp';
const AXIS_CHANGED = 'axisChanged';
const CONTROLLER_UPDATED = 'controllerUpdated';
const MOUSE_MOVED = 'mouseMoved';
const MOUSE_PRESSED = 'mousePressed';

const FULLSCREEN_CHANGE = 'fsc';
const POINTER_LOCK_CHANGE = 'plc';

const DPAD_TOGGLE = 'dpadToggle';
const STATS_TOGGLE = 'statsToggle';
const HELP_OVERLAY_TOGGLED = 'helpOverlayToggled';

const SETTINGS_CHANGED = 'settingsChanged';

const RECORDING_TOGGLED = 'recordingToggle'
const RECORDING_STATUS_CHANGED = 'recordingStatusChanged'

const APP_VIDEO_CHANGED = 'appVideoChanged'
const KB_MOUSE_FLAG = 'kbMouseFlag'
