import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
	pickCard,
	buyTurn
} from '../../modules/lucky'
import {
	getData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import LuckyBuyTurnComponent from '../../components/page/LuckyBuyTurn'

class Lucky_BuyTurn extends React.Component {

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
		var user = JSON.parse(localStorage.getItem("user"));
		var idLucky= localStorage.getItem("idLucky");
		// if (user !== null) {
		// 	this.props.getDetailData(user.access_token, idLucky);
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }
		this.props.getDetailData(idLucky);
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

	buyTurn = (turn) => {
		var _this = this;
		const {scoin_token}= this.state;
		// var user = JSON.parse(localStorage.getItem("user"));
		var idLucky= localStorage.getItem("idLucky");
		var spin_name=this.props.dataDetail.data.luckySpin.name;
		// this.props.buyTurn(user.access_token, user.scoinAccessToken, idLucky, turn).then(function () {
		// 	if (_this.props.dataTurn.statusCode === "T") {
		// 		_this.setState({ openSnack: true, message: "Mua lượt thành công", snackVariant: "success" });
		// 	} else {
		// 		_this.setState({ openSnack: true, message: "Số thịt không đủ", snackVariant: "error" });
		// 	}
		// 	_this.props.getDetailData(user.access_token,idLucky);
		// 	// _this.props.getData(user.access_token, user.scoinAccessToken);
		// });

		this.props.buyTurn(idLucky, turn, spin_name, scoin_token).then(function () {
			if (_this.props.dataTurn.status === "01") {
				_this.setState({ openSnack: true, message: "Mua lượt thành công", snackVariant: "success" });
			} else {
				_this.setState({ openSnack: true, message: "Số thịt không đủ", snackVariant: "error" });
			}
			_this.props.getDetailData(idLucky, scoin_token);
		});
	}

	showItem = () => {
		this.setState({ dialogItemOpen: true });
	}
	notSelectOption=()=>{
		this.setState({ openSnack: true, message: "Bạn chưa chọn gói", snackVariant: "error" });
	}
	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	};

	backLucky=()=>{
		var idLucky= localStorage.getItem("idLucky");
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckydetail`,
		);
	}

	render() {
		
		return (
			<div>
				<LuckyBuyTurnComponent
					showItem={this.showItem}
					buyTurn={this.buyTurn}
					handleCloseSnack={this.handleCloseSnack}
					notSelectOption={this.notSelectOption}
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
	dataTurn: state.lucky.dataTurn,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	pickCard,
	buyTurn,
	getData,
	changeTitle,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_BuyTurn)