import React from 'react'
import Grid from 'material-ui/Grid';
import LoginRequired from '../LoginRequired';
import Wheel from '../../containers/lucky_rotation/Winwheel'
import '../../styles/luckyHistory.css'
import { withRouter } from 'react-router-dom'


class LuckyRotationComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			theWheel:null,
		};
	}
	componentWillMount(){
		
	}

	componentDidMount(){
		let theWheel = new Wheel({
			'numSegments'       : 4,         // Specify number of segments.
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
			'segments'     :                // Define segments.
			[
			   {'text' : 'T-55 Vampire'},
			   {'text' : 'P-40 Kittyhawk'},
			   {'text' : 'North American Harvard'},
			   {'text' : 'L-39C Albatross'}
			],
			'animation' :                   // Specify the animation to use.
			{
				'type'     : 'spinToStop',
				'duration' : 10,     // Duration in seconds.
				'spins'    : 20,     // Number of complete spins.
				'callbackFinished' : this.alertPrize
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;    // Make wheelImage equal the loaded image object.
			theWheel.draw();                    // Also call draw function to render the wheel.
		}

		// Set the image source, once complete this will trigger the onLoad callback (above).
		loadedImg.src = "https://i.postimg.cc/zf4HqPNC/lucky-rotaion.png";
		this.setState({theWheel:theWheel})
	}

	startSpin=()=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		// Ensure that spinning can't be clicked again while already running.
		if (wheelSpinning == false) {
			
			// Based on the power level selected adjust the number of spins for the wheel, the more times is has
			// to rotate with the duration of the animation the quicker the wheel spins.
			// theWheel.animation.spins = 2;

			// Disable the spin button so can't click again while wheel is spinning.

			// Begin the spin animation by calling startAnimation on the wheel object.
			theWheel.startAnimation();

			// Set to true so that power can't be changed and spin button re-enabled during
			// the current animation. The user will have to reset before spinning again.
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	
	stopSpin=()=>{
		const {wheelSpinning, wheelPower, theWheel, stop}=this.state;
		if (stop == false) {

			theWheel.stopAnimation(false);
			theWheel.animation.spins = 1;
			theWheel.rotationAngle = 0;
			theWheel.draw(); 
			theWheel.startAnimation();
			// theWheel.stopAnimation(false);
			this.setState({wheelSpinning: true, stop:true});
		}
	}

	resetWheel=()=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 20;  // Stop the animation, false as param so does not call callback function.
		theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
		theWheel.draw();                // Call draw to render changes to the wheel.

		this.setState({wheelSpinning: false});          // Reset to false to power buttons and spin can be clicked again.
	}

	alertPrize=(indicatedSegment)=>{
		// Do basic alert of the segment text. You would probably want to do something more interesting with this information.
		alert("The wheel stopped on " + indicatedSegment.text);
	}
	render() {
		const { dialogLoginOpen } = this.props;

		return (<Grid container>
			<Grid item xs={12} style={{ padding:10}}>
				<table cellPadding="0" cellSpacing="0" border="0">
					<tr>
						<td>
							<div className="power_controls">
								<button onClick={this.startSpin}>Start</button>
								<br /><br />
								<button onClick={this.stopSpin}>Stop</button>
								<br /><br />
								<button onClick={this.resetWheel}>Play Again</button>
							</div>
						</td>
						<td className='the_wheel' style={{width:500, height:500, alignContent:'center', verticalAlign:'center', dataResponsiveMinWidth:180, dataResponsiveScaleHeight:"true"}}>
							<canvas id="canvas" width="450" height="450">
								<p style={{color: '#fff', textAlign:'center'}} >Sorry, your browser doesn't support canvas. Please try another.</p>
							</canvas>
						</td>
					</tr>
				</table>
				<div></div>
			</Grid>
			<Grid item xs={12}>
				<div style={{textAlign:'center', marginBottom:25, fontSize:14}}>
					<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
					<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
					<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
				</div>
			</Grid>
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</Grid>)
	}
}


export default withRouter(LuckyRotationComponent)

