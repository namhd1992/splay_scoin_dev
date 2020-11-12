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
			link:'',
			width_ifranme:0,
			height_iframe:0
		};
	}
	componentWillMount(){
		
		var id_game=this.props.location.state.id;
		var width_ifranme=window.screen.width;
		var height_iframe=window.screen.height
		// var list_game=[{id:1, img:'https://i.postimg.cc/fWvL01y0/cara.png', name:'Cờ Caro'}, {id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird'}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi'}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp'}, {id:5, img:'https://i.postimg.cc/C5NmCyMc/t-i-xu-ng.jpg', name:'Xếp Gạch'}];
		var list_game=[{id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird', link:'https://www.gamearter.com/game/flappy-superhero-dunk/'}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi', link:'https://html5.gamedistribution.com/54ca781032914740a819c2242b770878/?gdpr-targeting=1'}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp', link:'https://html5.gamedistribution.com/rvvASMiM/e49e377096194ed383dba2a18a110498/?gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2tpejEwLmNvbS8iLCJwYXJlbnREb21haW4iOiJraXoxMC5jb20iLCJ0b3BEb21haW4iOiJraXoxMC5jb20iLCJoYXNJbXByZXNzaW9uIjp0cnVlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJ2ZXJzaW9uIjoiMS4xLjM5In0%253D'}, {id:5, img:'https://i.postimg.cc/C5NmCyMc/t-i-xu-ng.jpg', name:'Xếp Gạch', link:'https://tetris.fbrq.io/tetris/index.html'}];
		var pos = list_game.map(function(e) { return e.id; }).indexOf(id_game);
		this.setState({list_game:list_game, link:list_game[pos].link, width_ifranme:width_ifranme, height_iframe:height_iframe})
		
	}

	componentDidMount() {
		var elem = document.getElementById("game");
		if (!document.fullscreenElement) {
			elem.requestFullscreen().catch(err => {
			  alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
			});
		  } else {
			document.exitFullscreen();
		  }
	}

	UNSAFE_componentWillReceiveProps(nextProp){
		if(this.props.location.state.id !== nextProp.location.state.id){
			this.setState({id_game:nextProp.location.state.id})
		}
	}

	render() {
		const {list_game, id_game, link, width_ifranme, height_iframe}=this.state;

		// if (id_game===1){
		// 	return (
		// 		<Caro list_game={list_game}/>
		// 	)
		// }
		// if (id_game===2){
		// 	return (
		// 		<FlappyBird list_game={list_game}/>
		// 	)
		// }
		// if (id_game===3){
		// 	return (
		// 		<Snake list_game={list_game}/>
		// 	)
		// }
		// if (id_game===4){
		// 	return (
		// 		<Tower list_game={list_game}/>
		// 	)
		// }

		// if (id_game===5){
		// 	return (
		// 		<Tetris list_game={list_game}/>
		// 	)
		// }

		return(
			<iframe id='game' width={width_ifranme} height={height_iframe} frameBorder='0' allow='autoplay' allowTransparency="true" allowFullScreen="true" seamless scrolling='no' src={link}></iframe>	
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
)(Minigame_detail)