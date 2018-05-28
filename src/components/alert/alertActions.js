
export const ADD_ALERT = 'ADD_ALERT';
export function addAlert(text, alertType, id) {
	return {
		type: ADD_ALERT,
		text,
		alertType,
		id
	}
}

export const REMOVE_ALERT = 'REMOVE_ALERT';
export function removeAlert(id) {
	return {
		type: REMOVE_ALERT,
		id
	}
}

/**
* Dispatches an alert to the screen.
* @param {string} text - the alert message to show
* @param {string} alertType - the alert type. accepts 'error', 'success' (maybe more in the future)
* @param {number} [delay] - the duration in ms to show the alert. defaults to 1500ms.
*/
let alertId = 0;
export function sendAlert(text, alertType, delay=2000) {
	let id = alertId++;
	//TODO: check alertType
	//alertType should be one of 'error', 'success' or null
	return (dispatch)=> {
		dispatch(addAlert(text, alertType, id));
		return setTimeout(function(){
			dispatch(removeAlert(id));
		}, delay);
	}
}