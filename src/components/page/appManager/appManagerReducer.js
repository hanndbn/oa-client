import {assignIn as _assignIn} from "lodash";
import * as appManagerActions from "./appManagerActions.js";

// The starting state sets authentication based on a token being in local storage.
// TODO: create a util to check if the token is expired.
// TODO: use jwt deappr to get logged in user name if token already exist
const initialState = {
    appList: [],
    isRequesting: false,
    errorMsg: null,
    showModal: false,
    modalType: 'A',
    errorMsgModal: "",
    currentApp: "",
};

const appManagerReducer = (state=initialState, action) => {
    switch(action.type) {
        case appManagerActions.REQUEST_GET_APP:
            return _assignIn({}, state, {
                appList: [],
                isRequesting: true,
                errorMsg: null,
            });

        case appManagerActions.SET_SHOW_MODAL:
            return _assignIn({}, state, {
                errorMsgModal: '',
                showModal: action.showModal
            });
        case appManagerActions.SET_MODAL_TYPE:
            return _assignIn({}, state, {
                modalType: action.modalType
            });
        case appManagerActions.SET_CURRENT_APP:
            return _assignIn({}, state, {
                currentApp: action.currentApp
            });
        case appManagerActions.REQUEST_GET_APP_SUCCESS:
            return _assignIn({}, state, {
                appList: action.appList,
                isRequesting: false,
                errorMsg: null,
            });
        case appManagerActions.REQUEST_GET_APP_FAILURE:
            return _assignIn({}, state, {
                isRequesting: false,
                errorMsg: action.errorMsg,
            });
        case appManagerActions.REQUEST_EDIT_APP_FAILURE:
            return _assignIn({}, state, {
                errorMsgModal: action.errorMsgModal,
            });
        default:
            return state;
    }
};

export default appManagerReducer;
