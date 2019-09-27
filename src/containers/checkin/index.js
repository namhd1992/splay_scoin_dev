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
			scoin_token:'H1PuNJ%2bcoqqf5LuMQVl44l5tq2B%2fnmMeTd029tRUEkLfRZy9SjhIzcLJBKtAcAxHWOBqIXY2WHOv9d5FzFtkf3oMd3jxvY5sUqvL0C0YkfE8r1i%2bHEkZkOOUrt%2fdy7J3YNpuOeS5orOsWN8URIIP7iS%2f2qwFH4JXsuElWz4%2ffN6JGiMfLAvdFr53Dc2UQ%2fHb',
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