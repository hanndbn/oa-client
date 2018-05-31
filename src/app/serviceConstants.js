import {CONSTANTS} from "./constant.js";
//export const WEBSERVICE_URL = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+'/'+CONSTANTS.PRE_PATH;
// export const WEBSERVICE_URL = 'http://localhost:8099';

export const WEBSERVICE_URL = 'http://localhost:5000/sharingcodeapp/us-central1/api/1.0';
// export const WEBSERVICE_URL = 'http://118.70.177.14:8443' +'/'+CONSTANTS.PRE_PATH;
console.log("WEBSERVICE_URL: ", WEBSERVICE_URL);


export const SOCKET_URL = 'http://localhost:9092';

// Authentication
export const CONST_SERVICE_URL_LOGIN 									= WEBSERVICE_URL + '/CheckLoginAdmin';
export const CONST_SERVICE_URL_GET_CODE 							    = WEBSERVICE_URL + '/GetListCode';
export const CONST_SERVICE_URL_EDIT_CODE 							    = WEBSERVICE_URL + '/EditCode';
export const CONST_SERVICE_URL_GET_APP 							        = WEBSERVICE_URL + '/GetListApp';
export const CONST_SERVICE_URL_EDIT_APP 							    = WEBSERVICE_URL + '/EditApp';




export const CONST_SERVICE_URL_LOGOUT 									= WEBSERVICE_URL + '/api/logout';
export const CONST_SERVICE_URL_CHECK_VERSION_NO 						= WEBSERVICE_URL + '/api/versionNo';

// Dashboard
export const CONST_GET_DASHBOARD_DATA                                   = WEBSERVICE_URL + '/api/getDashboardData';
export const CONST_CREATE_TARGET_LIST                                   = WEBSERVICE_URL + '/api/createTargetList';
export const CONST_APPROVE_TARGET_LIST                                  = WEBSERVICE_URL + '/api/approveTargetList';
export const CONST_GET_OFFER_LIST                                       = WEBSERVICE_URL + '/api/oaOffer';

// RL Request
export const CONST_GET_RL_REQUEST_LIST                                  = WEBSERVICE_URL + '/api/oaRequest';
export const CONST_GET_RL_REQUEST_DETAIL                                = WEBSERVICE_URL + '/api/oaRequestDetail';
export const CONST_APPROVE_RL_REQUEST                                   = WEBSERVICE_URL + '/api/oaRequest/action';
export const CONST_GENERATE_REQUEST_ID                                  = WEBSERVICE_URL + '/api/generateOAId';
export const CONST_GET_EMAIL_GROUP_LIST                                 = WEBSERVICE_URL + '/api/common';
export const CONST_GET_TARGET_LIST                                      = WEBSERVICE_URL + '/api/common';
export const CONST_REQUEST_APPROVE_RL_REQUEST                           = WEBSERVICE_URL + '/api/oaRequest/definition';
export const CONST_RL_REQUEST_CREATE                                    = WEBSERVICE_URL + '/api/oaRequest/create';
export const CONST_RL_REQUEST_EDIT                                      = WEBSERVICE_URL + '/api/oaRequest/edit';

// OA Recommendation
export const CONST_GET_TARGET_LIST_BY_REQUEST_ID                        = WEBSERVICE_URL + '/api/oaTargetRequest';
export const CONST_REQUEST_RM_DETAIL                                    = WEBSERVICE_URL + '/api/rmInfo';
export const CONST_REQUEST_TARGET_DEFINITION                            = WEBSERVICE_URL + '/api/oaTargetRequest/definition';
export const CONST_REQUEST_TARGET_ACTION                                = WEBSERVICE_URL + '/api/oaTargetRequest/action';
export const CONST_REQUEST_TARGET_CHART                                 = WEBSERVICE_URL + '/api/oaTargetRequest/chart';
export const CONST_REQUEST_TARGET_CREATE                                = WEBSERVICE_URL + '/api/oaTargetRequest/create';
export const CONST_REQUEST_TARGET_EDIT                                  = WEBSERVICE_URL + '/api/oaTargetRequest/edit';