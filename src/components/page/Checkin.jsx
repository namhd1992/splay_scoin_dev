import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import LoginRequired from '../../components/LoginRequired'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withTheme } from 'material-ui/styles'
import '../../styles/imageServerError.css'


class CheckinComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height:0,
			marginT:0,
			marginB:0,
		};
	}

	componentWillMount(){
		var w=window.innerWidth;
		var margin_t=0, margin_b=0;
		if(w>1280){
			w=1280/6 - 20;
			margin_b=16;
			margin_t=20;
		}else if(w>=768){
			w=window.innerWidth/6 - 10;
			margin_b=5;
		}else{
			w=window.innerWidth/4 + 10;
			margin_b=0;
		}
		this.setState({height:w, marginB:margin_b, marginT:margin_t});
	}

	checkin=()=>{
		this.props.checkin();
	}

	render() {
		const {data, dialogLoginOpen, waiting,server}=this.props;
		const {height, marginB, marginT}=this.state;
		var toDay = data[1];
		var award = 0;
		if (data[0] !== undefined) {
			data[0].forEach(obj => {
				if (toDay.toDay === obj.day) {
					award = obj.awardPoint + obj.pointBonus
				}
			});
		}
		
		return (data.length === 2) ? (
			<div>
				<Grid container className="checkin-root" spacing={12} >
					<Grid item xs={12} md={12}>
						<Grid container spacing={12} >
							<Grid container xs={12} md={12} style={{background:'#fff', border:'1px solid #d0d0d1'}}>
								<Grid item xs={12} style={{marginTop:10, marginLeft:10, marginBottom:-15 }}>
									<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_diemdanh.png" alt="icon"/></div><span style={{float:'left', fontWeight:'bold', color:"#6a6a6a", fontSize:18}}>Điểm danh</span>
								</Grid>
								<Grid item xs={12}>
									<List className="checkin-root-list">
										<ListItem>
											<ListItemText primary={(<span><span style={{fontWeight:'bold', color:"#6a6a6a", fontSize:16, marginRight:3}}>Quà đăng nhập hôm nay</span> <span className="global-thit" style={{ color: "#ff9933", fontWeight:'bold', fontSize:16 }}> <img style={{width:24, height:24}} alt="just alt" src="../icon_xu.png" /> +{award}</span></span>)}></ListItemText>
											<div>
												{(!toDay.checkined) ? (
													<button onClick={this.checkin} style={{
														borderRadius: "5px",
														background: "#33cccc",
														color: "#fff",
														padding: "10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														border:'0px solid',
														cursor:'pointer',
														minWidth: "auto",
														minHeight: "auto",
														fontSize:18
													}}>Điểm danh</button>) : (
														<button disabled style={{ color: "#999999", border:'0px solid', padding: "10px",borderRadius: "5px", fontSize:18}}>Đã nhận</button>)}
											</div>
										</ListItem>
									</List>
								</Grid>
								{data[0].map((obj, key) => (
									<Grid className="checkin-item-wrap" key={key} item xs={4} sm={2}>
										<div style={{height:height}} className='checkin-item'>
											{(toDay.toDay > obj.day || (toDay.checkined && obj.day === toDay.toDay)) ? (
												<div style={{float:'right', marginRight:-18, marginTop:-18}}><img style={{width:18, height:18}} alt="just alt" src="../icon_tich_small.png" /></div>) : (<div></div>)}
											<div className="checkin-day" style={{marginBottom:marginB, marginTop:marginT}}><span style={{fontWeight:'bold', fontSize:18, color:'#666666'}}>{"Ngày " + obj.day}</span></div>
											<div className="checkin-icon" style={{marginBottom:marginB}}><img alt="just alt" src="../icon_vatpham.png" /></div>
											<div style={{textAlign:'center'}}>
												<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
														src="../Xu.png" /> <span style={{ color: "#ff9933", fontWeight:'bold', fontSize:16 }}>+{obj.awardPoint + obj.pointBonus}</span> </span>
											</div>
										</div>
									</Grid>
								))}
							</Grid>
							<Grid item xs={12}>
								<div style={{textAlign:'center', marginTop:40, marginBottom:25, fontSize:14}}>
									<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
									<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
									<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
								</div>
							</Grid>
							{(waiting) ? (<div className="global-loading">
							{(server !== true) ? (												
								<CircularProgress style={{ color: "black" }} size={50} />):(<img className="error" alt="just alt"
								src="../baotri.png" />)}
							</div>) : (
									<div></div>
								)}
						</Grid>
					</Grid>
				</Grid>
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
			</div>
		) : (<div className="global-loading">
			{(server !== true) ? (												
			<CircularProgress style={{ color: "black" }} size={50} />):(<img className="error" alt="just alt"
			src="../baotri.png" />)}
			<LoginRequired open={dialogLoginOpen}></LoginRequired>
		</div>)
	}
}

export default connect()(withTheme()(CheckinComponent))
