import {browserHistory} from "react-router";
import {CONST_SERVICE_URL_GET_APP, CONST_SERVICE_URL_EDIT_APP} from "../../../app/serviceConstants.js";
import * as codeManagerActions from "../../../components/page/codeManager/codeManagerActions";
import {sendRequestToServer} from "../../../utils/helper.js";
import {Messages} from '../../../app/messages.js';
import {CONSTANTS} from '../../../app/constant.js';
import swal from 'sweetalert';
/**********************************************************************************************************************/

export const REQUEST_GET_APP = 'appManager/REQUEST_GET_APP';
export function requestGetApp() {
    return {
        type: REQUEST_GET_APP,
    }
}

export const REQUEST_GET_APP_SUCCESS = 'appManager/REQUEST_GET_APP_SUCCESS';
export function requestGetAppSuccess(appList) {
    return {
        type: REQUEST_GET_APP_SUCCESS,
		appList: appList
    }
}

export const REQUEST_GET_APP_FAILURE = 'appManager/REQUEST_GET_APP_FAILURE';
export function requestGetAppFailure(errorMsg) {
    return {
        type: REQUEST_GET_APP_FAILURE,
        errorMsg
    }
}

export const REQUEST_EDIT_APP_FAILURE = 'appManager/REQUEST_EDIT_APP_FAILURE';
export function requestEditAppFailure(errorMsgModal) {
    return {
        type: REQUEST_EDIT_APP_FAILURE,
        errorMsgModal
    }
}


export const SET_SHOW_MODAL = 'appManager/SET_SHOW_MODAL';
export function setShowModal(showModal) {
    return {
        type: SET_SHOW_MODAL,
        showModal: showModal
    }
}
export const SET_MODAL_TYPE = 'appManager/SET_MODAL_TYPE';
export function setModalType(modalType) {
    return {
        type: SET_MODAL_TYPE,
        modalType: modalType
    }
}

export const SET_CURRENT_APP = 'appManager/SET_CURRENT_APP';
export function setCurrentApp(currentApp) {
    return {
        type: SET_CURRENT_APP,
        currentApp: currentApp
    }
}

//use thunk middleware in reducer for this to work
export function requestAppList(txtSearch) {
    return (dispatch) => {
        dispatch(requestGetApp());
        let requestSuccess = (res) => {
            if(res.responseCode == '00'){
                dispatch(requestGetAppSuccess(res.data));
                if(res.data.length > 0){
                    dispatch(setCurrentApp(res.data[0]['id']));
                    dispatch(codeManagerActions.requestCodeList();
                }
            } else{
                dispatch(requestGetAppFailure(res.errorMessage));
            }
        };
        let requestFailure = (data) => {
            dispatch(requestGetAppFailure(Messages.DEFAULT_ERR_MESSAGE));
        };
        let req = {
            txtSearch : txtSearch ? txtSearch : ""
        };
        sendRequestToServer(CONST_SERVICE_URL_GET_APP, "POST", req, requestSuccess, requestFailure, dispatch);
    }
}

//use thunk middleware in reducer for this to work
export function requestEditApp(app, newApp, modalType) {
    return (dispatch) => {
        //dispatch(requestGetApp());
        let requestSuccess = (res) => {
            if(res.responseCode == '00'){
                dispatch(setShowModal(false));
                dispatch(requestAppList());
                swal({
                    title: "SUCCESS!",
                    text: "Process success",
                    icon: "success",
                })
            } else{
                dispatch(requestEditAppFailure(res.errorMessage));
            }
        };
        let requestFailure = (data) => {
            dispatch(requestEditAppFailure(Messages.DEFAULT_ERR_MESSAGE));
        };
        let req = {
            "app": app,
            "newApp": newApp,
            "action": modalType
        };
        sendRequestToServer(CONST_SERVICE_URL_EDIT_APP, "POST", req, requestSuccess, requestFailure, dispatch);
    }
}