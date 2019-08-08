import React from 'react'
import { bindActionCreators } from 'redux'
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import LoginRequired from '../../components/LoginRequired';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog';
import { withStyles } from "material-ui/styles/index"
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'
import rotaion from './muivongquay.png'
import bg_rotaion from './khungvongquay.png'
import muiten from './muiten.png'


const styles = {
	paper: {
		background: "#fff",
	},
};

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			theWheel:null,
			dialogLoginOpen: false,
			dialogBonus:false,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			turnsFree:0,
		};
	}
	componentWillMount(){
		
	}

	componentDidMount(){
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 0).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					console.log(data)
					this.setState({userTurnSpin:data.userTurnSpin, itemOfSpin:data.itemOfSpin, luckySpin:data.luckySpin, turnsFree:(data.userTurnSpin.turnsFree+data.userTurnSpin.turnsBuy)})
				}
			});
		} else {
			this.props.getRotationDetailData(0).then(()=>{
				var data=this.props.dataRotation;
			});
		}
		let theWheel = new Wheel({
			'numSegments'       : 10,         // Specify number of segments.
			'outerRadius'       : 150,       // Set outer radius so wheel fits inside the background.
			'drawMode'          : 'image',   // drawMode must be set to image.
			'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
			'textFontSize'      : 12,        // Set text options as desired.
			'textOrientation'   : 'curved',
			'textDirection'     : 'reversed',
			'textAlignment'     : 'outer',
			'textMargin'        : 5,
			'textFontFamily'    : 'monospace',
			'textStrokeStyle'   : 'black',
			'textLineWidth'     : 2,
			'responsive'   : true,
			'textFillStyle'     : 'white',
			
			'animation' :                 
			{
				'type'     : 'spinToStop',
				'duration' : 5,    
				'spins'    : 10,    
				'callbackFinished' : this.completeRotation
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;   
			theWheel.draw();                    
		}
		loadedImg.src = rotaion;
		this.setState({theWheel:theWheel})
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	start=()=>{
		const {turnsFree, itemOfSpin}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			if(turnsFree>0){
				// this.props.pickCard(user.access_token, 119).then(()=>{
				// 	if(_this.props.dataPick !==undefined){
				// 		var id=_this.props.dataPick.id;
				// 		var pos = itemOfSpin.map(function(e) { return e.id; }).indexOf(id);
				// 		this.startSpin(pos+1);
				// 	}
				// })
				this.startSpin(4)
				
			}else{
				this.setState({dialogBonus:true})
			}
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	startSpin=(segmentNumber)=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		if (wheelSpinning == false) {
			let stopAt = theWheel.getRandomForSegment(segmentNumber);
			theWheel.animation.stopAngle = stopAt;
			theWheel.startAnimation();
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	
	// stopSpin=()=>{
	// 	const {wheelSpinning, wheelPower, theWheel, stop}=this.state;
	// 	if (stop == false) {

	// 		theWheel.stopAnimation(false);
	// 		theWheel.animation.spins = 1;
	// 		theWheel.rotationAngle = 0;
	// 		theWheel.draw(); 
	// 		theWheel.startAnimation();
	// 		// theWheel.stopAnimation(false);
	// 		this.setState({wheelSpinning: true, stop:true});
	// 	}
	// }

	resetWheel=()=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 20; 
		theWheel.rotationAngle = 0;   
		theWheel.draw();              
		this.setState({wheelSpinning: false});    
	}

	completeRotation=()=>{
		const {auto, turnsFree}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if(auto){
			if(turnsFree>0){
				var intervalId = setInterval(this.autoRotation, 1000);
   				this.setState({intervalId: intervalId});
			}
		}
	}

	handleChange = () => {
		clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	};

	autoRotation=()=>{
		const {turnsFree}=this.state;
		if(turnsFree>0){
			console.log('AAAAAAAAAAA')
			var user = JSON.parse(localStorage.getItem("user"));
			this.props.pickCard(user.access_token, 119);
			this.props.getRotationDetailDataUser(user.access_token, 0).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					this.setState({turnsFree:(data.userTurnSpin.turnsFree+data.userTurnSpin.turnsBuy)})
				}
			});
		}else{
			clearInterval(this.state.intervalId);
		}
	}

	handleCloseWarning=()=>{
		this.setState({dialogBonus:false})
	}

	render() {
		const {dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning}=this.state;
		const { classes } = this.props;
		return (<div>
			<Grid container style={{ width: "100%", margin: "0px" }}>
				<Grid item xs={12} md={12} >
					<Grid item xs={12} md={12} style={{textAlign:'center', justifyContent:'center', alignItems:'center'}}>
						<div style={{backgroundImage:"url(" + bg_rotaion + ")",backgroundPosition:'center', backgroundRepeat:'none', width:684, height:804, alignContent:'center', dataResponsiveMinWidth:180, verticalAlign:'center', dataResponsiveScaleHeight:"true"}}>
							<canvas id="canvas" width="684" height="804">
								<p style={{color: '#fff', textAlign:'center'}} >Sorry, your browser doesn't support canvas. Please try another.</p>
							</canvas>
						</div>
						<div>
							<div>
								<span>Tự động quay</span>
								<input type="checkbox" style={{width:25, height:25}} onChange={this.handleChange}/>
							</div>
							<div>
								<button onClick={this.start}>Start</button>
								<button onClick={this.stopSpin}>Stop</button>
								<button onClick={this.resetWheel}>Play Again</button>
							</div>
						</div>
					</Grid>
					<Grid item xs={12}>
						<div style={{textAlign:'center', marginTop:40, marginBottom:25, fontSize:14}}>
							<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
							<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
							<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
						</div>
					</Grid>
				</Grid>
			</Grid>
			<Dialog
			fullScreen={false}
			open={dialogBonus}
			onClose={this.handleCloseWarning}
			aria-labelledby="responsive-dialog-title"
			classes={{ paper: classes.paper }}
		>
			<DialogTitle id="responsive-dialog-title"><span style={{ color: '#666666', fontSize:18 }} >Bạn đã hết lượt quay</span></DialogTitle>
			<DialogContent>
				<div style={{ color: "#666666" }}>
					Làm nhiệm vụ hoặc mua thêm lượt để tiếp tục
				</div>
			</DialogContent>
			<DialogActions>
				<div>
					<button onClick={this.handleCloseWarning} className="btn_close_lucky">OK</button>
				</div>
			</DialogActions>
		</Dialog>
		<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>
		)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Lucky_Rotation))