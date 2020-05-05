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
import PopupMission from '../PopupMission';
import '../../styles/style.css';
import $ from 'jquery';
import 'bootstrap';
import {
	FacebookIcon,
	FacebookShareButton,
  } from "react-share";
// import '../../styles/mission.css'
// import '../../styles/imageServerError.css'

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
			dataMission:{},
			rangeTop:0,
		};
	}

	componentWillMount(){
		var d = new Date();
		var n = d.getFullYear();
		var w=window.innerWidth;
		var padding_l=0;
		if(w>1080){
			padding_l=100;
		}else if(w>=768){
			padding_l=30;
		}else{
			padding_l=0;
		}
		this.setState({paddingL:padding_l, year:n});
	}

	componentDidMount(){
		var testDiv = document.getElementById("top");
		this.setState({rangeTop: testDiv.offsetTop+15})
	}


	handleCloseDialogDetail=()=>{
		this.props.handleCloseDialogDetail();
	}
	
	showDetail=(detail, title_dialog)=>{
		this.props.showDetail(detail,title_dialog);
	}

	openPopupMission =(obj)=>{
		this.setState({dataMission:obj},()=>{
			$('#myModal').modal('show');
		});
	}

	closePopupMission=()=>{
		$('#myModal').modal('toggle');
	}

	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	
	reward=(obj)=>{
		this.props.reward(obj);
	}
	
	doMission=(obj)=>{
		if(obj.condition===false){
			// this.props.showDetail("Rất tiếc bạn không đủ điều kiện nhận thưởng.", "");
			$('#notification').modal('show');
		}else{
			this.props.doMission(obj);
		}
	}

	closeNotification=()=>{
		$('#notification').modal('hide');
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
	getDataGame=(obj)=>{
		return `http://sandbox.scoin.vn/splay?url=gamedetail%3Fservice_id%3D${obj.scoinGameId}`;

	}



	render() {
		const {data,totalRecords, waiting,dialogDetailOpen,dialogContent,loadedRecords
		, message,openSnack,dialogLoginOpen,snackVariant,server,title_dialog, gameCare, gameMoi, isShare}=this.props;
		const { theme } = this.props;
		const { classes } = this.props;
		const { secondary } = theme.palette;
		const {dataMission, year, rangeTop}=this.state;

		return (<div>
					<div id="top" class="container py-3 container-gamedetail">
						<div class="row">
							<div class="col-sm-9 px-1">
								<div class="bg-white p-3 mb-2 shadow-ssm card border-0">
									<h2 class="font16 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Nhiệm vụ</span></h2>
									{(data.length>0)?(<div>
									{data.map((obj, key) => {
										return ( <div class="card shadow-sm" key={key}>
										<div class="card-body" style={{padding:'15px 0px'}}>
											<div class="media position-relative">
											<img src="../icon_diemdanh_active.png" alt="Điểm danh" class="mr-3" width="48" />
											<div class="media-body">
												<h4 class="font14 font-weight-bold">{obj.missionName}</h4>
												<span class="font14 badge text-dark bg-badge-opacity-2 p-1 font-weight-normal"><img src="../Xu.png" alt="icon" width="16" class="mr-1" />{obj.valueAward} </span>
											</div>
											<div class="position-absolute action_mission" style={{right: -5}}>
												<span type="button" style={{cursor:'pointer'}} onClick={()=>this.openPopupMission(obj)}>
													<svg class="bi bi-info-circle-fill" width="20px" height="20px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
														<path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
													</svg>
												</span>
												{(!obj.finish)?(<div style={{display:'inline-block'}}>
													{(obj.actionId==='6')?(<div>
														<FacebookShareButton url={obj.linkToShare}>
															<button type="button" class="btn m-2 border text-uppercase text-white py-1 px-2 shadow-sm font12 btn-action-mission" style={{backgroundColor:"#ec971f"}} onClick={()=>this.doMission(obj)}><span class="small txt-action">Thực hiện</span></button>
											</FacebookShareButton>
														</div>):(<button type="button" class="btn m-2 border text-uppercase text-white py-1 px-2 shadow-sm font12 btn-action-mission" style={{backgroundColor:"#ec971f"}} onClick={()=>this.doMission(obj)}><span class="small txt-action">Thực hiện</span></button>)}
												</div>):(
													<div style={{display:'inline-block'}}>
														{(!obj.received)?(<button type="button" class="btn m-2 border text-uppercase text-white py-1 px-2 shadow-sm font12 btn-action-mission btn-action-mission" style={{backgroundColor:"#ec971f"}} onClick={()=>this.reward(obj)}><span class="small txt-action">Nhận thưởng</span></button>):(
															<button type="button" class="btn m-2 border text-uppercase text-white py-1 px-2 font12 btn-action-mission" style={{backgroundColor:'gray'}}><span class="small txt-action">Đã nhận</span></button>
														)}
													</div>
												)}
												
											</div>
											{/* <FacebookShareButton
												url={'https://codeburst.io/react-native-sqlite-and-migrations-bc72b70e66fb'}
												quote={'title'}
												className="Demo__some-network__share-button"
											>
												<FacebookIcon size={32} round />
											</FacebookShareButton> */}
											{/* <iframe src="https://www.facebook.com/plugins/share_button.php?href=https://techcombank.ngan-hang.com/chi-nhanh/ha-noi/chi-nhanh-linh-nam&layout=button_count&size=small&appId=254750115436704&width=86&height=20" width="86" height="20" style={{border:'none',overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe> */}
											</div>
										</div>
									</div>)
										}
									)}
									{(totalRecords > loadedRecords)?(<button type="button" class="btn btn-block shadow-sm m-3 border btn-hover text-uppercase text-white py-2"><span class="small">Còn {totalRecords-loadedRecords} game khác, Nhấn xem thêm</span></button>):(<div></div>)}

									</div>):(<div></div>)}               
								</div>
								<div class="mb-2 bg-white p-3 shadow-ssm card border-0">
									<h2 class="font16 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game có thể bạn quan tâm</span></h2>
									<div class="row">
										{gameCare.map((obj, key)=>{
											return (
												<div class="col-6 col-md-4 px-3" key={key} style={{cursor:'pointer'}} >
													<a href={this.getDataGame(obj)} target="_parent">
														<div class="thumb-lat-the position-relative">
															<a class="text-dark">
																<img src={obj.bigImage} width="100%" />
															</a>
															<h3 class="font14 py-2"><a title="Thái cổ thần vương" class="text-dark a_game">{obj.name}</a></h3>
															<div class="overlay">
																<div class="text text-white small">Chơi ngay &raquo;</div>
															</div>
														</div>
														
													</a>
												</div>
											)
										})}
									
									</div>
									
								</div>
							</div>
							<div class="col-sm-3 px-1">
								<div class="bg-white mb-2 pl-3 pt-3 shadow-ssm card border-0">
									<h2 class="font16 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game Mới </span></h2>
									{gameMoi.map((obj, key)=>{
										return (
											<a href={this.getDataGame(obj)} target="_parent" style={{color:'black'}}>
											<div class="media border-bottom py-2 my-1" style={{cursor:'pointer'}}>
												
												<img src={obj.defaultImage} alt={obj.name} class="mr-3" style={{width:60}} />
												<div class="media-body">
													<h4 class="font13 font-weight-bold">{obj.name}</h4>
													<p class="small">{obj.downloadTurns ? obj.downloadTurns.toLocaleString() : 0} lượt tải</p>
												</div>
											</div>
											</a>
										)
									})}
								</div>
							
							</div>
						</div>   
					</div>
					<div class="container font13">
						<p class="text-center"><a href="https://cs.vtcmobile.vn/" title="Hỗ trợ" target="_blank"><span>Hỗ trợ</span></a> | <a href="https://www.facebook.com/scoinvtcmobile" title="Fanpage" target="_blank"><span>Fanpage</span></a> | <a href="tel:19001104"><span>Điện thoại: <strong>1900 1104</strong></span></a></p>
						<p class="text-center" style={{lineHeight:'20px'}}>Hệ thống phát hành game VTC Mobile <br />
					Copyright {year} VTC Mobile. All rights reserved </p>
					</div>
					{/* <!-- The Modal Thong tin phan thuong --> */}
					<div class="modal fade" id="myModal" style={{marginTop:rangeTop}}>
					<div class="modal-dialog">
						<div class="modal-content">

						<div class="modal-header pb-0">
							<h4 class="modal-title font16 border-title-cat font-weight-bold color-title-cat">Chi tiết nhiệm vụ</h4>
							<button type="button" class="close" onClick={this.closePopupMission}>&times;</button>
						</div>
						{(JSON.stringify(dataMission) !== '{}')?(<div class="modal-body font13">
							<h5 class="font14">{dataMission.description}</h5>
							{(dataMission.missionProgress.length<5)?(
								<div class="bg-badge-opacity-2 p-2 my-3">
								<div class="form-check">
								{dataMission.missionProgress.map((obj, key) => {
									return (
										<div key={key}>
											{(obj.isFinish) ? (
												<label class="form-check-label">
													<img src="../check_mission.png" width="20" class="py-2" /> 1/1
												</label>
											):(<label class="form-check-label">
													<img src="../uncheck_mission.png" width="20" class="py-2" /> 0/1
												</label>
											)}
										</div>
									)
									
								})}
								</div>
							</div>
							):(
								<div class="bg-badge-opacity-2 p-2 my-3" style={{float:'left'}}>
								<div class="form-check">
								{dataMission.missionProgress.map((obj, key) => {
									return (
										<div key={key} style={{float:'left', marginRight: 70}}>
											{(obj.isFinish) ? (
												<label class="form-check-label">
													<img src="../check_mission.png" width="20" class="py-2" /> 1/1
												</label>
											):(<label class="form-check-label">
													<img src="../uncheck_mission.png" width="20" class="py-2" /> 0/1
												</label>
											)}
										</div>
									)
									
								})}
								</div>
							</div>
							)}
							
							<div>
							<p><strong>Giải thưởng</strong>  <span class="font13 text-dark p-1 font-weight-normal"><img src="../Xu.png" alt="icon" width="16" class="mr-1" /> {dataMission.valueAward} </span></p>
								</div>
						</div>):(<div></div>)}


						
						
						<div class="modal-footer">
									{(!dataMission.finish)?(<button type="button" class="btn btn-hover text-white text-uppercase" style={{ width:110}} onClick={()=>this.doMission(dataMission)}><span class="small">Thực hiện</span></button>):(
										<div style={{display:'inline-block'}}>
											{(!dataMission.received)?(<button type="button" class="btn btn-hover text-white text-uppercase" style={{ width:110}} onClick={()=>this.reward(dataMission)}><span class="small">Nhận thưởng</span></button>):(
												<button type="button" class="btn text-white text-uppercase" style={{backgroundColor:'gray', padding:'3px 10px',  width:110}}><span class="small" style={{color:'#fff'}}>Đã nhận</span></button>
											)}
										</div>
									)}
							{/* <button type="button" class="btn btn-hover"><span class="small">Thực hiện</span></button> */}
						</div>

						</div>
					</div>
					</div>


					{/* <!-- The Modal Thong báo --> */}
					<div class="modal fade" id="notification" style={{marginTop:rangeTop}}>
						<div class="modal-dialog">
							<div class="modal-content">

							<div>
								<button type="button" class="close" data-dismiss="modal" style={{marginRight:10, marginTop:10}}>&times;</button>
							</div>
							<h4 class="modal-title font15 font-weight-bold color-title-cat" style={{textAlign:'center'}}>Thông báo</h4>
							<p style={{textAlign:'center', marginTop:10, lineHeight:"20px"}}>Rất tiếc bạn không đủ điều kiện nhận thưởng.</p>

							<div style={{textAlign:'right', padding:'5px 30px 10px 0px'}}>
								<button type="button" class="btn btn-hover text-white" style={{padding:'7px 30px'}} onClick={this.closeNotification}><span class="small">OK</span></button>
							</div>

							</div>
						</div>
					</div>

					<Dialog
							fullScreen={false}
							open={dialogDetailOpen}
							onClose={this.props.handleCloseDialogDetail}
							aria-labelledby="responsive-dialog-title"
							classes={{ paper: classes.paper }}
						>
							<DialogTitle id="responsive-dialog-title"><span style={{ color: secondary.main, marginTop:5 }}>{title_dialog}</span></DialogTitle>
							<DialogContent>
								<div>
									{dialogContent}
								</div>
							</DialogContent>
							<DialogActions>
								<div>
									<Button onClick={this.props.handleCloseDialogDetail} style={{ color: "#fe8731", borderRadius:"20px" }}>Đóng</Button>
								</div>
				</DialogActions>
			</Dialog>
		</div>
		)
	}
}
MissionComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};


export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(MissionComponent)))
