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
			horizontal:false,
			mobile:false,
			video:false,
			close:false
		};
	}
	componentWillMount(){
		
		var id_game=this.props.location.state.id;
		var width_ifranme=window.screen.width;
		var height_iframe=window.screen.height;
		var number=Math.floor(Math.random() * 10);

		// var list_game=[{id:1, img:'https://i.postimg.cc/fWvL01y0/cara.png', name:'Cờ Caro'}, {id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird'}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi'}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp'}, {id:5, img:'https://i.postimg.cc/C5NmCyMc/t-i-xu-ng.jpg', name:'Xếp Gạch'}];
		var list_game=[{id:2, img:'https://i.postimg.cc/L5v8KgwV/Flappy-Bird-icon.png', name:'Flappy Bird', link:'https://www.gamearter.com/game/flappy-superhero-dunk/',horizontal:true}, {id:3, img:'https://i.postimg.cc/8cTz0mK5/snake.png', name:'Rắn Săn Mồi', link:'https://html5.gamedistribution.com/54ca781032914740a819c2242b770878/?gdpr-targeting=1', horizontal:true}, {id:4, img:'https://i.postimg.cc/tCM93bj7/town.jpg', name:'Xếp Tháp', link:'https://html5.gamedistribution.com/rvvASMiM/e49e377096194ed383dba2a18a110498/?gd_zone_config=eyJwYXJlbnRVUkwiOiJodHRwczovL2tpejEwLmNvbS8iLCJwYXJlbnREb21haW4iOiJraXoxMC5jb20iLCJ0b3BEb21haW4iOiJraXoxMC5jb20iLCJoYXNJbXByZXNzaW9uIjp0cnVlLCJsb2FkZXJFbmFibGVkIjp0cnVlLCJ2ZXJzaW9uIjoiMS4xLjM5In0%253D', horizontal:false}, {id:5, img:'https://i.postimg.cc/C5NmCyMc/t-i-xu-ng.jpg', name:'Xếp Gạch', link:'https://tetris.fbrq.io/tetris/index.html', horizontal:false}];
		var pos = list_game.map(function(e) { return e.id; }).indexOf(id_game);
		if(isMobile){
			this.setState({list_game:list_game, link:list_game[pos].link, width_ifranme:width_ifranme, height_iframe:height_iframe, mobile:true})
		}else{
			var horizontal=list_game[pos].horizontal;
			if(horizontal){
				this.setState({list_game:list_game, link:list_game[pos].link, width_ifranme:768, height_iframe:500, mobile:false, horizontal:horizontal})
			}else{
				this.setState({list_game:list_game, link:list_game[pos].link, width_ifranme:400, height_iframe:600, mobile:false, horizontal:horizontal})
			}
		}
		if(number%2===0){
			this.setState({video:true})
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
		var start=new Date().getTime()+10*1000;
		this.timeRemain(start);
	}

	UNSAFE_componentWillReceiveProps(nextProp){
		if(this.props.location.state.id !== nextProp.location.state.id){
			this.setState({id_game:nextProp.location.state.id})
		}
	}

	timeRemain=(times)=>{
		var _this=this;
		setInterval(()=>{
			var time=(Date.now()-times)/1000;
			if(time>0){

				_this.setState({close:true})
			}
		}, 1000);
	}

	closeADS=()=>{
		this.setState({close:true})
		$('#ads').hide();
	}

	render() {
		const {list_game, id_game, link, width_ifranme, height_iframe, mobile,horizontal, video, close}=this.state;
		var mgl=0;
		if(!horizontal){
			mgl=200;
		}


		return(<div>
			{(mobile)?(<div>
				
				<div style={ close ? { top:0, left:0} : {width:'100vw', height:'100vh', backgroundColor:'rgba(0, 0, 0, 0.6)', zIndex:1000, position:'absolute', top:0, left:0}}>	
					<div id="ads" class="alert alert-dismissible fade show navbar lightbox p-0" style={{position:'fixed', top:'40%'}}>
						{(video)?(<div>
							{(close)?(<a class="close p-2" data-dismiss="alert" aria-label="close">&times;</a>):(<div></div>)}
							<iframe width="100%" height="200px" src="http://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1" frameborder="0" allowfullscreen></iframe></div>):(<div>
							{(close)?(<a class="close p-2" data-dismiss="alert" aria-label="close">&times;</a>):(<div></div>)}
							
							<a href="http://aumobile.vn/" title="" target="_blank" onClick={this.closeADS}><img src="https://i.postimg.cc/YqQvPD4H/Au-mobile.png" width="100%" alt="" height="200px"/></a>
						</div>)}
					</div> 
				</div>  
				<iframe id='game' width={width_ifranme} height={height_iframe} frameBorder='0' allow='autoplay' allowTransparency="true" allowFullScreen="true" seamless scrolling='no' src={link}></iframe>
			</div>):(<div  class="container" style={{paddingLeft:mgl}}>
				<iframe id='game' width={width_ifranme} height={height_iframe} frameBorder='0' allow='autoplay' allowTransparency="true" allowFullScreen="true" seamless scrolling='no' src={link}></iframe>	
				<div style={{marginTop:15}}>
					<a href="http://aumobile.vn/" title="" target="_blank"><img src="https://i.postimg.cc/YqQvPD4H/Au-mobile.png" width={width_ifranme} alt="" height="150px"/></a>
				</div>   
			</div>)}
				
		</div>)
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