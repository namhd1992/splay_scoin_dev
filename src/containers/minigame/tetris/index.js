import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ListComponent from '../../../components/page/List'
// import '../../styles/lucky.css'
import $ from 'jquery';
import Game from './tetris'

var ctx={};
var canvas={};
var score={};

class Tetris extends React.Component {

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
		score =document.getElementById('score');
		canvas =document.getElementById('myCanvas');
		ctx = canvas.getContext("2d");
		const game= new Game(ctx, score);
		// document.addEventListener("keydown",this.keyPush);
	}
	
	

	render() {
        const {txt_btn, start, reset}=this.state;
        const {list_game}=this.props
		return (
			<div class='container'>
				<div id="score" style={{textAlign:'center', fontSize:'30px'}}>0</div>
				<div style={{height:400}}>
					<div style={{width:600, height:400, position:'absolute', zIndex:1}}>
						{/* <div id="menu" style={{position:'absolute', width:600, height:400, zIndex:2, textAlign:'center'}}>
							<div id="main" >
								<h1>Xếp Gạch</h1>

								<button style={{width:150, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.run}>Bắt Đầu</button>
								<button style={{width:150, height:40, backgroundColor:'#fff'}} onClick={this.setup}>Cài Đặt</button>
							</div>
							<div id="credits" style={{display:'none'}}>
								<h1>Tốc Độ</h1>
								<button style={{width:150, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.easy}>Dễ</button>
								<button style={{width:150, height:40, backgroundColor:'#fff', marginRight:15}} onClick={this.hard}>Khó</button>
							</div>
						</div> */}
						<canvas id="myCanvas" width="600" height="400" style={{width:600, height:400, zIndex:1 ,position:'absolute'}}></canvas>
						<div id="game-over" style={{position:'absolute', width:600, height:400, zIndex:7, textAlign:'center', display:'none'}}>
							<h2>You ran <span id="score"></span> meters!</h2>
							<a href="javascript:void(0)" class="button restart">Try again?</a>
						</div>
					</div>
				</div>
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
)(Tetris)