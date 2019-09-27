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