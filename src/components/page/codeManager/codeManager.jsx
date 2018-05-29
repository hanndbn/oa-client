import React from "react";
import {connect} from "react-redux";
let {Component} = React;
import request from 'request';
import * as codeManagerActions from "./codeManagerActions.js";
import {Modal, Button} from "react-bootstrap";
/**********************************************************************************************************************/
class CodeManager extends Component {
    componentWillMount() {
        this.props.init();
    }
    render() {
        return (
            <div>
                <div className="bg-info">Code Manger</div>
                <div className="container">
                    <div className="row">
                        <div className="form-group w-100 action-panel">

                            <div className="col-6 d-inline-block no-gutters">
                                <input className="form-control d-inline"/>
                            </div>
                            <div className="col-6 d-inline-flex">
                                <button className="btn btn-primary btn-xs pull-right" onClick={()=>this.props.setModalType("A")}>Search</button>
                                <button className="btn btn-primary btn-xs pull-right" onClick={()=>this.props.setModalType("A")}>Add New</button>
                            </div>
                        </div>
                        <table id="mytable" className="table table-bordred table-striped">
                            <thead>
                            <th>STT</th>
                            <th>Code</th>
                            <th>Date Created</th>
                            <th>Number Used</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            {
                                this.props.codeList.map((data, idx)=>{
                                    return <tr key={idx}>
                                        <td>{idx}</td>
                                        <td>{data.code}</td>
                                        <td>{data.timeCreated}</td>
                                        <td></td>
                                        <td>
                                            <div className="d-inline">
                                                <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Edit">
                                                    <button className="btn btn-warning btn-xs" onClick={()=>this.props.setModalType("E")}><span className="glyphicon glyphicon-pencil"/>
                                                    </button>
                                                </p>
                                                <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Delete">
                                                    <button className="btn btn-danger btn-xs" onClick={()=>this.props.setModalType("D")}><span
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

                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" onClick={this.handleClose}>Submit</Button>
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
        isShowLoader: state.codeManager.isRequestingLogin,
        codeList: state.codeManager.codeList,
        showModal: state.codeManager.showModal,
        modalType: state.codeManager.modalType
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
            dispatch(codeManagerActions.requestCodeList());
        },
        setShowModal: (showModal)=>{
            dispatch(codeManagerActions.setShowModal(showModal));
        },
        setModalType: (modalType)=>{
            dispatch(codeManagerActions.setModalType(modalType));
            dispatch(codeManagerActions.setShowModal(true));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CodeManager);
