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
import ListMinigameComponent from '../../components/page/List_Minigame'

class List_Minigame extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			cardWidth: 0,
			cardHeight: 0,
			list_game:[],
			top_game:[]

		};
	}
	componentWillMount(){
		var list_game=[{id:1, img:'https://i.postimg.cc/fWvL01y0/cara.png', name:'Cờ Caro'}, {id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird'}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi'}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp'}];
		var top_game=[{id:1, img:'https://i.postimg.cc/fWvL01y0/cara.png', name:'Cờ Caro'}, {id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird'}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi'}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp'}];
		this.setState({list_game:list_game, top_game:top_game})
	}

	componentDidMount() {
		var _this = this;
		this.props.getData().then(function () {
			// if(_this.props.dataDetail!==undefined){
			// 	// _this.props.changeTitle(_this.props.dataDetail.data.luckyspin.name);
			// 	var new_arr = [];
			// 	_this.props.dataDetail.data.itemOfSpin.forEach(function (item, key) {
			// 		// console.log(_this.props.dataDetail)
			// 		new_arr.push({ id: item.id, status: true });
			// 	});
			// 	_this.setState({ cardArr: _this.props.dataDetail.data.itemOfSpin, flippedArr: new_arr });
			// }
		
		});
	}



	render() {
		const {list_game, top_game}=this.state;
		return (
			<div>
				<ListMinigameComponent list_game={list_game} top_game={top_game}/>
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
	getData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List_Minigame)