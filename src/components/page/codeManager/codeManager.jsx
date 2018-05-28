import React from "react";
import {connect} from "react-redux";
let {Component} = React;
/**********************************************************************************************************************/
class RLRequest extends Component {
    render() {
        return (
            <div>
                <div>Code Manger</div>
                <div className="container">
                    <div className="row">
                        <table id="mytable" className="table table-bordred table-striped">
                            <thead>
                            <th>STT</th>
                            <th>Code</th>
                            <th>Date Created</th>
                            <th>Number Used</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>132456789</td>
                                <td>2016/02/01</td>
                                <td>200</td>
                                <td>
                                    <div className="d-inline">
                                        <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Edit">
                                            <button className="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal"
                                                    data-target="#edit"><span className="glyphicon glyphicon-pencil"/>
                                            </button>
                                        </p>
                                        <p className="col-6 d-inline" data-placement="top" data-toggle="tooltip" title="Delete">
                                            <button className="btn btn-danger btn-xs" data-title="Delete"
                                                    data-toggle="modal" data-target="#delete"><span
                                                className="glyphicon glyphicon-trash"/></button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

// RLRequest.propTypes = {};

const mapStateToProps = (state, ownProps) => {
    // console.log("state:", state.rlRequest);
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(RLRequest);
