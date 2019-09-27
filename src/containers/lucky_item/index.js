import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
} from '../../modules/lucky'
import LuckyDetailComponent from '../../components/page/LuckyItem'

class Lucky_Item extends React.Component {

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
		this.props.getDetailData(idLucky, scoin_token);
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


	handleCloseSnack = () => {
		this.setState({ openSnack: false });
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
				<LuckyDetailComponent
						showItem={this.showItem}
						handleCloseSnack={this.handleCloseSnack}
						handleCloseDialogLogin={this.handleCloseDialogLogin}
						dataDetail={this.props.dataDetail}
						backLucky={this.backLucky}
						server={this.props.server}
						waiting={this.props.waiting}
						message={this.state.message}
						openSnack={this.state.openSnack}
						snackVariant={this.state.snackVariant}
						dialogLoginOpen={this.state.dialogLoginOpen}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataDetail: state.lucky.dataDetail,
	waiting: state.lucky.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Item)