import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import '../../styles/lucky.css'
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
import Ultilities from '../../Ultilities/global'
import LuckyDetailComponent from '../../components/page/LuckyDetail'

class Lucky_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			cardWidth: 0,
			cardHeight: 0,
			flippedArr: [],
			collapse: false,
			cardArr: [],
			dialogOpen: false,
			highLightCard: null,
			canPlay: true,
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,
			dialogItemOpen: false,
			fontSize: "1em",
			dialogMoreTurnOpen: false,
			numberWidth:6,
			numberHeight:2,
			scoin_token:'H1PuNJ%2bcoqqf5LuMQVl44l5tq2B%2fnmMeTd029tRUEkLfRZy9SjhIzTX1qw5Zzx051XCVG3WDHaiv9d5FzFtkf0iZzGnW3kxYtOAaQRqItgVg8lF4LU25qqWX11zMJV5m%2byXnFt6xTHi8vygpLto476lX7Z6FHpY1jmYPgDCzyB%2buFEhIGqRgJL53Dc2UQ%2fHb',

		};
	}
	componentWillMount(){
		var scoin_token=localStorage.getItem("scoin_token");
		if(scoin_token!=="" && scoin_token!==undefined){
			this.setState({scoin_token: scoin_token})
		}		
	}

	componentDidMount() {
		var _this = this;
		const {scoin_token}= this.state;
		var idLucky = localStorage.getItem("idLucky");
		// var user = JSON.parse(localStorage.getItem("user"));
		// if (user !== null) {
		// 	this.props.getDetailData(user.access_token, this.props.match.params.id).then(function () {
		// 		if(_this.props.dataDetail!==null){
		// 			// _this.props.changeTitle(_this.props.dataDetail.data.luckyspin.name);
		// 			var new_arr = [];
		// 			_this.props.dataDetail.data.itemOfSpin.forEach(function (item, key) {
		// 				new_arr.push({ id: item.item.id, status: true });
		// 			});
		// 			_this.setState({ cardArr: _this.props.dataDetail.data.itemOfSpin, flippedArr: new_arr });
		// 		}
			
		// 	});
		// 	// this.props.getData(user.access_token, user.scoinAccessToken);
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }
		this.props.getDetailData(+idLucky, scoin_token).then(function () {
			if(_this.props.dataDetail!==undefined){
				// _this.props.changeTitle(_this.props.dataDetail.data.luckyspin.name);
				var new_arr = [];
				_this.props.dataDetail.data.itemOfSpin.forEach(function (item, key) {
					// console.log(_this.props.dataDetail)
					new_arr.push({ id: item.id, status: true });
				});
				_this.setState({ cardArr: _this.props.dataDetail.data.itemOfSpin, flippedArr: new_arr });
			}
		
		});
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	onResize = () => {
		if (window.innerWidth <= 480) {
			this.setState({ cardHeight: 114, cardWidth: 76, fontSize: "0.6em", numberWidth:4, numberHeight:3 });
		}
		if (window.innerWidth > 480 && window.innerWidth <= 768) {
			this.setState({ cardHeight: 200, cardWidth: 130, fontSize: "1em", numberWidth:4, numberHeight:3 });
		}
		if (window.innerWidth > 768 && window.innerWidth <= 1024) {
			this.setState({ cardHeight: 220, cardWidth: 120, fontSize: "0.8em", numberWidth:6, numberHeight:2 });
		}
		if (window.innerWidth > 1024) {
			this.setState({ cardHeight: 240, cardWidth: 150, fontSize: "1em", numberWidth:6, numberHeight:2 });
		}
	}

	openCard = (id) => {
		var _this = this;
		const {scoin_token}= this.state;
		var idLucky = localStorage.getItem("idLucky");
		// var user = JSON.parse(localStorage.getItem("user"));
		var new_arr = [];
		var new_arr_after = [];
		this.state.flippedArr.forEach(function (item, key) {
			if (item.id === id) {
				new_arr.push({ id: item.id, status: false });
			} else {
				new_arr.push({ id: item.id, status: true });
			}
			new_arr_after.push({ id: item.id, status: false });
		});
		_this.setState({ flippedArr: new_arr });
		setTimeout(function () {
			_this.setState({ flippedArr: new_arr_after, highLightCard: id, canPlay: true });
		}, 1000);
		// this.props.getDetailData(user.access_token, this.props.match.params.id)
		this.props.getDetailData(+idLucky, scoin_token)
	}

	random = () => {
		this.setState({ cardArr: Ultilities.shuffle(this.state.cardArr) });
	}

	highLight = (card_id) => {
		this.setState({ highLightCard: card_id });
	}

	unHighLight = () => {
		this.setState({ highLightCard: null });
	}

	swap = (id1, id2) => {
		var newCardArr = this.state.cardArr;
		var key1 = 0;
		var key2 = 0;
		this.state.cardArr.forEach(function (item, key) {
			if (item.id === id1) key1 = key;
			if (item.id === id2) key2 = key;
		});
		newCardArr[key1] = newCardArr.splice(key2, 1, newCardArr[key1])[0];
		this.setState({ cardArr: newCardArr });
	}

	flipCard = (key) => {
		var newFlippedArr = this.state.flippedArr;
		newFlippedArr[key] = false;
		this.setState({ flippedArr: newFlippedArr });
	}

	collapse = () => {
		this.setState({ collapse: true });
	}

	expand = () => {
		this.setState({ collapse: false });
	}

	start = () => {
		if (this.props.dataDetail.data.userTurnSpin.turnsBuy + this.props.dataDetail.data.userTurnSpin.turnsFree <= 0) {
			this.setState({ dialogMoreTurnOpen: true });
		} else {
			if (this.state.canPlay) {
				var _this = this;
				var new_arr_after = [];
				this.state.flippedArr.forEach(function (item, key) {
					new_arr_after.push({ id: item.id, status: true });
				});
				_this.setState({ flippedArr: new_arr_after });
				this.collapse();
				this.random();
				this.unHighLight();
				setTimeout(function () {
					_this.expand();
				}, 1000);
			}
		}
	}

	pick = (key) => {
		const {scoin_token}= this.state;
		if (this.state.canPlay) {
			var _this = this;
			this.setState({ canPlay: false });
			// var user = JSON.parse(localStorage.getItem("user"));
			// this.props.pickCard(user.access_token, user.scoinAccessToken, this.props.match.params.id).then(function () {
			// 	if (_this.props.dataPick === null) {
			// 		_this.setState({ openSnack: true, message: "Bạn đã hết lượt quay", snackVariant: "error" });
			// 	} else {
			// 		_this.swap(key, _this.props.dataPick.item.id);
			// 		_this.openCard(_this.props.dataPick.item.id);
			// 		_this.setState({ openSnack: true, message: "Thành công, vào hộp thư để xem vật phẩm trúng thưởng", snackVariant: "success" });
			// 	}
			// 	_this.props.getDetailData(user.access_token, _this.props.match.params.id);
			// 	// _this.props.getData(user.access_token, user.scoinAccessToken);
			// });
			var idLucky = localStorage.getItem("idLucky");
			this.props.pickCard(+idLucky, scoin_token).then(function () {
				if (_this.props.dataPick === null) {
					_this.setState({ openSnack: true, message: "Bạn đã hết lượt quay", snackVariant: "error" });
				} else {
					_this.swap(key, _this.props.dataPick.id);
					_this.openCard(_this.props.dataPick.id);
					_this.setState({ openSnack: true, message: "Thành công, vào hộp thư để xem vật phẩm trúng thưởng", snackVariant: "success" });
				}
				_this.props.getDetailData(+idLucky, scoin_token);
				// _this.props.getData(user.access_token, user.scoinAccessToken);
			});
		}
	}

	buyTurn = (turn) => {
		var _this = this;
		const {scoin_token}= this.state;
		// var user = JSON.parse(localStorage.getItem("user"));
		var spin_name=this.props.dataDetail.data.luckySpin.name;
		var idLucky = localStorage.getItem("idLucky");
		this.props.buyTurn(+idLucky, turn,spin_name, scoin_token).then(function () {
			if (_this.props.dataTurn.statusCode === "T") {
				_this.setState({ openSnack: true, message: "Mua lượt thành công", snackVariant: "success" });
			} else {
				_this.setState({ openSnack: true, message: "Số thịt không đủ", snackVariant: "error" });
			}
			_this.props.getDetailData(+idLucky, scoin_token);
			// _this.props.getData(user.access_token, user.scoinAccessToken);
		});
	}

	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};
	handleCloseMoreTurnDialog = () => {
		this.setState({ dialogMoreTurnOpen: false });
	};

	handleCloseDialogLogin = () => {
		this.setState({ dialogLoginOpen: false });
	};

	handleCloseDialogItem = () => {
		this.setState({ dialogItemOpen: false });
	};

	showBuyTurn = () => {
		this.setState({ dialogOpen: true, dialogMoreTurnOpen: false});
	}
	showItem = () => {
		this.setState({ dialogItemOpen: true });
	}
	notSelectOption=()=>{
		this.setState({ openSnack: true, message: "Bạn chưa chọn gói", snackVariant: "error" });
	}
	

	render() {
		
		return (
			<div>
				<LuckyDetailComponent
					showItem={this.showItem}
					showBuyTurn={this.showBuyTurn}
					handleCloseDialogItem={this.handleCloseDialogItem}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					handleCloseMoreTurnDialog={this.handleCloseMoreTurnDialog}
					handleCloseDialog={this.handleCloseDialog}
					buyTurn={this.buyTurn}
					pick={this.pick}
					start={this.start}
					expand={this.expand}
					flipCard={this.flipCard}
					swap={this.swap}
					unHighLight={this.unHighLight}
					highLight={this.highLight}
					random={this.random}
					openCard={this.openCard}
					onResize={this.onResize}
					handleCloseSnack={this.handleCloseSnack}
					notSelectOption={this.notSelectOption}

					dataDetail={this.props.dataDetail}
					server={this.props.server}
					dataPick={this.props.dataPick}
					waiting={this.props.waiting}
					dataProfile={this.props.dataProfile}
					dataTurn={this.props.dataTurn}
					message={this.state.message}
					cardWidth={this.state.cardWidth}
					cardHeight={this.state.cardHeight}
					flippedArr={this.state.flippedArr}
					collapse={this.state.collapse}
					cardArr={this.state.cardArr}
					dialogOpen={this.state.dialogOpen}
					highLightCard={this.state.highLightCard}
					openSnack={this.state.openSnack}
					snackVariant={this.state.snackVariant}
					dialogLoginOpen={this.state.dialogLoginOpen}
					dialogItemOpen={this.state.dialogItemOpen}
					fontSize={this.state.fontSize}
					dialogMoreTurnOpen={this.state.dialogMoreTurnOpen}
					numberHeight={this.state.numberHeight}
					numberWidth={this.state.numberWidth}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataDetail: state.lucky.dataDetail,
	dataPick: state.lucky.dataPick,
	waiting: state.lucky.waiting,
	dataProfile: state.profile.data,
	dataTurn: state.lucky.dataTurn,
	server:state.server.serverError
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
)(Lucky_detail)