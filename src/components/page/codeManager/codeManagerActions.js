import {browserHistory} from "react-router";
import {CONST_SERVICE_URL_GET_CODE} from "../../../app/serviceConstants.js";
import {sendRequestToServer} from "../../../utils/helper.js";
import {Messages} from '../../../app/messages.js';
import {CONSTANTS} from '../../../app/constant.js';
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