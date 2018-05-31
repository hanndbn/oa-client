import {browserHistory} from "react-router";
import {CONST_SERVICE_URL_GET_CODE, CONST_SERVICE_URL_EDIT_CODE} from "../../../app/serviceConstants.js";
import {sendRequestToServer} from "../../../utils/helper.js";
import {Messages} from '../../../app/messages.js';
import {CONSTANTS} from '../../../app/constant.js';
import swal from 'sweetalert';
/**********************************************************************************************************************/

export const REQUEST_GET_CODE = 'codeManager/REQUEST_GET_CODE';
export function requestGetCode() {
    return {
        type: REQUEST_GET_CODE,
    }
}

export const REQUEST_GET_CODE_SUCCESS = 'codeManager/REQUEST_GET_CODE_SUCCESS';
export function requestGetCodeSuccess(codeList) {
    return {
        type: REQUEST_GET_CODE_SUCCESS,
		codeList: codeList
    }
}

export const REQUEST_GET_CODE_FAILURE = 'codeManager/REQUEST_GET_CODE_FAILURE';
export function requestGetCodeFailure(errorMsg) {
    return {
        type: REQUEST_GET_CODE_FAILURE,
        errorMsg
    }
}

export const REQUEST_EDIT_CODE_FAILURE = 'codeManager/REQUEST_EDIT_CODE_FAILURE';
export function requestEditCodeFailure(errorMsgModal) {
    return {
        type: REQUEST_EDIT_CODE_FAILURE,
        errorMsgModal
    }
}


export const SET_SHOW_MODAL = 'codeManager/SET_SHOW_MODAL';
export function setShowModal(showModal) {
    return {
        type: SET_SHOW_MODAL,
        showModal: showModal
    }
}
export const SET_MODAL_TYPE = 'codeManager/SET_MODAL_TYPE';
export function setModalType(modalType) {
    return {
        type: SET_MODAL_TYPE,
        modalType: modalType
    }
}

export const SET_CURRENT_CODE = 'codeManager/SET_CURRENT_CODE';
export function setCurrentCode(currentCode) {
    return {
        type: SET_CURRENT_CODE,
        currentCode: currentCode
    }
}

export const SET_CURRENT_APP = 'codeManager/SET_CURRENT_APP';
export function setCurrentApp(currentApp) {
    return {
        type: SET_CURRENT_APP,
        currentCode: currentApp
    }
}

//use thunk middleware in reducer for this to work
export function requestCodeList(txtSearch) {
    return (dispatch) => {
        dispatch(requestGetCode());
        let requestSuccess = (res) => {
            if(res.responseCode == '00'){
                dispatch(requestGetCodeSuccess(res.data));
            } else{
                dispatch(requestGetCodeFailure(res.errorMessage));
            }
        };
        let requestFailure = (data) => {
            dispatch(requestGetCodeFailure(Messages.DEFAULT_ERR_MESSAGE));
        };
        let req = {
            txtSearch : txtSearch ? txtSearch : ""
        };
        sendRequestToServer(CONST_SERVICE_URL_GET_CODE, "POST", req, requestSuccess, requestFailure, dispatch);
    }
}

//use thunk middleware in reducer for this to work
export function requestEditCode(code, newCode, modalType) {
    return (dispatch) => {
        //dispatch(requestGetCode());
        let requestSuccess = (res) => {
            if(res.responseCode == '00'){
                dispatch(setShowModal(false));
                dispatch(requestCodeList());
                swal({
                    title: "SUCCESS!",
                    text: "Process success",
                    icon: "success",
                })
            } else{
                dispatch(requestEditCodeFailure(res.errorMessage));
            }
        };
        let requestFailure = (data) => {
            dispatch(requestEditCodeFailure(Messages.DEFAULT_ERR_MESSAGE));
        };
        let req = {
            "code": code,
            "newCode": newCode,
            "action": modalType
        };
        sendRequestToServer(CONST_SERVICE_URL_EDIT_CODE, "POST", req, requestSuccess, requestFailure, dispatch);
    }
}