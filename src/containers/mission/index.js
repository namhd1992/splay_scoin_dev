import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData,
	finishData
} from '../../modules/mission'

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
			limit: 12,
			offset: 0,
			dialogDetailOpen: false,
			dialogContent: "",
			loadedRecords: 0,
			message: "",
			openSnack: false,
			dialogLoginOpen: false,
			title_dialog:"",
			snackVariant: "info",
			scoin_token:'H1PuNJ%2bcoqqf5LuMQVl44l5tq2B%2fnmMeTd029tRUEkLfRZy9SjhIzUjdNogA2x8ZgYX6HWQl6Zmv9d5FzFtkf4Aqa1iRlwwxiO%2b1mJvtnJpgtcDAxxnptvuWTW26jzFmxntMaQD99gTf9MkI8k7dxEy1ENH90utf%2b%2bXiSywn6WTPHJ1Ev6U6yr53Dc2UQ%2fHb',
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
			// _this.props.changeTitle("NHIỆM VỤ");
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
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

	checkin=()=>{
		// var user = JSON.parse(localStorage.getItem("user"));
		var _this=this;
		const {scoin_token}= this.state;
		this.props.checkin(scoin_token).then(function () {
			_this.props.getData(_this.state.limit, _this.state.offset, scoin_token);
		});
	}

	doMission = (action, id, value, scoinGameId) => {
		switch (+action) {
			case 1:
				window.location.href = '/lucky';
				break;
			case 2:
				this.checkin();
				break;
			case 3:
				window.location.href = '/auctiondetail/' + id;
				break;
			case 4:
				window.location.href = '/giftcodedetail/' + id;
				break;
			case 5:
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			case 8:
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			case 9:
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			case 10:
				window.location.href = '/gamedetail/' + scoinGameId;
				break;
			default:
				window.location.assign(value);
				break;
		}
	}

	reward = (id) => {
		var _this = this;
		const {scoin_token}= this.state;
		// var user = JSON.parse(localStorage.getItem("user"));
		this.props.finishData(id, scoin_token).then(function (response) {
			_this.props.getData(_this.state.limit, _this.state.offset, scoin_token);
			if(_this.props.status==="03"){
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
				/>

			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.mission.data,
	dataFinish: state.mission.dataFinish,
	totalRecords: state.mission.totalRecords,
	waiting: state.mission.waiting,
	status: state.mission.status,
	message_server: state.mission.message_server,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	finishData,
	checkin,
	getMoreData,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Mission)