import {browserHistory} from "react-router";
import {CONST_SERVICE_URL_LOGIN} from "../../app/serviceConstants.js";
import {sendRequestToServer} from "../../utils/helper.js";
import {Messages} from "../../app/messages.js";
/**********************************************************************************************************************/

export const REQUEST_LOGIN = 'login/REQUEST_LOGIN';
export function requestLogin() {
	return {
		type: REQUEST_LOGIN,
	}
}

export const REQUEST_LOGIN_SUCCESS = 'login/REQUEST_LOGIN_SUCCESS';
export function requestLoginSuccess() {
	return {
		type: REQUEST_LOGIN_SUCCESS
	}
}

export const REQUEST_LOGIN_FAILURE = 'login/REQUEST_LOGIN_FAILURE';
export function requestLoginFailure(errorMsg) {
	return {
		type: REQUEST_LOGIN_FAILURE,
		errorMsg
	}
}

//use thunk middleware in reducer for this to work
export function loginUser(id, password) {
	return (dispatch) => {
		if (!id) {
			dispatch(requestLoginFailure(Messages.MESSAGE_USERNAME_CANT_BE_EMPTY));
			return;
		}
		if (!password) {
			dispatch(requestLoginFailure(Messages.MESSAGE_PASSWORD_CANT_BE_EMPTY));
			return;
		}
		dispatch(requestLogin());
		let loginSuccess = (data) => {
			if(data.responseCode == '00'){
                dispatch(requestLoginSuccess());
                browserHistory.push('/CodeManager');
			} else{
                dispatch(requestLoginFailure(data.errorMessage));
			}
		};
		let loginFailure = (data) => {
			dispatch(requestLoginFailure(Messages.DEFAULT_ERR_MESSAGE));
		};
		let req = {
			"userName": id,
			"password": password
		};
		sendRequestToServer(CONST_SERVICE_URL_LOGIN, "POST", req, loginSuccess, loginFailure, dispatch);
	}
}