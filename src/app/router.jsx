/*----------------------------------------------------------------------------
All route definitions are found here. Routing is done on the client by react-router.
 ----------------------------------------------------------------------------*/

import React from "react";
import {browserHistory, IndexRedirect, Route, Router} from "react-router";
// import {syncHistoryWithStore} from 'react-router-redux'

import Layout from "../components/layout/layout.jsx";
import LoginContainer from "../components/login/loginContainer.jsx";
import NotFound from "../components/notFound/notFound.jsx";
import NoPermission from "../components/noPermission/noPermission.jsx";
import codeManager from "../components/page/codeManager/codeManager.jsx";
import {CONSTANTS} from "./constant.js";
/**********************************************************************************************************************/

export default (
	<Router history={browserHistory} onUpdate={customHandler} createElement={addKeyToElement}>
		<Route component={Layout}>
			<Route path="/">
                <IndexRedirect to={CONSTANTS.PRE_PATH} />
                <Route path={CONSTANTS.PRE_PATH}>
                    <IndexRedirect to="login" />
                </Route>

				<Route path={CONSTANTS.PRE_PATH+"/login"} component={LoginContainer} key="login"/>
				{/*<Route path="SignUp" component={SignUp} key="SignUp"/>*/}
				{/*<Route path="ResetPassword" component={ResetPassword} key="ResetPassword"/>*/}
				{/*<IndexRedirect to={CONSTANTS.PRE_PATH+"/RLRequest"} />*/}
                {/*<Route path={CONSTANTS.PRE_PATH+"/Dashboard"} component={requireAuth(Dashboard)} key="Dashboard"/>*/}
                {/*<Route path={CONSTANTS.PRE_PATH+"/NewOARequest"} component={requireAuth(CreateOARequest, CONSTANTS.MODULE_ID.RL_REQUEST, ['add', 'change'])} key="NewOARequest"/>*/}
                <Route path={CONSTANTS.PRE_PATH+"/CodeManager"} component={codeManager} key="codeManager"/>
                {/*<Route path={CONSTANTS.PRE_PATH+"/OARecommendation"} component={requireAuth(RecommendationList, CONSTANTS.MODULE_ID.OA_RECOMMENDATION)} key="OARecommendation"/>*/}
                {/*<Route path="OfferManagement" component={requireAuth(OfferManagement)} key="OfferManagement"/>*/}
                {/*<Route path="OfferList" component={requireAuth(OfferList)} key="OfferList"/>*/}
                {/*<Route path="CreateOfferList" component={requireAuth(CreateOfferList)} key="CreateOfferList"/>*/}
                {/*<Route path={CONSTANTS.PRE_PATH+"/CreateTargetList"} component={requireAuth(CreateTargetList, CONSTANTS.MODULE_ID.TARGET_LIST, ['add', 'change'])} key="CreateTargetList"/>*/}
                {/*<Route path={CONSTANTS.PRE_PATH+"/TargetListView"} component={requireAuth(TargetListView, CONSTANTS.MODULE_ID.TARGET_LIST)} key="TargetListView"/>*/}
                {/*<Route path="OfferView" component={requireAuth(OfferView)} key="OfferView"/>*/}
                {/*<Route path="MRSMain" component={requireAuth(Dashboard)} key="MRSMain"/>*/}
                {/*<Route path="Logout" component={requireAuth(Dashboard)} key="Logout"/>*/}
				{/*<Route path="predictive_analytics" component={requireAuth(PredictiveAnalytics)} >*/}
					{/*<Route path="promote_products" component={requireAuth(PromoteProducts)} />*/}
					{/*<Route path="win_back" component={requireAuth(WinBack)} />*/}
					{/*<Route path="discoverNewCustomers" component={requireAuth(DiscoverNewCustomers, 1)} />*/}
					{/*<Route path="brandPromotion" component={requireAuth(BrandPromotion, 1)} />*/}
					{/*<Route path="upsell" component={requireAuth(Upsell, 1)} />*/}
					{/*<Route path="merchantPromotion" component={requireAuth(MerchantPromotion, 2)} />*/}
					{/*<Route path="churnMitigation" component={requireAuth(ChurnMitigation, 2)} />*/}
					{/*<Route path="crossSelling" component={requireAuth(CrossSelling, 2)} />*/}
				{/*</Route>*/}
				{/*<Route path="campaign_manager" component={requireAuth(CampaignManager)}/>*/}



			</Route>
		</Route>
		<Route path={CONSTANTS.PRE_PATH+"/noPermission"} component={NoPermission} key="noPermission"/>
		<Route path={CONSTANTS.PRE_PATH+"/notFound"} component={NotFound} key="notFound"/>
		<Route path="*" component={NotFound} />
  </Router>

)

function addKeyToElement(Component, props) {
	return <Component key={`${props.route.path}`} {...props} />
};

function customHandler(previousRoute, nextRoute) {
    $( ".swal-overlay" ).remove()
}
