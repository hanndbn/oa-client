import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function mapAlertClass(alertType) {
	switch(alertType){
		case 'error':
			return 'negative';
		case 'success':
			return 'positive';
		default: 
			return 'info';
	}
}
const Alert = function(props){
	let alerts = props.alerts.map((alert)=>{
		let alertClass = 'ui message ' + mapAlertClass(alert.alertType);
		return (<div key={alert.id} className={alertClass}>{alert.text}</div>)
	});
	return (
		<div className="alerts">
			<ReactCSSTransitionGroup transitionName="alert" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {alerts}
      </ReactCSSTransitionGroup>
		</div>
	)
}

const mapStateToProps = (state)=> {
	return {
		alerts: state.alerts
	}
}

export default connect(mapStateToProps)(Alert);