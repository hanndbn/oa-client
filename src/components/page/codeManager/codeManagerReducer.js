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
    modalType: 'A',
    errorMsgModal: "",
    currentCode: "",
    currentApp: "",
    showDetailModal: true
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
                errorMsgModal: '',
                showModal: action.showModal
            });
        case codeManagerActions.SET_SHOW_DETAIL_MODAL:
            return _assignIn({}, state, {
                errorMsgModal: '',
                showDetailModal: action.showDetailModal
            });
        case codeManagerActions.SET_MODAL_TYPE:
            return _assignIn({}, state, {
                modalType: action.modalType
            });
        case codeManagerActions.SET_CURRENT_CODE:
            return _assignIn({}, state, {
                currentCode: action.currentCode
            });
        case codeManagerActions.SET_CURRENT_APP:
            return _assignIn({}, state, {
                currentApp: action.currentApp
            });
        case codeManagerActions.REQUEST_GET_CODE_SUCCESS:
            return _assignIn({}, state, {
                codeList: action.codeList,
                isRequesting: false,
                errorMsg: null,
            });
        case codeManagerActions.REQUEST_GET_CODE_FAILURE:
            return _assignIn({}, state, {
                isRequesting: false,
                errorMsg: action.errorMsg,
            });
        case codeManagerActions.REQUEST_EDIT_CODE_FAILURE:
            return _assignIn({}, state, {
                errorMsgModal: action.errorMsgModal,
            });
        default:
            return state;
    }
};

export default codeManagerReducer;
