import { assignIn as _assignIn } from 'lodash';
import * as rlRequestActions from './codeManagerActions.js';
import {CONSTANTS} from '../../../app/constant.js';
/**********************************************************************************************************************/
const initialState = {
	rlRequestList: [],
	isGettingData: false,
	errorMsg: null,
	currentRlRequestDetail: null,
	totalPage: 0,
	pageIndex: 1,
	filter: [
		{
			label: "Approved",
			value: CONSTANTS.RL_REQUEST_STATUS.APPROVED,
			isSelected: true
		},
		{
			label: "Pending",
			value: CONSTANTS.RL_REQUEST_STATUS.PENDING,
			isSelected: false
		},
		{
			label: "Rejected",
			value: CONSTANTS.RL_REQUEST_STATUS.REJECTED,
			isSelected: false
		}
	],
	searchFilter: {
		filterField: "",
		filterOperation: CONSTANTS.RL_REQUEST_FILTER_OPERATION.LIKE,
		filterTextSearch: ""
	},
	sortList: [
        {
            "sortField": CONSTANTS.RL_REQUEST_SORT_FIELD.SORT_FIELD_TARGET_LAST_UPDATE_DATE,
            "sortType": CONSTANTS.SORT_TYPE.DESC
        }
    ]
};

const rlRequestReducer = (state=initialState, action) => {
	switch(action.type) {
		case rlRequestActions.RESET_VIEW:
			return _assignIn({}, state, {
				rlRequestList: [],
				isGettingData: false,
				errorMsg: null,
				currentRlRequestDetail: null,
				totalPage: 0,
				pageIndex: 1,
				filter: [
					{
						label: "Approved",
						value: CONSTANTS.RL_REQUEST_STATUS.APPROVED,
						isSelected: action.defaultFilterValue ? 'A' == action.defaultFilterValue : true
					},
					{
						label: "Pending",
						value: CONSTANTS.RL_REQUEST_STATUS.PENDING,
						isSelected: CONSTANTS.RL_REQUEST_STATUS.PENDING == action.defaultFilterValue
					},
					{
						label: "Rejected",
						value: CONSTANTS.RL_REQUEST_STATUS.REJECTED,
						isSelected: 'R' == action.defaultFilterValue
					}
				],
				searchFilter: {
					filterField: "",
					filterOperation: CONSTANTS.RL_REQUEST_FILTER_OPERATION.LIKE,
					filterTextSearch: ""
				},
                sortList: [
                    {
                        "sortField": CONSTANTS.RL_REQUEST_SORT_FIELD.SORT_FIELD_TARGET_LAST_UPDATE_DATE,
                        "sortType": CONSTANTS.SORT_TYPE.DESC
                    }
                ]
			});
		case rlRequestActions.CHOSE_RL_REQUEST: {
			return _assignIn({}, state, {
				rlRequestList: getNewRlRequestList(state.rlRequestList, action.rlRequestIndex),
				currentRlRequestDetail: state.rlRequestList[action.rlRequestIndex]
			});
		}
		case rlRequestActions.SET_CURRENT_Rl_REQUEST_DETAIL:
			return _assignIn({}, state, {
				currentRlRequestDetail: action.currentRlRequestDetail
			});
		case rlRequestActions.CHANGE_REMARK:
			return _assignIn({}, state, {
				currentRlRequestDetail: _assignIn({}, state.currentRlRequestDetail, {
					remarks: action.remark
				})
			});
		case rlRequestActions.SET_PAGE_INDEX:
			return _assignIn({}, state, {
				pageIndex: action.pageIndex
			});
		case rlRequestActions.UPDATE_FILTER:
			return _assignIn({}, state, {
				filter: action.filter,
				searchFilter: {
					filterField: "",
					filterOperation: CONSTANTS.RL_REQUEST_FILTER_OPERATION.LIKE,
					filterTextSearch: ""
				}
			});
		case rlRequestActions.CHANGE_SEARCH_FILTER:
			return _assignIn({}, state, {
				searchFilter: action.searchFilter
			});
		case rlRequestActions.CHANGE_SORT_LIST:
			return _assignIn({}, state, {
				sortList: action.sortList
			});
		//	get RL Request list
		case rlRequestActions.REQUEST_RL_REQUEST_LIST_START:
			return _assignIn({}, state, {
				isGettingData: true,
				errorMsg: null
			});
		case rlRequestActions.REQUEST_RL_REQUEST_LIST_START_SUCCESS:
			return _assignIn({}, state, {
				rlRequestList: action.rlRequestList,
				totalPage: action.totalPage,
				currentRlRequestDetail: action.rlRequestList[0],
				isGettingData: false,
				errorMsg: null
			});

		case rlRequestActions.REQUEST_RL_REQUEST_LIST_START_FAILURE:
			return _assignIn({}, state, {
				rlRequestList: [],
				isGettingData: false,
				errorMsg: action.errorMsg
			});
		case rlRequestActions.REQUEST_RL_REQUEST_DETAIL_START:
			return _assignIn({}, state, {
				isGettingData: true,
				errorMsg: null
			});
		case rlRequestActions.REQUEST_RL_REQUEST_DETAIL_SUCCESS:
			return _assignIn({}, state, {
				currentRlRequestDetail: _assignIn({}, state.currentRlRequestDetail, {
					emailGroup: action.rlRequestDetail.emailGroup
				}),
				isGettingData: false,
				errorMsg: null
			});
		case rlRequestActions.REQUEST_RL_REQUEST_DETAIL_FAILURE:
			return _assignIn({}, state, {
				currentRlRequestDetail: null,
				isGettingData: false,
				errorMsg: action.errorMsg
			});
		default:
			return state;
	}
};

export default rlRequestReducer;


const getNewRlRequestList = (rlRequestList, rlRequestIndex) => {
	rlRequestList.map((rlRequest)=>{
		rlRequest.isSelected = false;
	});
	if(rlRequestList.length > rlRequestIndex) {
		rlRequestList[rlRequestIndex].isSelected = true;
	} else {
		if(rlRequestList.length > 0) {
			rlRequestList[0].isSelected = true;
		}
	}
	return rlRequestList;
};