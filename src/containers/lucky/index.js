import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/lucky'

import {
	getAllGame
} from '../../modules/game'
import {
	changeTitle
} from '../../modules/global'
import LuckyComponent from '../../components/page/Lucky'

class Lucky extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 10,
			offset: 0,
			loadedRecords: 0,
			data:[],
			scoin_token:'H1PuNJ%2bcoqqf5LuMQVl44l5tq2B%2fnmMeTd029tRUEkLfRZy9SjhIzRZE9%2bBq8he8XxC0XRgCSIqv9d5FzFtkfyfU7Ud90Xf45m%2bx1pj41P%2f9J0%2bddD75eq%2fbK9PL6acMkbIcl8nx6obrjDyuBHOit6XxPIBNO%2fTsIbSr%2bshmiFYLClSCVgEE0b53Dc2UQ%2fHb',
		};
	}

	componentWillMount(){
		var scoin_token=this.getParamValue("ud");
		if(scoin_token!=="" && scoin_token!==undefined){
			localStorage.setItem('scoin_token', scoin_token)
			this.setState({scoin_token: scoin_token})
		}		
	}

	componentDidMount() {
		var _this = this;
		const {scoin_token}= this.state;
		localStorage.setItem('scoin_token', scoin_token)
		this.props.changeTitle("MAY MẮN");
		this.props.getData(this.state.limit, this.state.offset, scoin_token).then(function () {
			// console.log(_this.props.data)
			const data=_this.props.data;
			if(data.status==="01"){
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset, data:data.data });
			}
		});
		this.props.getAllGame().then(function () {
			// console.log(_this.props.data)
			const data=_this.props.data;
			if(data.status==="01"){
				_this.setState({ loadedRecords: _this.state.limit + _this.state.offset, data:data.data });
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


	loadMoreAction = () => {
		var _this = this;
		const {scoin_token}= this.state;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset, scoin_token).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + newOffset });
		});
	}

	render() {
		
		return (
			<div>
				<LuckyComponent
					loadMoreAction={this.loadMoreAction}
					data={this.state.data}
					waiting={this.props.waiting}
					totalRecords={this.props.totalRecords}
					loadedRecords={this.state.loadedRecords}
					server={this.props.server}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.lucky.data,
	allGame: state.game.allGame,
	waiting: state.lucky.waiting,
	totalRecords: state.lucky.totalRecords,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	getAllGame,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky)