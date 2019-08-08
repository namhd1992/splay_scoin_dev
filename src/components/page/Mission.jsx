import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import List, { ListItem, ListItemText } from 'material-ui/List'
// import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
// import CheckinIcon from 'material-ui-icons/CheckCircle'
// import LikeIcon from 'material-ui-icons/ThumbUp'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { withStyles } from "material-ui/styles/index"
import Notification from '../../components/Notification'
import LoginRequired from '../../components/LoginRequired'
import PopupMission from '../PopupMission'
import '../../styles/mission.css'
import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#fff",
	},
};

class MissionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title_popup:"",
			openPopupMission:false,
			height:0,
			paddingL:0,
		};
	}

	componentWillMount(){
		var w=window.innerWidth;
		var padding_l=0;
		if(w>1080){
			padding_l=100;
		}else if(w>=768){
			padding_l=30;
		}else{
			padding_l=0;
		}
		this.setState({paddingL:padding_l});
	}


	handleCloseDialogDetail=()=>{
		this.props.handleCloseDialogDetail();
	}
	
	showDetail=(detail, title_dialog)=>{
		this.props.showDetail(detail,title_dialog);
	}

	openPopupMission =(obj)=>{
		this.setState({openPopupMission:true, dataMission:obj});
	}
	closePopupMission =()=>{
		this.setState({openPopupMission:false});
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	
	reward=(id)=>{
		this.props.reward(id);
	}
	
	doMission=(action, id, value, scoinGameId,condition)=>{
		if(condition===false){
			this.props.showDetail("Rất tiếc bạn không đủ điều kiện nhận thưởng.", "");
		}else{
			this.props.doMission(action, id, value, scoinGameId);
		}
	}
	
	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}
	setId(key){
		return "img"+key;
	}

	getSrcImage(obj, key){
		var arr=["../icon_latthe_active.png" ,"../icon_diemdanh_active.png", "../icon_tich.png", "../icon_daugia.png"];
		var src="";
		if(obj.actionName === "1"){
			src=arr[1];
		}else if(obj.actionName === "2"){
			src=arr[2];
		}else if(obj.actionName === "3"){
			src=arr[3];
		}else if(obj.actionName === "4"){
			src=arr[4];
		}
		return src;
		
	}


	render() {
		const {data,totalRecords, waiting,dialogDetailOpen,dialogContent,loadedRecords
		, message,openSnack,dialogLoginOpen,snackVariant,server,title_dialog}=this.props;
		const { theme } = this.props;
		const { classes } = this.props;
		const { secondary } = theme.palette;

		return (<div>
			<Grid container style={{ width: "100%", margin: "0px" }}>
				<Grid item xs={12} md={12} >
					<Grid container>
						<Grid container xs={12} md={12} style={{background:'#fff', border:'1px solid #d0d0d1', padding: 10}}>
							<Grid item xs={12} md={12} style={{marginTop:5}}>
								<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_nhiemvu.png" alt="icon"/></div><span style={{float:'left', fontWeight:'bold', color:"#6a6a6a", fontSize:18}}>Nhiệm vụ</span>
							</Grid>
							{(data!==null)?(<Grid item xs={12} md={12}>
								<List className="mission-list-root" >
									{data.map((obj, key) => (
										<ListItem className="mission-item" key={key} style={{ backgroundColor: "#fff", border:"1px solid #cccccc", borderRadius: "5px", marginBottom: "10px", paddingRight: 2 }}>
											{/* {(obj.award === "Thịt") ? ( */}
											<div>
												<img style={{width:40, height:40, cursor:'pointer'}} src={this.getSrcImage(obj,key)}
													id={key}
													onClick={() => this.showDetail(obj.description,"Chi tiết nhiệm vụ")} />
											</div>
											{(obj.award === "XU") ? (
											<ListItemText style={{width:"60%", padding:"0 7px"}} disableTypography={true}
												primary={(<div className="mission_title">{obj.missionName}</div>)}
												secondary={(
													<span className="global-thit" style={{ color: "#fe8731" }}><img alt="just alt"
														src="../Xu.png" /> <span style={{ color: "#ff9933", fontSize:16, fontWeight:'bold' }}>+{obj.valueAward}</span> </span>)} />) : (<div></div>)}
											{(obj.award === "TURN_SPIN") ? (
											<ListItemText style={{width:"60%", padding:"0 7px"}} disableTypography={true}
												primary={(<div className="mission_title">{obj.missionName}</div>)}
												secondary={(
													<span className="global-thit" style={{ color: "#fe8731" }}><span style={{ color: "#ff9933", fontSize:16, fontWeight:'bold' }}>+{obj.valueAward} lượt lật thẻ</span> </span>)} />) : (<div></div>)}
											<div className="mission_action" style={{paddingLeft:this.state.paddingL}}>
												<img style={{width:30, height:30, float:'left', marginRight:5, marginTop:2, cursor:'pointer'}} src='../icon_question.png'
													onClick={() => this.openPopupMission(obj)} />
												{(obj.finish && !obj.received && obj.awardAvailable !==0 && obj.missionStatus ==="active") ? (<div>
													<button onClick={() => this.reward(obj.missionId)} className="buttonMissionReceive" variant="raised">Nhận</button>
												</div>) : (<div></div>)}
												{(!obj.finish && !obj.received && obj.missionStatus ==="active") ? (<div>
													<button className="buttonGhostMission" onClick={() => this.doMission(obj.actionName, obj.objectId, obj.objectValue, obj.scoinGameId,obj.condition)}>Thực Hiện</button>
												</div>) : (<div></div>)}
												{(obj.finish && obj.received && obj.missionStatus ==="active") ? (
													<Button style={{ color: "#888787", textTransform:"none", fontSize:16 }} disabled>
														Đã Nhận
													</Button>
												) : (<div></div>)}
												{(obj.finish && !obj.received && obj.awardAvailable ===0 && obj.missionStatus ==="active") ? (
													<Button style={{ color: "#888787", textTransform:"none", fontSize:16 }} disabled>
														Đã Hết
													</Button>
												) : (<div></div>)}
												{(obj.missionStatus ==="inactive") ? (
													<Button style={{ color: "#888787", textTransform:"none", fontSize:16 }} disabled>
														Hết Hạn
													</Button>
												) : (<div></div>)}
											</div>
										</ListItem>
									))}
								</List>
							</Grid>):(<div></div>)}
							
							{(waiting) ? (<Grid item xs={12} style={{ textAlign: "center" }}>
							{(server !== true) ? (												
									<CircularProgress style={{ color: "black" }} size={50} />):(<img className="error" alt="just alt"
									src="../baotri.png" />)}
							</Grid>) : (totalRecords > loadedRecords) ? (
								<div item xs={12} className="div_more_mission" onClick={this.loadMoreAction}>
									<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_add.png" alt="icon"/></div><span style={{float:'left'}}>Xem Thêm</span>
								</div>
							) : (<div></div>)}
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
			</Grid>
			<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			<Dialog
				fullScreen={false}
				open={dialogDetailOpen}
				onClose={this.handleCloseDialogDetail}
				aria-labelledby="responsive-dialog-title"
				classes={{ paper: classes.paper }}
			>
				<DialogTitle id="responsive-dialog-title"><span style={{ color: "#666666", fontWeight:'bold', fontSize:18 }}>{title_dialog}</span></DialogTitle>
				<DialogContent>
					<div>
						<span style={{ color: "#666666", fontSize:16 }}>{dialogContent}</span>
					</div>
				</DialogContent>
				<DialogActions>
					<div>
						<button onClick={this.handleCloseDialogDetail} className='btn_close_popup'>
							Đóng
		  				</button>
					</div>
				</DialogActions>
			</Dialog>
			<PopupMission
				handleClosePopupMission={this.closePopupMission}
				openPopupMission={this.state.openPopupMission}
				dataMission={this.state.dataMission}
				reward={this.reward}
				doMission={this.doMission}
			/>
			{/* <LoginRequired open={dialogLoginOpen} ></LoginRequired> */}
		</div>
		)
	}
}
MissionComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};


export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(MissionComponent)))
