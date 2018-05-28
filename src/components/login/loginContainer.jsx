import React from "react";
import {connect} from "react-redux";
import * as loginActions from "./loginActions.js";
import { browserHistory } from 'react-router';
import {CONSTANTS} from "../../app/constant.js";

let { Component } = React;
/**********************************************************************************************************************/

class LoginContainer extends Component{
    componentWillMount(){
    	this.props.onComponentWillMount();
	}
	handleSignInClick() {
		this.props.onChange(this.refs.input_username.value.trim(), this.refs.input_password.value);
	}
	render() {
		return (
			<div className="login">
				<div className="login__box ui segment" style={{'pointerEvents': this.props.isShowLoader ? "none" : ""}}>
					<div className={this.props.isShowLoader ? "login__box__container ui active inverted dimmer" : "login__box__container"}>

						<h2 className="login__box__title">Login</h2>
						<div className="login__box__form" onSubmit={(e) => {e.preventDefault(); this.handleSignInClick();}}>
							<div className="ui loader"></div>
							<div className="ui fluid input login__input__container">
								<input
									type="text"
									placeholder="User Name"
									ref="input_username"
								/>
							</div>
							<div className="ui fluid input login__input__container">
								<input
									id="input_password"
									type={this.props.isShowPassword ? "text" : "password"}
									ref="input_password"
									placeholder="password"
								/>
							</div>
							<div className="login__warming__message">
								<span style={{display: this.props.errorMsg ? "" : "none"}}>{this.props.errorMsg}</span>
							</div>

							<div style={{width: '100%', textAlign: 'center', marginTop: 30}}>
								<button className="ui button primary-button login__button__signin" type="submit" onClick={(e) => {this.handleSignInClick();}}>Sign In</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// LoginContainer.propTypes = {};

const mapStateToProps = (state, ownProps) => {
	return {
        errorMsg: state.login.errorMsg,
        isShowLoader: state.login.isRequestingLogin,
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

        onChange: (username, password) => {
            dispatch(loginActions.loginUser(username, password));
        },
        onComponentWillMount:()=>{
        	// dispatch(loginActions.checkVersionNo());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
