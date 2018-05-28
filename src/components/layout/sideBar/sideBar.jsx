import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {CONSTANTS} from "../../../app/constant.js";
import * as Helper from "../../../utils/helper.js";
/********************************************************************************************************/

class SideBar extends React.Component {
    render() {
        let moduleList = [];
        if(this.props.moduleList && this.props.moduleList.length > 0) {
            this.props.moduleList.map((module, idx)=>{
                if(module.view == CONSTANTS.MODULE_RIGHT_VALUE.YES && moduleListObject[module.idFix]) {
                    moduleList.push(moduleListObject[module.idFix]);
                }
            });
        }
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li key={'Code'} className="nav-item">
                            <Link to={'/Code'} className="nav-link" activeClassName="active"
                                  onClick={(e)=>{
                                      this.props.onClickDashboard();
                                  }}
                            >Code</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    	mrsLink: state.login.mrsLink,
        rlRequestAccessRight: Helper.getAccessRightFromModuleRight(state.login.moduleRight, CONSTANTS.MODULE_ID.RL_REQUEST),
        oaRecommendationAccessRight: Helper.getAccessRightFromModuleRight(state.login.moduleRight, CONSTANTS.MODULE_ID.OA_RECOMMENDATION)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

