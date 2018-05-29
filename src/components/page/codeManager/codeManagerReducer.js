import {assignIn as _assignIn} from "lodash";
import * as codeManagerActions from "./codeManagerActions.js";

// The starting state sets authentication based on a token being in local storage.
// TODO: create a util to check if the token is expired.
// TODO: use jwt decoder to get logged in user name if token already exist
const initialState = {
    codeList: [],
    isRequesting: false,
    errorMsg: null,
    showModal: false,
    modalType: 'A'
};

const codeManagerReducer = (state=initialState, action) => {
    switch(action.type) {
        case codeManagerActions.REQUEST_GET_CODE:
            return _assignIn({}, state, {
                codeList: [],
                isRequesting: true,
                errorMsg: null,
            });
        case codeManagerActions.SET_SHOW_MODAL:
            return _assignIn({}, state, {
                showModal: action.showModal
            });
        case codeManagerActions.SET_MODAL_TYPE:
            return _assignIn({}, state, {
                modalType: action.modalType
            });
        case codeManagerActions.REQUEST_GET_CODE_SUCCESS:
            return _assignIn({}, state, {
                codeList: action.codeList,
                isRequesting: false,
                errorMsg: null,
            });
        case codeManagerActions.REQUEST_GET_CODE_FAILURE:
            return _assignIn({}, state, {
                codeList: [],
                isRequesting: false,
                errorMsg: action.errorMsg,
            });
        default:
            return state;
    }
};

export default codeManagerReducer;
