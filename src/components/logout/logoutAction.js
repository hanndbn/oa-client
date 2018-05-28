//Reducer is defined in login/loginReducer.js
import {browserHistory} from 'react-router';
import {CONST_SERVICE_URL_LOGOUT} from '../../app/serviceConstants.js';
import {sendRequestToServer} from '../../utils/helper.js';
import * as loginAction from '../login/loginActions.js';
import {CONSTANTS} from "../../app/constant.js";
/**********************************************************************************************************************/

export const REQUEST_LOGOUT = 'logout/REQUEST_LOGOUT';
export function requestLogout() {
	return {
		type: REQUEST_LOGOUT
	};
};

export const REQUEST_LOGOUT_SUCCESS = 'logout/REQUEST_LOGOUT_SUCCESS';
export function requestLogoutSuccess() {
	return {
		type: REQUEST_LOGOUT_SUCCESS
	};
};


export function logoutUser(forceNow) {
	//this should be added here and not in reducers as reducers should not have side effects.
	return (dispatch, getState)=> {
		if(!forceNow) {
            dispatch(requestLogout());
		}
		let logoutSuccess = (data) => {
		    if(forceNow) {
		        return;
            }
			dispatch(requestLogoutSuccess());
			localStorage.removeItem(location.hostname+(location.port ? ':'+location.port: '') + 'jwt-token');
			localStorage.removeItem(location.hostname+(location.port ? ':'+location.port: '') + 'jwt-user-id');
            dispatch({
                type: 'RESET_STORE'
            });
			browserHistory.push('/' + CONSTANTS.PRE_PATH + "/");
		};
		let req = {
            "language": "SG",
            "currency": "SGD",
            "rqHeader": {
                "timeZone": "GMT+08:00",
                "accessToken": getState().login.token
            },
            "login" : {
                "action" : "LGO",
                "mode" : "A"
            }
        };
        sendRequestToServer(CONST_SERVICE_URL_LOGOUT, "POST", req, logoutSuccess, logoutSuccess, dispatch);
        // logoutSuccess();
	};
};
