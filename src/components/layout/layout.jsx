import React from 'react';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TopNav from '../topNav/topNav.jsx';
import Footer from '../../components/layout/footer/footer.jsx';
import Alert from '../alert/alert.jsx';
import SideBar from './sideBar/sideBar.jsx';
import Loader from "../common/loader.jsx";

/********************************************************************************************************/

const Layout = function (props) {
    let isShowLoader = props.login.isRequestingLogin

    let checkAuthentication = props.isAuthenticated;
    return (
        <div>
            {
                isShowLoader ? (
                    <div className="modal-backdrop fade"></div>
                ) : null
            }
            <TopNav location={props.location}/>
            <div className="main-component">
                {/*{*/}
                    {/*checkAuthentication ? (*/}
                        {/*<SideBar/>*/}
                    {/*) : null*/}
                {/*}*/}
                <main className="">
                    {/*<ReactCSSTransitionGroup transitionName="routerTransition"*/}
                                             {/*transitionEnterTimeout={300}*/}
                                             {/*transitionLeave={false}>*/}
                    <div className="cover-div">
                        {props.children}
                        {/*<Footer/>*/}
                    </div>
                    {/*</ReactCSSTransitionGroup>*/}
                    {
                        props.login.isRequestingLogout ? (
                            <Loader isGlobal={false} isCurrentPage={true} isActive={true} size="medium" text=""/>
                        ) : null
                    }
                </main>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        login: state.login,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
