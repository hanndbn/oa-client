export const Messages = {
	MESSAGE_NO_RECORD_FOUND: 'No record found',
	MESSAGE_USERNAME_CANT_BE_EMPTY: 'Username can\'t be empty',
	MESSAGE_PASSWORD_CANT_BE_EMPTY: 'Password can\'t be empty',
	MESSAGE_REQUEST_LOGIN_CONNECTION_FAILURE : 'System temporarily not available. Please try again late.',
	MESSAGE_CANT_BE_EMPTY : 'We are unable to process your request. Please complete all required fields in the correct format in order to proceed.',
	MESSAGE_DOB_CANT_BE_EMPTY : 'We are unable to process your request.  Please enter your Date of Birth in order to proceed.',
	ERR_INSUFFICIENT_ITEM_QUANTITY : 'System Error',
	ERR_CUSTOMER_BLOCKED : 'customer blocked',
	ERR_INVALID_DATE_AND_TIME_FORMAT : "We are unable to process your request. Please enter your Date of Birth in the correct format and try again.",
	ERR_INVALID_CARD_NUMBER : 'Invalid Card Number',
	ERR_INVALID_CARD_NUMBER_LENGTH : "We are unable to process your request. Please enter a valid 16-digit Card number in order to proceed.",
	ERR_INVALID_CARD_NUMBER_LENGTH_PAYMENT : "We are unable to process your request. Please enter a valid 16-digit Card number in order to proceed.",
	ERR_INVALID_CVV_LENGTH_PAYMENT : "CVV/CVC can\'t be less than 3 digits",
	ERR_INVALID_LOGIN_ERROR: "Invalid Date of Birth",
	ERR_INVALID_EMAILID: "Invalid Email",
	MESSAGE_NICK_NAME_CANT_BE_EMPTY : 'Nick name can\'t be empty',
	DEFAULT_ERR_MESSAGE: 'This service is temporarily unavailable. We apologise for any inconvenience caused.  Please try again later.',
	DEFAULT_ERR_MESSAGE_2: 'This service is temporarily unavailable. We apologise for any inconvenience caused.  Please try again later!',
	ERR_QUANTITY_NUMBER: "Only valid NUMBERS are allowed for Redeem Quantity",
	ERR_QUANTITY_EMPTY: 'We are unable to process your request. Please enter your desired quantity in order to proceed.',
	ERR_WRONG_INFORMATION: "We are unable to process your request due to incorrect information.  Please check the details and try again.",
	ERR_REFUND_FAIL: "Refund fail! Please contact the admin for more detail.",
	VALID_MESSAGE: "Valid",
	ERR_NOT_READY_REDEEM: "This item not ready to redeem",
	ERR_NOT_ENOUGH_BIRTHDAY_BALANCE: "You have exceeded the birthday month cap. The promotional price is not available for the quantity you have selected. Please select an alternative item at full price. Kindly contact our customer service officiers for assistance.",
	ERR_RI_BIRTHDAY_BALANCE: "We are unable to process your request as you have exceeded the RI birthday month cap.  The promotional price is not available for the quantity you have selected for the RI Birthday item(s). Please select an alternative item at full price in order to proceed.",
	ERR_CONFIRM_USE_FULLPRICE: "Do you want to redeem it with full price?",
	ERR_DECREASE_QUANTITY: "You should decrease the quantity to redeem this item",
	ERR_SESSION_EXPIRED: "Your session has expired. Please log in again!",
	ERR_INVALID_LOGIN_ERROR_DESCRIPTION: "We are unable to process your request. Please enter a valid 16-digit Card Number and Date of Birth in order to proceed.",
	ERR_ITEM_NOT_ENROLL: "We are unable to process your request as there are items in your cart which requires programme enrolment. Please log in via online banking for enrolment prior to performing this redemption.",
	ERR_ITEM_NOT_ENROLL_CART: "We are unable to process your request. Please modify your cart in order to proceed with checkout.",
	MESSAGE_REDEMPTION_SUCCESS: "You have successfully redeemed the items below:",
	MESSAGE_MAX_QUANTITY: "Max allowed quantity = ",
    EMPTY_EMAIL_GROUP: "You have to choose email group to create request",
    EMPTY_TARGET: "You have to choose target to create request",
    EMPTY_PROMOTION_TARGET: "You have to choose promotion target to create request",
    EMPTY_FIELD: "Please fill in required fields",
	MESSAGE_ENROLL_SUCCESS: (enrollmentID, enrollmentTitle)=>{
		let message = `Thank you for enrolling into Maybank Frequent Flyer Programme with your ${enrollmentTitle} membership details.`;
		if(enrollmentID == "DD"){
			message = `Thank you for enrolling into Maybank DUO Programme with your membership details. You may proceed with your Item Redemption.`;
		}else if(enrollmentID == "KF"){
			message = `Thank you for enrolling into Maybank Frequent Flyer Programme with your KrisFlyer membership details.`;
		}
		return message;
	},
	ERR_NOT_ENOUGH_QUANTITY_ITEM_DETAIL: (maxQuantity)=>{
		return `Max allowed quantities per transaction (${maxQuantity}) has been reached already for this item`
	},
	ERR_INSUFFICIENT_POINTS: "You have insufficient points for this redemption. Please modify your cart to proceed with checkout.",
	ERR_REQUIRED_LOGIN: "Please login with a valid 16-digit Card Number and Date of Birth in order to proceed.",
	ERR_NO_ITEM_IN_CART: "We are unable to process your request as your cart is empty. Please modify your cart in order to proceed with checkout.",
	ERR_REDEMPTION_DECLINED: "We are unable to process your request. Please modify your cart in order to proceed with checkout.",
	ERR_FIELD_REQUIRED: "This field is required.",
	MESSAGE_REDEMPTION: "Please do not close your app/browser, we are still processing your request. Kindly check your account history for the status of your redemption.",
    ERR_RL_REQUEST_NOT_FOUND: "Can not find RL request detail.",
    ERR_RM_NOT_FOUND: "Can not find RM detail.",
    ERR_TARGET_NOT_FOUND: "Can not find target detail."
};
