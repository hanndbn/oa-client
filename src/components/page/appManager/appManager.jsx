import React from "react";
import {connect} from "react-redux";
let {Component} = React;
import request from 'request';
import * as appManagerActions from "./appManagerActions.js";
import {Modal, Button} from "react-bootstrap";
/**********************************************************************************************************************/
class AppManager extends Component {
    componentWillMount() {
        this.props.init();
    }

    editApp(){
        let app = "";
        let newApp= "";
        if(this.props.modalType == 'A'){
            app = this.refs.app.value.trim();
        }else if(this.props.modalType == 'E'){
            app = this.refs.app.value.trim();
            newApp = this.refs.newApp.value.trim();
        }else{
            app = this.props.currentApp;
        }
        this.props.editApp(app, newApp, this.props.modalType);
    }
    showModal(app, modalType){
        this.props.setCurrentApp(app);
        this.props.setModalType(modalType);
    }
    render() {
        return (
            <div>
                <div className="bg-info">App Manger</div>
                <div className="container">
                    <div className="row">
                        <div className="form-group w-100 action-panel">
                            <div className="col-6 d-inline-block no-gutters">
                                <input className="form-control d-inline" ref="searchTxt"/>
                            </div>
                            <div className="col-6 d-inline-flex">
                                <button className="btn btn-primary btn-xs pull-right" onClick={()=>this.props.searchApp(this.refs.searchTxt.value.trim())}>Search</button>
                                <button className="btn btn-primary btn-xs pull-right" onClick={()=>this.props.setModalType("A")}>Add New</button>
                            </div>
                        </div>
                        <table id="mytable" className="table table-bordred table-striped">
                            <thead>
                            <th>STT</th>
                            <th>App ID</th>
                            <th>App Name</th>
                            <th>Date Created</th>
                            <th>Last Updated</th>
                            <th>Number Used</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            {
                                this.props.appList.map((data, idx)=>{
                                    return <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{data.id}</td>
                                        <td>{data.app}</td>
                                        <td>{data.timeCreated}</td>
                                        <td>{data.lastUpdated}</td>
                                        <td></td>

                                        <td>
                                            <div className="d-inline">
                                                <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Edit">
                                                    <button className="btn btn-warning btn-xs" onClick={()=>this.showModal(data.app, "E")}><span className="glyphicon glyphicon-pencil"/>
                                                    </button>
                                                </p>
                                                <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Delete">
                                                    <button className="btn btn-danger btn-xs" onClick={()=>this.showModal(data.app, "D")}><span
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
                        <Modal.Title>Add Sharing App</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.errorMsgModal ? <div className="alert-danger">{this.props.errorMsgModal}</div> : ""}
                        {
                            (this.props.modalType == 'A') ?
                                <div className="form-group">
                                    <label htmlFor="app">App</label>
                                    <input id="app" className="form-control" ref="app"/>
                                </div>
                                :
                                this.props.modalType == 'E' ?
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="app">App</label>
                                            <input id="app" className="form-control" value={this.props.currentApp} disabled={true} ref="app"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="app">New App</label>
                                            <input id="newApp" className="form-control" ref="newApp"/>
                                        </div>
                                    </div>
                                :
                                <div>
                                    Do you want delete this app?
                                </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" onClick={()=>{this.editApp()}}>{this.props.modalType == 'E' ? 'Save': this.props.modalType == 'D' ? 'Delete' : 'Add'}</Button>
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
        errorMsg: state.appManager.errorMsg,
        errorMsgModal: state.appManager.errorMsgModal,
        isShowLoader: state.appManager.isRequestingLogin,
        appList: state.appManager.appList,
        showModal: state.appManager.showModal,
        modalType: state.appManager.modalType,
        currentApp: state.appManager.currentApp,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
            dispatch(appManagerActions.requestAppList());
        },
        searchApp: (searchTxt) => {
            dispatch(appManagerActions.requestAppList(searchTxt));
        },
        setShowModal: (showModal)=>{
            dispatch(appManagerActions.setShowModal(showModal));
        },
        setModalType: (modalType)=>{
            dispatch(appManagerActions.setModalType(modalType));
            dispatch(appManagerActions.setShowModal(true));
        },
        setCurrentApp: (currentApp)=>{
            dispatch(appManagerActions.setCurrentApp(currentApp));
        },
        editApp: (app, newApp, modalType)=>{
            dispatch(appManagerActions.requestEditApp(app, newApp, modalType));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppManager);
