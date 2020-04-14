import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData,
	finishData,
	finishShareLink
} from '../../modules/mission'

import {
	getAllGame
} from '../../modules/game'

import {
	checkin
} from '../../modules/checkin'
import {
	changeTitle
} from '../../modules/global'
import MissionComponent from '../../components/page/Mission'

class Mission extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 10,
			offset: 0,
			isShare:false,
			dialogDetailOpen: false,
			dialogContent: "",
			loadedRecords: 0,
			message: "",
			openSnack: false,
			dialogLoginOpen: false,
			title_dialog:"",
			snackVariant: "info",
			gameMoi:[],
			gameCare:[],
			scoin_token:'H1PuNJ%2bcoqoAlCi2T%2bfYIl5tq2B%2fnmMetHqFf9kFejj31n4%2f6mx5%2bIwIjFBC0yq17APaC1tNLRMOlMYb9QwS4sMCVx7EMmSVz238FqRr%2biJyBfJ7aUkASsnHxNxFc1CjJ%2fcLXnOx%2b%2fNKBPetyZWI0pwwdU183T7wFXEPMnXpOM0tbZUVNKygNyrj%2fof91g8j',
		};
	}
	componentWillMount(){
		var scoin_token=this.getParamValue("ud");
		if(scoin_token!=="" && scoin_token!==undefined){
			this.setState({scoin_token: scoin_token})
		}		
	}

	componentDidMount() {
		// var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		const {scoin_token}= this.state;
		// if (user !== null) {
		// 	this.props.getData(this.state.limit, this.state.offset, user.access_token).then(function () {
		// 		_this.props.changeTitle("NHIỆM VỤ");
		// 		_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		// 	});
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }

		this.props.getData(this.state.limit, this.state.offset,scoin_token).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
		});

		this.props.getAllGame().then(function () {
			var data=_this.props.allGame
			console.log(data)
			if(data.status==="01"){
				var news=data.data.sort((a,b) => (a.createOn < b.createOn) ? 1 : ((b.createOn < a.createOn) ? -1 : 0));
				var gameMoi=news.slice(0, 5)
				var care=data.data.sort((a,b) => (a.downloadTurns < b.downloadTurns) ? 1 : ((b.downloadTurns < a.downloadTurns) ? -1 : 0));
				// var gameCare=care.slice(0, 6)
				var gameCare=_this.random_item(data.data)
				_this.setState({gameMoi:gameMoi, gameCare:gameCare})
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

	random_item=(items)=>{
		var result=[];
		var new_items=[];
		for (let i = 0; i < 6; i++) {
			const element = items[Math.floor(Math.random()*items.length)];
			result.push(element);
			items.splice(items.indexOf(element), 1);
		}
		return result;
	}


	loadMoreAction = () => {
		var _this = this;
		const {scoin_token}= this.state;
		// var user = JSON.parse(localStorage.getItem("user"));
		var newOffset = this.state.limit + this.state.offset;
		// this.props.getMoreData(this.state.limit, newOffset, user.access_token);
		this.props.getMoreData(this.state.limit, newOffset, scoin_token);
		this.setState({
			loadedRecords: _this.state.limit + newOffset,
			offset: newOffset
		});
	}

	luckySpin=()=>{
		window.location.assign(`http://sandbox.scoin.vn/choi-game?GameId=4`)
	}


	checkin=()=>{
		// var user = JSON.parse(localStorage.getItem("user"));
		var _this=this;
		const {scoin_token}= this.state;
		this.props.checkin(scoin_token).then(function () {
			_this.props.getData(_this.state.limit, _this.state.offset, scoin_token);
			_this.setState({ dialogDetailOpen: true, dialogContent: 'Điểm danh thành công', title_dialog:"Điểm Danh"});
		});
	}

	loginGame=(obj)=>{
		window.location.assign(`http://sandbox.scoin.vn/splay?url=gamedetail%3Fservice_id%3D${obj.objectId}`)
	}

	firstLoginGame=(obj)=>{
		window.location.assign(`http://sandbox.scoin.vn/splay?url=gamedetail%3Fservice_id%3D${obj.objectId}`)
	}

	card=()=>{
		
	}

	shareFacebook=(obj)=>{
		var _this=this;
		const {scoin_token}= this.state;
		setTimeout(() => {
			this.props.finishShareLink(obj.missionId, scoin_token).then(function (response) {
				const data=_this.props.dataFinishShareLink;
				_this.props.getData(_this.state.limit, _this.state.offset, scoin_token);
				if(data.data.status==="03"){
					_this.setState({ dialogDetailOpen: true, dialogContent: _this.props.message_server, title_dialog:"Error"});
				}
			}).catch(function (err) {
				console.log(err);
			});
		}, 2000);

	}


	
	doMission = (obj) => {
		console.log(obj)
		switch (+obj.actionId) {
			case 1:
				this.luckySpin();
				break;
			case 2:
				this.checkin();
				break;
			case 3:
				this.loginGame(obj);
				break;
			case 4:
				this.firstLoginGame(obj);
				break;
			case 5:
				this.card();
				break;
			case 6:
				this.shareFacebook(obj);
				break;
			default:
				break;
		}
	}

	reward = (obj) => {
		var _this = this;
		const {scoin_token}= this.state;
		// var user = JSON.parse(localStorage.getItem("user"));
		// if(obj.actionId==='6'){
			
		// }else{
			
		// }
		this.props.finishData(obj.missionId, scoin_token).then(function (response) {
			const data=_this.props.dataFinish;
			_this.props.getData(_this.state.limit, _this.state.offset, scoin_token);
			if(data.data.status==="03"){
				_this.setState({ dialogDetailOpen: true, dialogContent: _this.props.message_server, title_dialog:"Error"});
			}
		}).catch(function (err) {
			console.log(err);
		});

	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	showDetail = (detail,title) => {
		this.setState({ dialogDetailOpen: true, dialogContent: detail, title_dialog: title});
	}

	handleCloseDialogDetail = () => {
		this.setState({ dialogDetailOpen: false });
	};

	render() {
		return (
			<div>
				<MissionComponent
					handleCloseDialogDetail={this.handleCloseDialogDetail}
					showDetail={this.showDetail}
					handleCloseSnack={this.handleCloseSnack}
					reward={this.reward}
					doMission={this.doMission}
					loadMoreAction={this.loadMoreAction}

					data={this.props.data}
					server={this.props.server}
					dataFinish={this.props.dataFinish}
					totalRecords={this.props.totalRecords}
					waiting={this.props.waiting}
					dialogDetailOpen={this.state.dialogDetailOpen}
					dialogContent={this.state.dialogContent}
					title_dialog={this.state.title_dialog}
					loadedRecords={this.state.loadedRecords}
					message={this.state.message}
					openSnack={this.state.openSnack}
					dialogLoginOpen={this.state.dialogLoginOpen}
					snackVariant={this.state.snackVariant}
					gameCare={this.state.gameCare}
					gameMoi={this.state.gameMoi}
					isShare={this.state.isShare}
				/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.mission.data,
	dataFinish: state.mission.dataFinish,
	dataFinishShareLink:state.mission.dataFinishShareLink,
	totalRecords: state.mission.totalRecords,
	waiting: state.mission.waiting,
	status: state.mission.status,
	message_server: state.mission.message_server,
	server:state.server.serverError,
	allGame: state.game.allGame,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	finishData,
	checkin,
	getMoreData,
	changeTitle,
	getAllGame,
	finishShareLink
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Mission)