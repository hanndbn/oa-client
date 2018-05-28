import React from "react";
import {Router, Link, browserHistory} from "react-router";
import {connect} from "react-redux";
import { CONSTANTS } from '../../../app/constant.js';

class Footer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="footer-com">
                <div className="footer container">
                    {/*<div className="col-xs-12 footer-label">©1999 - 2018. OneEmpower Pte Ltd. All rights reserved.</div>*/}
                    <div className="col-xs-12 footer-label">WARNING: Use of this system is restricted to individuals and activities
                        authorised by the management. Unauthorised use may
                        result in appropriate disciplinary action and/or legal prosecution.</div>

                    {/*<ul className="col-xs-6 link-list">*/}
                        {/*<li>*/}
                            {/*<Link to={this.props.config.listConfiguration.urlTermOfUse} target="_blank">*/}
                                {/*<span>Terms and conditions</span>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<Link to={this.props.config.listConfiguration.urlLegalNoticesPrivacy} target="_blank">*/}
                                {/*<span>Legal Notices Privacy</span>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<Link to={this.props.config.listConfiguration.urlSecurity} target="_blank">*/}
                                {/*<span>Security</span>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*<Link to={this.props.config.listConfiguration.urlFAQ} target="_blank">*/}
                                {/*<span>FAQ</span>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                            {/*/!*<Link to={this.props.config.listConfiguration.urlSiteMap} target="_blank">*!/*/}
                            {/*<Link to={'/' + CONSTANTS.PRE_PATH + "/SiteMap"}>*/}
                                {/*<span>Site Map</span>*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                    {/*</ul>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
