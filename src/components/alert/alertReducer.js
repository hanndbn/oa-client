import { filter as _filter } from 'lodash';

import {
	ADD_ALERT,
	REMOVE_ALERT
} from './alertActions.js';

const alertReducer = (state=[], action) => {
	switch(action.type) {
		case ADD_ALERT:
			return [
				{
					id: action.id,
					text: action.text,
					alertType: action.alertType
				},
				...state
			]
		case REMOVE_ALERT:
			return _filter(state, (alert)=>{
				return (alert.id !== action.id);
			});
		default:
			return state;
	}
}

export default alertReducer;