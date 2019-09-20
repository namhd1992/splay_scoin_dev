import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	login
} from '../../modules/login'


class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			scoin_token:'bGR5M50ZKlUCZs7D9AAWET7abuVZU0EKbdvBmIk%2bHKQg%2b0ajR3P49tOhMfmW%2b1Yt6NHLwoxgAIc%3d',
		};
	}

	componentWillMount(){
		this.setState({scoin_token: this.getParamValue("ud")})	
	}

	componentDidMount() {
		const {scoin_token}= this.state;
		var _this = this;
		this.props.login(scoin_token).then(function () {
			var data= _this.props.data;
			if(data.status==="01"){
				localStorage.setItem("user", JSON.stringify(data.data));
			}
		});
		
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


	render() {
		
		return (
			<div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.login.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
	login
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)