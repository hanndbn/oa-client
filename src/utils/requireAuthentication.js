/*
A higher order componenet wrapper to wrap router level components that require authentication.
Usage: Wrap your components defined in router with requireAuthentication(component).
 */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as Helper from './helper.js';
import {CONSTANTS} from "../app/constant";
import {Link} from 'react-router';
/**********************************************************************************************************************/

//TODO: code not authorized component
const NotAuthorized = props => <div>Not Authorized</div>;
const NoPermission = props => <div className="notFound">
		<div className="notFound__bg">
			<div className="notFound__msgBox">
				<h3>Sorry, You don't have permission to access this page!</h3>
				<h3>Please click <Link to={'/' + CONSTANTS.PRE_PATH + "/"} activeClassName="active">here</Link> to return to the homepage.</h3>
			</div>
		</div>
	</div>;

let requireAuthentication = (Component, moduleId, rightList) => {
	class WrappedComponent extends React.Component {
		componentWillMount() {
			this.checkAuth();
		}
		componentWillReceiveProps(nextProps) {
			this.checkAuth();
		}
		checkAuth() {
			if (!this.props.isAuthenticated) {
				let pathname = this.props.location.pathname;
				browserHistory.push('/' + CONSTANTS.PRE_PATH + `/login?redirect=${pathname}`);
			} else {
                // if(moduleId && Helper.getAccessRightFromModuleRight(this.props.moduleRight, moduleId).view != CONSTANTS.MODULE_RIGHT_VALUE.YES) {
				// 	browserHistory.push('/' + CONSTANTS.PRE_PATH + `/noPermission`);
				// }
			}
		}
		getContent() {
			if(!this.props.isAuthenticated) {
                browserHistory.push('/' + CONSTANTS.PRE_PATH + `/login`);
				return <NotAuthorized />;
			} else {
				if(moduleId) {
					if(rightList) {
						let checkRight = false;
						rightList.map((right, idx)=>{
							if(Helper.getAccessRightFromModuleRight(this.props.moduleRight, moduleId)[right] == CONSTANTS.MODULE_RIGHT_VALUE.YES) {
								checkRight = true;
							}
						});
						if(checkRight) {
                            return <Component {...this.props} />;
						}
                        return <NoPermission />;
					} else if(Helper.getAccessRightFromModuleRight(this.props.moduleRight, moduleId).view == CONSTANTS.MODULE_RIGHT_VALUE.YES) {
                        return <Component {...this.props} />;
					}
					return <NoPermission />;
				} else {
					return <Component {...this.props} />;
				}
			}
		}
		render() {
			return (
					this.getContent()
			);
		}
	}
	const mapStateToProps = (state)=>{
		return {
			isAuthenticated: (state.login.isAuthenticated && localStorage.getItem(location.hostname+(location.port ? ':'+location.port: '') + 'jwt-token')),
			username: state.login.username,
			token: state.login.token,
			accountType: state.login.accountType,
			moduleRight: state.login.moduleRight
		}
	};
	return connect(mapStateToProps)(WrappedComponent);
};

export default requireAuthentication;
