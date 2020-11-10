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
import Snake from '../minigame/snake/index'
import FlappyBird from '../minigame/flappy_bird/index'
import Caro from '../minigame/caro/index'
import Tower from '../minigame/tower/index';
import Tetris from '../minigame/tetris/index'

class Minigame_detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			cardWidth: 0,
			cardHeight: 0,
			list_game: [],
		};
	}
	componentWillMount(){
		var id_game=this.props.location.state.id;
		var list_game=[{id:1, img:'https://i.postimg.cc/fWvL01y0/cara.png', name:'Cờ Caro'}, {id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird'}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi'}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp'}, {id:5, img:'https://i.postimg.cc/C5NmCyMc/t-i-xu-ng.jpg', name:'Xếp Gạch'}];
		this.setState({list_game:list_game, id_game:id_game})
	}

	componentDidMount() {

	}

	UNSAFE_componentWillReceiveProps(nextProp){
		if(this.props.location.state.id !== nextProp.location.state.id){
			this.setState({id_game:nextProp.location.state.id})
		}
	}

	render() {
		const {list_game, id_game}=this.state;

		if (id_game===1){
			return (
				<Caro list_game={list_game}/>
			)
		}
		if (id_game===2){
			return (
				<FlappyBird list_game={list_game}/>
			)
		}
		if (id_game===3){
			return (
				<Snake list_game={list_game}/>
			)
		}
		if (id_game===4){
			return (
				<Tower list_game={list_game}/>
			)
		}

		if (id_game===5){
			return (
				<Tetris list_game={list_game}/>
			)
		}
		
		
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
)(Minigame_detail)