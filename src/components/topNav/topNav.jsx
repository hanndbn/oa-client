import React from "react";
import {Router, Link} from "react-router";
import {connect} from "react-redux";
import LogoutButton from "../logout/logoutButton.jsx";
import classNames from "classnames";
import {filter as _filter} from "lodash";
import ProfileMenu from './profileMenu/profileMenu.jsx';
import * as loginAction from '../login/loginActions';
import {CONSTANTS} from "../../app/constant.js";
/**********************************************************************************************************************/
function isActive(link, pathname) {
    return link === getFirstPath(pathname);
}

function getFirstPath(pathname) {
    //normalise pathname
    if (pathname.charAt(0) !== '/')
        pathname = `/${pathname}`;
    let pathArray = pathname.split('/');
    return `/${pathArray[1]}`;
}

let mainRoutes = [
    {
        path: '/predictive_analytics',
        name: 'Predictive Analytics'
    },
    {
        path: '/campaign_manager',
        name: 'Campaign Manager'
    },
    {
        path: '/visual_analytics',
        name: 'Visual Analytics'
    }
];

class TopNav extends React.Component {
    componentDidMount() {
        this.addEventForNavToggler();
    }
    componentDidUpdate() {
        this.addEventForNavToggler();
    }
    addEventForNavToggler() {
        function resizeBroadcast() {
            var timesRun = 0;
            var interval = setInterval(function(){
                timesRun += 1;
                if(timesRun === 5){
                    clearInterval(interval);
                }
                window.dispatchEvent(new Event('resize'));
            }, 62.5);
        }
        /* ---------- Main Menu Open/Close, Min/Full ---------- */
        $('.navbar-toggler').unbind('click');
        $('.navbar-toggler').on('click', function(){

            if ($(this).hasClass('sidebar-toggler')) {
                $('body').toggleClass('sidebar-hidden');
                resizeBroadcast();
            }

            if ($(this).hasClass('aside-menu-toggler')) {
                $('body').toggleClass('aside-menu-hidden');
                resizeBroadcast();
            }

            if ($(this).hasClass('mobile-sidebar-toggler')) {
                $('body').toggleClass('sidebar-mobile-show');
                resizeBroadcast();
            }
        });
    }
    render() {
        let checkAuthentication = this.props.isAuthenticated && localStorage.getItem(location.hostname+(location.port ? ':'+location.port: '') + 'jwt-token');
        let topNavLogo = classNames('topNav__logo', {authenticated: checkAuthentication});
        let topNavCenter = classNames('topNav__center', {authenticated: checkAuthentication});
        let topNavRight = classNames('topNav__right', {authenticated: checkAuthentication});

        this.addEventForNavToggler();
        return (
            <header className="app-header navbar">
                {
                    checkAuthentication ? (
                        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button">☰</button>
                    ) : null
                }
                <a className="navbar-brand nav-logo-full" href={'/' + CONSTANTS.PRE_PATH}>SHARING CODE CMS</a>
                <ul className="nav navbar-nav d-md-down-none">
                    <li className="nav-item">
                        {
                            checkAuthentication ? (
                                <a className="nav-link navbar-toggler sidebar-toggler" href="#">☰</a>
                            ) : null
                        }
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item px-3">
                        {
                            checkAuthentication ? (
                                <div>

                                    <div className="profileMenuDiv" onClick={()=>{this.props.toggleProfileMenu()}}>
                                        <div className="user-image-nav-com">
                                            <img className="profile-icon" src={'/' + CONSTANTS.PRE_PATH + "/assets/user-avatar-default.png"}/>
                                        </div>
                                        <div className="username-div">{this.props.username}</div>
                                    </div>
                                    {/*<ProfileMenu/>*/}
                                </div>
                            ) : null
                        }
                    </li>
                </ul>
            </header>
        );
    }
};

const mapStateToProps = (state, ownProps)=> {
    return {
        isAuthenticated: state.login.isAuthenticated,
        username: state.login.username
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProfileMenu: ()=>{
            dispatch(loginAction.toggleProfileMenu());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);

