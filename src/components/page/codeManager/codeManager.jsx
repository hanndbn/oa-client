import React from "react";
import {connect} from "react-redux";
let {Component} = React;
import request from 'request';
import * as codeManagerActions from "./codeManagerActions.js";
import * as appManagerActions from "../appManager/appManagerActions.js";
import {Modal, Button, DropdownButton, MenuItem} from "react-bootstrap";

/**********************************************************************************************************************/
class CodeManager extends Component {
    componentWillMount() {
        this.props.init();
    }

    editCode(){
        let code = "";
        let newCode= "";
        if(this.props.modalType == 'A'){
            code = this.refs.code.value.trim();
        }else if(this.props.modalType == 'E'){
            code = this.refs.code.value.trim();
            newCode = this.refs.newCode.value.trim();
        }else{
            code = this.props.currentCode;
        }
        this.props.editCode(code, newCode, this.props.modalType);
    }
    showModal(code, modalType){
        this.props.setCurrentCode(code);
        this.props.setModalType(modalType);
    }
    render() {
        return (
            <div>
                <div className="bg-info">Code Manger</div>
                <div className="container">
                    <div className="row">
                        <div className="form-group w-100 action-panel">
                            <div className="col-2 d-inline-block no-gutters">
                                <DropdownButton
                                    bsStyle="primary"
                                    title={this.props.currentCode ? this.props.currentCode.app :  "Choose App Id"}
                                    key="123"
                                    id="123"
                                >
                                    {
                                        this.props.appList.map((data, idx)=>{
                                        return <MenuItem key={idx} eventKey={idx} onClick={()=>this.props.setCurrentCode({id: data.id, app: data.app})}>{data.app}</MenuItem>
                                    })}
                                </DropdownButton>
                            </div>

                            <div className="col-6 d-inline-block no-gutters">
                                <input className="form-control d-inline" ref="searchTxt"/>
                            </div>
                            <div className="col-4 d-inline-flex">
                                <button className="btn btn-primary btn-xs pull-right" onClick={()=>this.props.searchCode(this.refs.searchTxt.value.trim())}>Search</button>
                                <button className="btn btn-primary btn-xs pull-right" onClick={()=>this.props.setModalType("A")}>Add New</button>
                            </div>
                        </div>
                        <table id="mytable" className="table table-bordred table-striped">
                            <thead>
                            <th>STT</th>
                            <th>Code</th>
                            <th>Date Created</th>
                            <th>Last Updated</th>
                            <th>Number Used</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            {
                                this.props.codeList.map((data, idx)=>{
                                    return <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{data.code}</td>
                                        <td>{data.timeCreated}</td>
                                        <td>{data.lastUpdated}</td>
                                        <td></td>

                                        <td>
                                            <div className="d-inline">
                                                <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Edit">
                                                    <button className="btn btn-warning btn-xs" onClick={()=>this.showModal(data.code, "E")}><span className="glyphicon glyphicon-pencil"/>
                                                    </button>
                                                </p>
                                                <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Delete">
                                                    <button className="btn btn-danger btn-xs" onClick={()=>this.showModal(data.code, "D")}><span
                                                        className="glyphicon glyphicon-trash"/></button>
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal show={this.props.showModal} onHide={()=>this.props.setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Sharing Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.errorMsgModal ? <div className="alert-danger">{this.props.errorMsgModal}</div> : ""}
                        {
                            (this.props.modalType == 'A') ?
                                <div className="form-group">
                                    <label htmlFor="code">Code</label>
                                    <input id="code" className="form-control" ref="code"/>
                                </div>
                                :
                                this.props.modalType == 'E' ?
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="code">Code</label>
                                            <input id="code" className="form-control" value={this.props.currentCode} disabled={true} ref="code"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="code">New Code</label>
                                            <input id="newCode" className="form-control" ref="newCode"/>
                                        </div>
                                    </div>
                                :
                                <div>
                                    Do you want delete this code?
                                </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" onClick={()=>{this.editCode()}}>{this.props.modalType == 'E' ? 'Save': this.props.modalType == 'D' ? 'Delete' : 'Add'}</Button>
                        <Button className="btn btn-danger" onClick={()=>this.props.setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

// RLRequest.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    // console.log("state:", state.rlRequest);
    return {
        errorMsg: state.codeManager.errorMsg,
        errorMsgModal: state.codeManager.errorMsgModal,
        isShowLoader: state.codeManager.isRequestingLogin,
        codeList: state.codeManager.codeList,
        appList: state.appManager.appList,
        showModal: state.codeManager.showModal,
        modalType: state.codeManager.modalType,
        currentCode: state.codeManager.currentCode,
        currentApp: state.codeManager.currentApp,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
            dispatch(codeManagerActions.setCurrentCode(""));
            //dispatch(codeManagerActions.requestCodeList());
            dispatch(appManagerActions.requestAppList());
        },
        searchCode: (searchTxt) => {
            dispatch(codeManagerActions.requestCodeList(searchTxt));
        },
        setShowModal: (showModal)=>{
            dispatch(codeManagerActions.setShowModal(showModal));
        },
        setModalType: (modalType)=>{
            dispatch(codeManagerActions.setModalType(modalType));
            dispatch(codeManagerActions.setShowModal(true));
        },
        setCurrentCode: (currentCode)=>{
            dispatch(codeManagerActions.setCurrentCode(currentCode));
            dispatch(codeManagerActions.requestCodeList(currentCode.app));
        },
        editCode: (code, newCode, modalType)=>{
            dispatch(codeManagerActions.requestEditCode(code, newCode, modalType));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CodeManager);
