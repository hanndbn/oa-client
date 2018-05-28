export const CONSTANTS  = {
    PRE_PATH: "",
	PAGE_SIZE_DEFAULT: 10,
	RESPONSE_CODE_SUCCESS: '0',
	RESPONSE_CODE_SUCCESS_2: '00',
	INPUT_MAX_LENGTH: {
		RL_REQUEST_ID: 10,
		RL_REQUEST_NAME: 30,
		RL_REQUEST_DESCRIPTION: 200,
		TARGET_ID: 10,
		TARGET_NAME: 30,
        TARGET_SIZE: 10,
        TARGET_PERC: 3,
		TARGET_RANK: 10,
		OFFER_ID: 10,
		OFFER_NAME: 30,
		REMARKS: 200
	},
	SCREEN_TYPE: {
		TARGET_CREATE: 0,
		TARGET_PENDING: 1,
        TARGET_MODIFY: 2,
        TARGET_REJECTED: 3,
		TARGET_APPROVED: 4,
		OFFER_PENDING: 5,
		OFFER_APPROVED: 6
	},

	VIEW_TYPE: {
		CHART_VIEW: 1,
		GRID_VIEW: 2
	},
	DATA_VIEW_TYPE: {
		DEFAULT: 1,
		FILTER: 2
	},
    CREATE_REQUEST_ACTION: {
        CREATE: "C",
        VIEW: "V",
        EDIT: "E",
    },
	RL_REQUEST_STATUS: {
		APPROVED: "A",
		PENDING: "P",
		REJECTED: "R",
		LOAD_OA_RESPONSE: "L",
		COMPLETED: "C"
	},
	RL_REQUEST_STATUS_BY_KEY: {
		A: 'Approved',
		P: 'Pending',
		R: 'Rejected',
		L: 'Loading',
		C: 'Complete'
	},
	RL_REQUEST_DEFINITION_TYPE: {
		CREATE: '1',
		EDIT: '2'
	},
	RL_REQUEST_ACTION_TYPE: {
		APPROVE: '1',
		REJECT: '2'
	},
	TARGET_TYPE: {
		'MCC': 'MCC',
		'CCY': 'CCY',
		'PAT': 'PAT'
	},
	TARGET_TYPE_NAME: {
		'MCC': 'Merchant Category (MCC)',
		'CCY': 'Currency Code (CCY)',
		'PAT': 'Product Code (PAT)'
	},
	TARGET_TYPE_SORT_NAME: {
		'MCC': 'Merchant Category',
		'CCY': 'Currency Code',
		'PAT': 'Product Code'
	},
	RL_REQUEST_SORT_FIELD: {
		SORT_FIELD_REQUEST_ID: 1,
		SORT_FIELD_REQUEST_NAME: 2,
		SORT_FIELD_TARGET_TYPE: 3,
		SORT_FIELD_TARGET_LAST_UPDATE_DATE: 4,
		SORT_FIELD_TARGET_LAST_APPROVE_DATE: 5,
        SORT_FIELD_TARGET_PROCESS_DATE_TIME: 7
	},
	TARGET_SORT_FIELD: {
        SORT_FIELD_SEQ_ID: 1,
        SORT_FIELD_RM_VERSION: 2,
        SORT_FIELD_RM_SE: 3,
        SORT_FIELD_LAST_UPDATE_DATE: 4,
        SORT_FIELD_LAST_APPROVE_DATE: 5,
        SORT_FIELD_TARGET_NAME: 6
	},
	SORT_TYPE: {
		ASC: 1,
		DESC: 2
	},
	RL_REQUEST_FILTER_TYPE: {
		FIELD: 1,
		OPERATION: 2,
		TEXT: 3
	},
	RL_REQUEST_FILTER_FIELD: {
		REQUEST_ID: 1,
		REQUEST_NAME: 2,
		TARGET_TYPE: 3,
		TARGET_ID: 4
	},
	RL_REQUEST_FILTER_OPERATION: {
		LIKE: 1,
		EQUAL: 2,
		LESS_OR_EQUAL: 3,
		GREATER_OR_EQUAL: 4
	},
    OFFER_MANAGEMENT_FILTER_FIELD: {
        OFFER_ID: 1,
        OFFER_NAME: 2,
    },
    OFFER_MANAGEMENT_FILTER_FIELD: {
        OFFER_ID: 1,
        OFFER_NAME: 2,
    },
	TARGET_FILTER_FIELD: {
		SEQ_NO: 1,
		NAME: 2,
		RMV: 3,
		RMSE: 4
	},
	TARGET_FILTER_TYPE: {
		TARGET_LIST: 'targetList',
		ATTRIBUTE: 'attribute',
		MCC: 'mcc',
		CURRENCY: 'currency',
		PRODUCT_CODE: 'productCode',
		TXN_CODE: 'txnCode',
		CAMPAIGN: 'campaign',
		COUPON: 'itemCode',
		MESSAGE_ID: 'messageId',
	},
	TARGET_FILTER_TYPE_NUMBER: {
		TARGET_LIST: 8,
		ATTRIBUTE: 9,
		MCC: 1,
		CURRENCY: 3,
		PRODUCT_CODE: 4,
		TXN_CODE: 10,
		CAMPAIGN: 11,
		COUPON: 6,
		MESSAGE_ID: 7
	},
	TARGET_FILTER_TYPE_DESCRIPTION_KEY: {
		TARGET_LIST: 'targetName',
		ATTRIBUTE: 9,
		MCC: 'merchantCategoryDescription',
		CURRENCY: 'currencyCodeDescription',
		PRODUCT_CODE: 'productCodeDescription',
		TXN_CODE: 10,
		CAMPAIGN: 11,
		COUPON: 'itemCode',
		MESSAGE_ID: 'messageId',
		OFFER: 'offerName'
	},
	TARGET_FILTER_TYPE_CODE_KEY: {
		TARGET_LIST: 'targetSeqNo',
		ATTRIBUTE: 9,
		MCC: 'merchantCategoryCode',
		CURRENCY: 'currencyCode',
		PRODUCT_CODE: 'productCode',
		TXN_CODE: 10,
		CAMPAIGN: 11,
		COUPON: 'itemCode',
		MESSAGE_ID: 'messageId',
        OFFER: 'offerId'
	},
	BROKEN_DOWN_TYPE: {
		GENDER: 1,
		AGE_GROUP: 2,
		PRODUCT_CODE: 3
	},
	BROKEN_DOWN_TYPE_LABEL: {
        GENDER: "Gender",
        AGE_GROUP: "Age Group",
        PRODUCT_CODE: "Product Code"
	},
    BROKEN_DOWN_TYPE_LIST: [
		{
			value: 1,
			label: "Gender"
		},
		{
			value: 2,
            label: "Age Group",
		},
		{
			value: 3,
            label: "Product Code"
		},
	],
	DATA_TYPE: {
		TARGET: 0,
		CONTROL: 1,
		OTHER: 2
	},
	DATA_TYPE_LABEL: {
		TARGET: 'Target',
		CONTROL: 'Control',
		OTHER: 'Other'
	},
	DATA_TYPE_LIST: [
		{
			value: 0,
			label: "Target",
            id: 'target'
		},
		{
			value: 1,
			label: "Control",
            id: 'control'
		},
		{
			value: 2,
			label: "Other",
            id : 'other'
		}
	],
	CHAR_TYPE : {
		PIE: 'pie',
		BAR: 'bar',
		MULTI_BAR: 'multi_bar',

	},
	BACKGROUND_COLOR: [
        '#3367CD',
        '#FF9900',
        '#DC3812',
        '#dc1b7a',
        '#30dc7d',
        '#2fdc10',
        '#b79fdc',
        '#8cdc55',
        '#dc8899',
		'#911eb4',
		'#46f0f0',
		'#f032e6',
		'#d2f53c',
		'#008080',
		'#e6beff',
		'#fffac8',
		'#aaffc3',
		'#808000',
		'#808080',
		'#aa6e28',
	],
    CHART_DATA_TYPE: {
        TRANSACTION_AMOUNT : {
            id: "transactionAmount",
            label: "Transaction Amount"
        },
        TRANSACTION_COUNT : {
            id: "transactionCount",
            label: "Transaction Count"
        },
        TRANSACTION_AVERAGE : {
            id: "transactionAverage",
            label: "Transaction Average"
        }
    },
    CHAR_DATA_LABEL: {
	    transactionAmount : "Transaction Amount",
        transactionCount : "Transaction Count",
	    transactionAverage : "Transaction Average",
    },
    GENDER_DESCRIPTION: {
        M: 'Male',
        O: 'Other',
        F: 'Female',
    },
	TIME_OUT_CONSTANT: {
        OA: 180000
    },
	TYPE_CHART_REQUEST: {
    	CREATE: 1,
		EDIT: 2,
		VIEW: 3
	},
	MODULE_ID: {
		DASHBOARD: '1',
		RL_REQUEST: '2',
		OA_RECOMMENDATION: '3',
		OFFER_MANAGER: '4',
		TARGET_LIST: '5'
	},
	MODULE_RIGHT_VALUE: {
		YES: 'Y',
		NO: 'N'
	}
};