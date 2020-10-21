import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import '../../styles/lucky.css'
import {
	getDetailData,
} from '../../modules/lucky'

import LiveStreamComponent from '../../components/page/LiveStream';

var playerX=10, playerY=10;
var gridSize=20, tileCount=20;
var appleX=15, appleY=15;
var xVel=0, yVel=0;
var trail=[];
var tail=5;
var ctx={};
var canvas={};

class Snake extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,	
		};
	}

	componentWillMount(){
	

	}

	componentDidMount() {
		canvas =document.getElementById('myCanvas');
		ctx = canvas.getContext("2d");
		document.addEventListener("keydown",this.keyPush);
		setInterval(this.game,1000/50);
	}
	game = () => {
		playerX += xVel;
		playerY += yVel;
  
		if ( playerX < 0 ) {
		  playerX = tileCount-1;
		}
		if ( playerX > tileCount-1 ) {
		  playerX = 0;
		}
		if ( playerY < 0 ) {
		  playerY = tileCount-1;
		}
		if ( playerY > tileCount-1 ) {
		  playerY=0;
		}
		ctx.fillStyle='#000'; // BG
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle='lime'; // Snake
		for(let i=0; i<trail.length; i++) {
		  ctx.fillRect(trail[i].x*gridSize, trail[i].y*gridSize, gridSize-2, gridSize-2)
		  if(trail[i].x==playerX && trail[i].y==playerY) {
			tail = 5;
		  }
		}
		trail.push({x:playerX,y:playerY});
		while(trail.length>tail) {
		  trail.shift();
		}
		if(appleX==playerX && appleY==playerY) {
		  tail++;
		  appleX = Math.floor((Math.random() * tileCount));
		  appleY = Math.floor((Math.random() * tileCount));
		} 
		ctx.fillStyle='red'; //Apple
		ctx.fillRect(appleX*gridSize, appleY*gridSize, gridSize-2, gridSize-2);
	}
	keyPush = (e) => {
		switch(e.keyCode) {
			case 37:
			xVel = -1;
			yVel = 0;
			break;
			case 38:
			xVel = 0;
			yVel = -1;
			break;
			case 39:
			xVel = 1;
			yVel = 0;
			break;
			case 40:
			xVel = 0;
			yVel = 1;
			break;
		}
	}


	backLucky=()=>{
		
	}

	render() {
		return (
			<div class='container'>
				<canvas id="myCanvas" width="500" height="500"></canvas>
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
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Snake)