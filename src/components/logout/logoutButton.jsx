import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from './logoutAction.js';

const Logout = (props) => <a className="log-out-btn" href="javascript:void(0)" onClick={props.onClick}>Logout</a>

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: ()=>{
			dispatch(logoutUser());
		}
	}
}

const LogoutButton = connect(null,mapDispatchToProps)(Logout);

export default LogoutButton;


