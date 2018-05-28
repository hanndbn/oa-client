import {browserHistory} from "react-router";
import {CONST_GET_RL_REQUEST_LIST,
	CONST_GET_RL_REQUEST_DETAIL,
	CONST_APPROVE_RL_REQUEST} from "../../../app/serviceConstants.js";
import {sendRequestToServer} from "../../../utils/helper.js";
import {Messages} from '../../../app/messages.js';
import {CONSTANTS} from '../../../app/constant.js';
import swal from 'sweetalert';
/**********************************************************************************************************************/

export const RESET_VIEW = 'rlRequest/RESET_VIEW';
export function resetView(defaultFilterValue) {
	return {
		type: RESET_VIEW,
		defaultFilterValue
	}
}

export const CHOSE_RL_REQUEST = 'rlRequest/CHOSE_RL_REQUEST';
export function choseRlRequest(rlRequestIndex) {
	return {
		type: CHOSE_RL_REQUEST,
		rlRequestIndex
	}
}

export const SET_CURRENT_Rl_REQUEST_DETAIL = 'rlRequest/SET_CURRENT_Rl_REQUEST_DETAIL';
export function setCurrentRlRequestDetail(currentRlRequestDetail) {
	return {
		type: SET_CURRENT_Rl_REQUEST_DETAIL,
		currentRlRequestDetail
	}
}

export const CHANGE_REMARK = 'rlRequest/CHANGE_REMARK';
export function changeRemark(remark) {
	return {
		type: CHANGE_REMARK,
		remark
	}
}

export const SET_PAGE_INDEX = 'rlRequest/SET_PAGE_INDEX';
export function setPageIndex(pageIndex) {
	return {
		type: SET_PAGE_INDEX,
		pageIndex
	}
}

export const UPDATE_FILTER = 'rlRequest/UPDATE_FILTER';
export function updateFilter(filter) {
	return {
		type: UPDATE_FILTER,
		filter
	}
}

export const CHANGE_SEARCH_FILTER = 'rlRequest/CHANGE_SEARCH_FILTER';
export function changeSearchFilter(searchFilter) {
	return {
		type: CHANGE_SEARCH_FILTER,
		searchFilter
	}
}

export const CHANGE_SORT_LIST = 'rlRequest/CHANGE_SORT_LIST';
export function changeSortList(sortList) {
	return {
		type: CHANGE_SORT_LIST,
        sortList
	}
}

// get rl request list
export const REQUEST_RL_REQUEST_LIST_START = 'rlRequest/REQUEST_RL_REQUEST_LIST_START';
export function requestRlRequestStart() {
	return {
		type: REQUEST_RL_REQUEST_LIST_START,
	}
}

export const REQUEST_RL_REQUEST_LIST_START_SUCCESS = 'rlRequest/REQUEST_RL_REQUEST_LIST_START_SUCCESS';
export function requestRlRequestSuccess(rlRequestList, totalPage) {
	return {
		type: REQUEST_RL_REQUEST_LIST_START_SUCCESS,
		rlRequestList,
		totalPage
	}
}

export const REQUEST_RL_REQUEST_LIST_START_FAILURE = 'rlRequest/REQUEST_RL_REQUEST_LIST_START_FAILURE';
export function requestRlRequestFailure(errorMsg) {
	return {
		type: REQUEST_RL_REQUEST_LIST_START_FAILURE,
		errorMsg
	}
}

export function requestRlRequest(pageIndex) {
	return (dispatch, getState) => {
		dispatch(requestRlRequestStart());
		dispatch(setPageIndex(pageIndex ? pageIndex : 1));

		let statusList = [];
		let filter = getState().rlRequest.filter;
		filter.map((filterItem, idx)=>{
			if(filterItem.isSelected) {
				statusList.push(filterItem.value);
			}
		});
		if(statusList.length == filter.length) {
			statusList = [];
		}

		let success = (data) => {
			if (data.errorCode == CONSTANTS.RESPONSE_CODE_SUCCESS) {
				if(data.data.oaRequest.length > 0) {
					data.data.oaRequest[0].isSelected = true;
					data.data.oaRequest.map((rlRequest)=>{
						if(!rlRequest.remarks) {
							rlRequest.remarks = "";
						}
					});
				}
				dispatch(requestRlRequestSuccess(data.data.oaRequest, data.data.totalPage));
				if(data.data.oaRequest.length > 0) {
					dispatch(requestRlRequestDetail());
				}
			} else {
				let errorMsg = Messages.DEFAULT_ERR_MESSAGE;
				if(data.message) {
					errorMsg = data.message;
				}
				dispatch(requestRlRequestFailure(errorMsg));
				swal({
					title: "FAIL!",
					text: errorMsg,
					icon: "error",
				});
			}
		};
		let failure = (data) => {
			dispatch(requestRlRequestFailure(Messages.DEFAULT_ERR_MESSAGE));
			swal({
				title: "FAIL!",
				text: Messages.DEFAULT_ERR_MESSAGE,
				icon: "error",
			});
		};

		let searchFilter = getState().rlRequest.searchFilter;
		let searchFilterRq = null;
		if(searchFilter.filterField && searchFilter.filterOperation && searchFilter.filterTextSearch) {
			searchFilterRq = {
				"filterType": searchFilter.filterOperation,
				"filterField": searchFilter.filterField,
				"textSearch": searchFilter.filterTextSearch
			}
		}
		var req = {
			"filter": searchFilterRq,
			"textSearch": "",
			"pageSize": CONSTANTS.PAGE_SIZE_DEFAULT,
			"pageIndex": pageIndex,
			"status": statusList,
			"sorts": getState().rlRequest.sortList
		};
		sendRequestToServer(CONST_GET_RL_REQUEST_LIST, "POST", req, success, failure, dispatch);
	}
}

// get rl request detail
export const REQUEST_RL_REQUEST_DETAIL_START = 'rlRequest/REQUEST_RL_REQUEST_DETAIL_START';
export function requestRlRequestDetailStart() {
	return {
		type: REQUEST_RL_REQUEST_DETAIL_START,
	}
}

export const REQUEST_RL_REQUEST_DETAIL_SUCCESS = 'rlRequest/REQUEST_RL_REQUEST_DETAIL_SUCCESS';
export function requestRlRequestDetailSuccess(rlRequestDetail) {
	return {
		type: REQUEST_RL_REQUEST_DETAIL_SUCCESS,
		rlRequestDetail
	}
}

export const REQUEST_RL_REQUEST_DETAIL_FAILURE = 'rlRequest/REQUEST_RL_REQUEST_DETAIL_FAILURE';
export function requestRlRequestDetailFailure(errorMsg) {
	return {
		type: REQUEST_RL_REQUEST_DETAIL_FAILURE,
		errorMsg
	}
}

export function requestRlRequestDetail() {
	return (dispatch, getState) => {
		if(!getState().rlRequest.currentRlRequestDetail) {
			return;
		}
		dispatch(requestRlRequestDetailStart());

		let success = (data) => {
			if (data.errorCode == CONSTANTS.RESPONSE_CODE_SUCCESS) {
				dispatch(requestRlRequestDetailSuccess(data.data));
			} else {
				let errorMsg = Messages.DEFAULT_ERR_MESSAGE;
				if(data.message) {
					errorMsg = data.message;
				}
				dispatch(requestRlRequestDetailFailure(errorMsg));
				swal({
					title: "FAIL!",
					text: errorMsg,
					icon: "error",
				});
			}
		};
		let failure = (data) => {
			dispatch(requestRlRequestDetailFailure(Messages.DEFAULT_ERR_MESSAGE));
			swal({
				title: "FAIL!",
				text: Messages.DEFAULT_ERR_MESSAGE,
				icon: "error",
			});
		};
		var req = {
			"emailGroup": getState().rlRequest.currentRlRequestDetail.emailGroup,
			// "targetType": getState().rlRequest.currentRlRequestDetail.targetType,
			// "targetId": getState().rlRequest.currentRlRequestDetail.targetId
		};
		sendRequestToServer(CONST_GET_RL_REQUEST_DETAIL, "POST", req, success, failure, dispatch);
	}
}

// approve or reject rl request
export const REQUEST_APPROVE_RL_REQUEST_START = 'rlRequest/REQUEST_APPROVE_RL_REQUEST_START';
export function requestApproveRlRequestStart() {
	return {
		type: REQUEST_APPROVE_RL_REQUEST_START,
	}
}

export const REQUEST_APPROVE_RL_REQUEST_SUCCESS = 'rlRequest/REQUEST_APPROVE_RL_REQUEST_SUCCESS';
export function requestApproveRlRequestSuccess() {
	return {
		type: REQUEST_APPROVE_RL_REQUEST_SUCCESS
	}
}

export const REQUEST_APPROVE_RL_REQUEST_FAILURE = 'rlRequest/REQUEST_APPROVE_RL_REQUEST_FAILURE';
export function requestApproveRlRequestFailure(errorMsg) {
	return {
		type: REQUEST_APPROVE_RL_REQUEST_FAILURE,
		errorMsg
	}
}

export function requestApproveRlRequest(isApprove, isApproveCurrentSelected, remark) {
	return (dispatch, getState) => {
		let rlRequestList = getState().rlRequest.rlRequestList;
		let rlRequestIdList = [];
		for(let i=0; i<rlRequestList.length; i++) {
			if(rlRequestList[i].isSelected) {
				rlRequestIdList.push(rlRequestList[i].requestId);
				if(isApproveCurrentSelected) {
					break;
				}
			}
		}
		if(rlRequestIdList.length == 0) {
			return;
		} else if(rlRequestIdList.length == 1) {
			rlRequestIdList = rlRequestIdList[0];
		}
		dispatch(requestApproveRlRequestStart());

		let success = (data) => {
			if (data.errorCode == CONSTANTS.RESPONSE_CODE_SUCCESS) {
				dispatch(requestApproveRlRequestSuccess());
                dispatch(requestRlRequest(1));
				swal({
					title: "SUCCESS!",
					// text: "Success!",
					icon: "success",
					closeOnClickOutside: false,
					closeOnEsc: false,
				}).then((value) => {
				});
			} else {
				let errorMsg = Messages.DEFAULT_ERR_MESSAGE;
				if(data.message) {
					errorMsg = data.message;
				}
				dispatch(requestApproveRlRequestFailure(errorMsg));
				swal({
					title: "FAIL!",
					text: errorMsg,
					icon: "error",
				});
			}
		};
		let failure = (data) => {
			dispatch(requestApproveRlRequestFailure(Messages.DEFAULT_ERR_MESSAGE));
			swal({
				title: "FAIL!",
				text: Messages.DEFAULT_ERR_MESSAGE,
				icon: "error",
			});
		};
		var req = {
			"typeRequest": isApprove ? CONSTANTS.RL_REQUEST_ACTION_TYPE.APPROVE : CONSTANTS.RL_REQUEST_ACTION_TYPE.REJECT,
			"requestId" : rlRequestIdList,
			"remarks": remark,
			"actionBy": getState().login.username
		};
		sendRequestToServer(CONST_APPROVE_RL_REQUEST, "POST", req, success, failure, dispatch);
	}
}
