import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
/********************************************************************************************************/

class Loader extends React.Component {
	getLoaderBoxClass() {
		let className = '';
		if(this.props.isGlobal) {
			className = "loader-box-global";
		} else {
			className = "loader-box";
		}
		if(this.props.isCurrentPage) {
			className = '';
		}
		if(!this.props.isDimmer) {
			className += " loader-box-none-bgr";
		}
		return className;
	}
	getLoaderClass() {
		let loaderClass = this.props.isCurrentPage ? "ui dimmer active inverted" : "ui dimmer active";
		if(!this.props.isDimmer) {
			loaderClass = "ui active inverted dimmer";
		}
		return loaderClass;
	}
	render() {
		return (
			<div className="loader-component">
				{
					this.props.isActive ? (
							<div className={this.getLoaderBoxClass()}>
								<div className="ui segment">
									<div className={this.getLoaderClass()}>
										<div className={"ui text loader " + this.props.size}>{this.props.text}</div>
									</div>
									{ this.props.children }
								</div>
							</div>
						) : ('')
				}
			</div>
		)
	}
}

Loader.propTypes = {
	isGlobal: PropTypes.bool,
	isCurrentPage: PropTypes.bool,
	isActive: PropTypes.bool,
	text: PropTypes.string,
	size: PropTypes.string,
	isDimmer: PropTypes.bool
};

Loader.defaultProps = {
	isGlobal: false,
	isCurrentPage: false,
	isActive: false,
	text: '',
	size: 'medium',
	isDimmer: true
};

const mapStateToProps = (state, ownProps)=> {
	return {}
};

const mapDispatchToProps = (dispatch) => {
	return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
