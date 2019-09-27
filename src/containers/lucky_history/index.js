import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	history,
} from '../../modules/lucky'

import HistoryBonusComponent from '../../components/page/HistoryBonus'

class Lucky_History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			openSnack: false,
			snackVariant: "info",
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
		var _this = this;
		const {scoin_token}= this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		var idLucky= localStorage.getItem("idLucky");
		// if (user !== null) {
		// 	this.props.getDetailData(user.access_token, idLucky);
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }
		this.props.history(idLucky, 'ALL', scoin_token);
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


	backLucky=()=>{
		
		var idLucky= localStorage.getItem("idLucky");
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckydetail/`+idLucky,
		);
	}

	render() {
		
		return (
			<div>
				<HistoryBonusComponent
					notSelectOption={this.notSelectOption}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					dataHistory={this.props.dataHistory}
					backLucky={this.backLucky}
					server={this.props.server}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataHistory: state.lucky.dataHistory,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	history,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_History)