import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ListComponent from '../../../components/page/List'
// import '../../styles/lucky.css'
import $ from 'jquery';


const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]

let score = 0;
let changing_direction = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;
var FPS=10

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
			txt_btn:'Bắt Đầu',
			start:false,
			reset:false	
		};
	}

	componentWillMount(){
        
		var txt_btn=localStorage.getItem('txt_btn');
		var start=JSON.parse(localStorage.getItem('start'));
		var reset=JSON.parse(localStorage.getItem('reset'));
		if(txt_btn!==null){
			this.setState({txt_btn:txt_btn, start:start, reset:reset})
		}

	}

	componentDidMount() {
		canvas =document.getElementById('myCanvas');
		ctx = canvas.getContext("2d");
		// document.addEventListener("keydown",this.keyPush);
		this.gen_food()
		document.addEventListener("keydown", this.change_direction);
		
		this.main();
	}
	
	run=()=>{
		$('#menu').hide();
		document.getElementById("myCanvas").style.backgroundColor = "#fff";
		document.getElementById("myCanvas").style.opacity = "1";
		this.setState({start:true})
		setInterval(this.main,1000/FPS);
	}

	setup=()=>{
		document.getElementById("main").style.display = "none";
		document.getElementById("credits").style.display = "block";

	}

	easy=()=>{
		FPS=10;
		document.getElementById("main").style.display = "block";
		document.getElementById("credits").style.display = "none";
	}

	hard=()=>{
		FPS=25;
		document.getElementById("main").style.display = "block";
		document.getElementById("credits").style.display = "none";
	}

	main=()=> {
		if (this.has_game_ended()){
			this.setState({start:false, txt_btn:'Chơi Lại', reset:true});
			return;
		} 
		changing_direction = false;
        this.clear_board();
        this.drawFood();
        this.move_snake();
        this.drawSnake();
 
	}

	reset=()=>{
		window.location.reload(true)
	}

	clear_board=()=> {
		//  Select the colour to fill the drawing
		ctx.fillStyle = board_background;
		//  Select the colour for the border of the canvas
		ctx.strokestyle = board_border;
		// Draw a "filled" rectangle to cover the entire canvas
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// Draw a "border" around the entire canvas
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
	}

	drawFood=()=> {
		ctx.fillStyle = 'lightgreen';
		ctx.strokestyle = 'darkgreen';
		ctx.fillRect(food_x, food_y, 10, 10);
		ctx.strokeRect(food_x, food_y, 10, 10);
	  }

	drawSnake=()=> {
	// Draw each part
		snake.forEach(this.drawSnakePart)
	}

	drawSnakePart=(snakePart)=> {

		// Set the colour of the snake part
		ctx.fillStyle = snake_col;
		// Set the border colour of the snake part
		ctx.strokestyle = snake_border;
		// Draw a "filled" rectangle to represent the snake part at the coordinates
		// the part is located
		ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
		// Draw a border around the snake part
		ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
	}

	has_game_ended=()=> {
		for (let i = 4; i < snake.length; i++) {
			if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
		}
		const hitLeftWall = snake[0].x < 0;
		const hitRightWall = snake[0].x > canvas.width - 10;
		const hitToptWall = snake[0].y < 0;
		const hitBottomWall = snake[0].y > canvas.height - 10;
		return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
	}

	random_food=(min, max)=> {
		return Math.round((Math.random() * (max-min) + min) / 10) * 10;
	}

	gen_food=()=> {
		// Generate a random number the food x-coordinate
		food_x = this.random_food(0, canvas.width - 10);
		// Generate a random number for the food y-coordinate
		food_y = this.random_food(0, canvas.height - 10);
		// if the new food location is where the snake currently is, generate a new food location
		snake.forEach(function has_snake_eaten_food(part) {
			const has_eaten = part.x == food_x && part.y == food_y;
			if (has_eaten) this.gen_food();
		});
	}

	change_direction=(event)=> {
		const LEFT_KEY = 37;
		const RIGHT_KEY = 39;
		const UP_KEY = 38;
		const DOWN_KEY = 40;
		
		// Prevent the snake from reversing
		
		if (changing_direction) return;
		changing_direction = true;
		const keyPressed = event.keyCode;
		const goingUp = dy === -10;
		const goingDown = dy === 10;
		const goingRight = dx === 10;
		const goingLeft = dx === -10;
		if (keyPressed === LEFT_KEY && !goingRight) {
			dx = -10;
			dy = 0;
		}
		if (keyPressed === UP_KEY && !goingDown) {
			dx = 0;
			dy = -10;
		}
		if (keyPressed === RIGHT_KEY && !goingLeft) {
			dx = 10;
			dy = 0;
		}
		if (keyPressed === DOWN_KEY && !goingUp) {
			dx = 0;
			dy = 10;
		}
	}

	move_snake=()=> {
	// Create the new Snake's head
		const head = {x: snake[0].x + dx, y: snake[0].y + dy};
	// Add the new head to the beginning of snake body
		snake.unshift(head);
		const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
		if (has_eaten_food) {
			// Increase score
			score += 1;

			// Display score on screen
			document.getElementById('score').innerHTML = score;
			// Generate new food location
			this.gen_food();
		} else {
			// Remove the last part of snake body
			snake.pop();
		}
	}
  
	

	// game = () => {
	// 	playerX += xVel;
	// 	playerY += yVel;
  
	// 	if ( playerX < 0 ) {
	// 	  playerX = tileCount-1;
	// 	}
	// 	if ( playerX > tileCount-1 ) {
	// 	  playerX = 0;
	// 	}
	// 	if ( playerY < 0 ) {
	// 	  playerY = tileCount-1;
	// 	}
	// 	if ( playerY > tileCount-1 ) {
	// 	  playerY=0;
	// 	}
	// 	ctx.fillStyle='#000'; // BG
	// 	ctx.fillRect(0,0,canvas.width,canvas.height);
	// 	ctx.fillStyle='lime'; // Snake
	// 	for(let i=0; i<trail.length; i++) {
	// 	  ctx.fillRect(trail[i].x*gridSize, trail[i].y*gridSize, gridSize-2, gridSize-2)
	// 	  if(trail[i].x==playerX && trail[i].y==playerY) {
	// 		tail = 5;
	// 	  }
	// 	}
	// 	trail.push({x:playerX,y:playerY});
	// 	while(trail.length>tail) {
	// 	  trail.shift();
	// 	}
	// 	if(appleX==playerX && appleY==playerY) {
	// 	  tail++;
	// 	  appleX = Math.floor((Math.random() * tileCount));
	// 	  appleY = Math.floor((Math.random() * tileCount));
	// 	} 
	// 	ctx.fillStyle='red'; //Apple
	// 	ctx.fillRect(appleX*gridSize, appleY*gridSize, gridSize-2, gridSize-2);
	// }
	// keyPush = (e) => {
	// 	switch(e.keyCode) {
	// 		case 37:
	// 		xVel = -1;
	// 		yVel = 0;
	// 		break;
	// 		case 38:
	// 		xVel = 0;
	// 		yVel = -1;
	// 		break;
	// 		case 39:
	// 		xVel = 1;
	// 		yVel = 0;
	// 		break;
	// 		case 40:
	// 		xVel = 0;
	// 		yVel = 1;
	// 		break;
	// 	}
	// }


	backLucky=()=>{
		
	}

	render() {
        const {txt_btn, start, reset}=this.state;
        const {list_game}=this.props
		return (
			<div class='container'>
				<div id="score" style={{textAlign:'center', fontSize:'30px'}}>0</div>
				<div style={{height:400}}>
					<div style={{width:600, height:400, position:'absolute', zIndex:1}}>
						<div id="menu" style={{position:'absolute', width:600, height:400, zIndex:2, textAlign:'center'}}>
							<div id="main" >
								<h1>Rắn Săn Mồi</h1>

								<button style={{width:150, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.run}>Bắt Đầu</button>
								<button style={{width:150, height:40, backgroundColor:'#fff'}} onClick={this.setup}>Cài Đặt</button>
							</div>
							<div id="credits" style={{display:'none'}}>
								<h1>Tốc Độ</h1>
								<button style={{width:150, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.easy}>Dễ</button>
								<button style={{width:150, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.hard}>Khó</button>
							</div>
						</div>
						<canvas id="myCanvas" width="600" height="400" style={{width:600, height:400, zIndex:1 ,position:'absolute', backgroundColor:'gray', opacity:'0.6'}}></canvas>
						<div id="game-over" style={{position:'absolute', width:600, height:400, zIndex:7, textAlign:'center', display:'none'}}>
							<h2>You ran <span id="score"></span> meters!</h2>
							<a href="javascript:void(0)" class="button restart">Try again?</a>
						</div>
					</div>
				</div>
				
				
				
				{/* <div style={{zIndex:2}}>
					{(!start)?(<div>
						{(reset)?(<button id='txt_btn' style={{width:200, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.reset}>{txt_btn}</button>):(
							<button id='txt_btn' style={{width:200, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.run}>{txt_btn}</button>
						)}
						
					</div>):(
						<button id='txt_btn' style={{width:200, height:40, backgroundColor:'#fff', marginRight:15}} disabled>{txt_btn}</button>
					)}
				</div> */}
                <ListComponent list_game={list_game} />
				
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
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Snake)