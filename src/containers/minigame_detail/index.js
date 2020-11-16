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
import $ from 'jquery';
import {
	isAndroid,
	isIOS,
	isMobile
  } from "react-device-detect";

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
			height_iframe:0,
			horizontal:false
		};
	}
	componentWillMount(){
		
		var id_game=this.props.location.state.id;
		// var width_ifranme=window.screen.width;
		// var height_iframe=window.screen.height
		// var list_game=[{id:1, img:'https://i.postimg.cc/fWvL01y0/cara.png', name:'Cờ Caro'}, {id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird'}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi'}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp'}, {id:5, img:'https://i.postimg.cc/C5NmCyMc/t-i-xu-ng.jpg', name:'Xếp Gạch'}];
		var list_game=[{id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird', link:'https://www.gamearter.com/game/flappy-superhero-dunk/',horizontal:true}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi', link:'https://html5.gamedistribution.com/54ca781032914740a819c2242b770878/?gdpr-targeting=1', horizontal:true}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp', link:'https://html5.gamedistribution.com/rvvASMiM/e49e377096194ed383dba2a18a110498/?gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2tpejEwLmNvbS8iLCJwYXJlbnREb21haW4iOiJraXoxMC5jb20iLCJ0b3BEb21haW4iOiJraXoxMC5jb20iLCJoYXNJbXByZXNzaW9uIjp0cnVlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJ2ZXJzaW9uIjoiMS4xLjM5In0%253D', horizontal:false}, {id:5, img:'https://i.postimg.cc/C5NmCyMc/t-i-xu-ng.jpg', name:'Xếp Gạch', link:'https://tetris.fbrq.io/tetris/index.html', horizontal:false}];
		var pos = list_game.map(function(e) { return e.id; }).indexOf(id_game);
		if(isMobile){
			
		}else{
			var horizontal=list_game[pos].horizontal;
			if(horizontal){
				this.setState({list_game:list_game, link:list_game[pos].link, width_ifranme:768, height_iframe:500})
			}else{
				this.setState({list_game:list_game, link:list_game[pos].link, width_ifranme:400, height_iframe:600})
			}
		}
		// this.setState({list_game:list_game, link:list_game[pos].link, width_ifranme:width_ifranme, height_iframe:height_iframe})
		
	}

	componentDidMount() {
		// var elem = document.getElementById("game");
		// if (!document.fullscreenElement) {
		// 	elem.requestFullscreen().catch(err => {
		// 	  alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
		// 	});
		//   } else {
		// 	document.exitFullscreen();
		//   }
		  $('#ads').modal('show');
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
			<div class="container" style={{paddingLeft:200}}>
				<iframe id='game' width={width_ifranme} height={height_iframe} frameBorder='0' allow='autoplay' allowTransparency="true" allowFullScreen="true" seamless scrolling='no' src={link}></iframe>	
				<div class="modal fade" id="ads" style={{
                                            backgroundImage: "url('https://i.postimg.cc/2SL8rjPm/truykich.png')",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            with: 400,
                                            height:400,
                                        }}>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header border-bottom-0 pb-0">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>     
						</div>
					</div>
				</div>
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
)(Minigame_detail)