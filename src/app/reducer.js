//import all your reducers here and combine them
import loginReducer from "../components/login/loginReducer.js";
import codeManagerReducer from "../components/page/codeManager/codeManagerReducer.js";
import appManagerReducer from "../components/page/appManager/appManagerReducer.js";
import {REHYDRATE} from "redux-persist/lib/constants";


// import { combineReducers } from 'redux'
// const appReducer = combineReducers({winBackReducer});

//define own combined reducer
const appReducer = function(state={}, action) {
    // console.log("action:", action.type);
    if (action.type === REHYDRATE && action.payload) {
        // console.log("redydrate:", action);
        // const savedDataLogin = action.payload.login || {};
        // savedDataLogin.errorMsg = null;
        // savedDataLogin.isRequestingLogin = false;
        // savedDataLogin.isRequestingLogout = false;
        // state = {
        //     ...state, ...savedDataLogin
        // };
        //
        // const savedDataRlRequest = action.payload.rlRequest || {};
        // savedDataRlRequest.isGettingData = false;
        // state = {
        //     ...state, ...savedDataRlRequest
        // };
        //
        // const savedDataCreateOARequest = action.payload.createOARequest || {};
        // savedDataCreateOARequest.isGettingData = false;
        // state = {
        //     ...state, ...savedDataCreateOARequest
        // };
        //
        // const savedDataRecommendationList = action.payload.recommendationList || {};
        // savedDataRecommendationList.isGettingData = false;
        // state = {
        //     ...state, ...savedDataRecommendationList
        // };
        //
        // const savedDataCreateTargetList = action.payload.createTargetList || {};
        // savedDataCreateTargetList.isGettingData = false;
        // savedDataCreateTargetList.isGeneratingId = false;
        // state = {
        //     ...state, ...savedDataCreateTargetList
        // };
        //
        // const savedDataTargetListView = action.payload.createTargetListView || {};
        // savedDataTargetListView.isGettingData = false;
        // state = {
        //     ...state, ...savedDataTargetListView
        // };
    }
	if (action.type === 'RESET_STORE') {
		state = {};
	}
	return {
		login: loginReducer(state.login, action),
		// alerts: alertReducer(state.alerts, action),
        codeManager: codeManagerReducer(state.codeManager, action),
        appManager: appManagerReducer(state.appManager, action),
	}


};

export default appReducer;
