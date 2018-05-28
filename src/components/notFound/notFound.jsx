import React from 'react'; 
import {Link} from 'react-router';
import {CONSTANTS} from "../../app/constant.js";

export default function(props) {
	return (
		<div className="notFound">
			<div className="notFound__bg">
				<table className="notFound-header">
					<tbody>
					<tr>
						<td colSpan="2" height="80">
							<img height="80" src={'/' + CONSTANTS.PRE_PATH + "/assets/mblogo-popup.jpg"} width="273"/>
						</td>
					</tr>
					</tbody>
				</table>
				<div className="notFound__msgBox">
					<h3>Sorry, the webpage cannot be found</h3>
					<h3>Please click <Link to={'/' + CONSTANTS.PRE_PATH + "/"} activeClassName="active">here</Link> to return to the homepage.</h3>
				</div>
			</div>
		</div>
	)
}