import React from "react";
import {connect} from "react-redux";
import numeral from "numeral";
import Loader from "../../common/loader.jsx";
import * as loginAction from '../../login/loginActions';
import { logoutUser } from '../../logout/logoutAction.js';

let {Component} = React;

class ProfileMenu extends Component {
    componentDidMount(){
        // document.getElementById('input_id').value = 'CARD7923001J';
        // document.getElementById('input_dob').value = '17/04/1994';
    }
    render() {
        let t = (e)=>{
            this.props.toggleProfileMenu(e, false, t);
        };
        if(this.props.isShowProfileDetailComponent) {
            document.addEventListener('click', t, true);
        } else {
            document.removeEventListener('click', t, true);
        }
        let styleLogin = this.props.isShowProfileDetailComponent ?
            {
                display: '',
            }
            :
            {
                display: 'none',
            };
        return (
            <div id="profile-detail-component" className="profile-menu-component w3-animate-fading" style={styleLogin}>
                <div>
                    <div className="custom-btn-1 logout-btn" onClick={(e)=>{this.props.logout()}}>LOGOUT</div>
                </div>
            </div>
        );
    }
}

ProfileMenu.propTypes = {
};

const mapStateToProps = (state, ownProps) => {
    return {
        isShowProfileDetailComponent: state.login.isShowProfileDetailComponent
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProfileMenu:(e, status, t)=>{
            if(!e) {
                dispatch(loginAction.toggleProfileMenu(status));
                document.removeEventListener('click', t, true);
                return;
            }
            const v = document.getElementById("profile-detail-component");
            if(!v) {
                return;
            }
            if(!v.contains(e.target)) {
                // if(e.target.className != "profile-icon") {
                dispatch(loginAction.toggleProfileMenu(status));
                document.removeEventListener('click', t, true);
                // }
            }
        },
        logout: () => {
            dispatch(logoutUser());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
