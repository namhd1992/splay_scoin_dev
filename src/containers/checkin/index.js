import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/checkin.css'
import {
	getData,
	checkin
} from '../../modules/checkin'
import {
	changeTitle
} from '../../modules/global'

import CheckinComponent from '../../components/page/Checkin'


class Checkin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogLoginOpen: false,
			scoin_token:'bGR5M50ZKlUCZs7D9AAWET7abuVZU0EKbdvBmIk%2bHKQg%2b0ajR3P49tOhMfmW%2b1Yt6NHLwoxgAIc%3d',
		};
	}
	componentWillMount(){
		var scoin_token=this.getParamValue("ud");
		if(scoin_token!=="" && scoin_token!==undefined){
			this.setState({scoin_token: scoin_token})
		}		
	}

	componentDidMount() {
		const {scoin_token}= this.state;
		// var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		this.props.getData(scoin_token).then(function () {
			_this.props.changeTitle("ĐIỂM DANH");
		});
		// if (user !== null) {
			
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }
	}
	getParamValue=(key)=>
	{
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) 
		{
			var pArr = qArray[i].split('=');
			if (pArr[0] === key) 
				return pArr[1];
		}
	}


	checkin = () => {
		var _this = this;
		const {scoin_token}= this.state;
		// var user = JSON.parse(localStorage.getItem("user"));
		this.props.checkin(scoin_token).then(function () {
			_this.props.getData(scoin_token);
		});
	}

	render() {
		
		return (
			<div>
				<CheckinComponent
					checkin={this.checkin}
					server={this.props.server}
					data={this.props.data}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.checkin.data,
	actiondata: state.checkin.actiondata,
	waiting: state.checkin.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	checkin,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Checkin)