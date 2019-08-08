import React from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { ListItemText } from 'material-ui/List'
import '../styles/mission.css'



class PopupMission extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			openBonus:false,
			message:""
		};
	}
	handleClosePopupMission=()=>{
		this.props.handleClosePopupMission();
	}
	handleCloseBonus=()=>{
		this.setState({openBonus:false});
	}
	handleOpenBonus=()=>{
		this.setState({openBonus:true});
	}
	doMission=(obj)=>{
		if(obj.condition===false){
			this.setState({openBonus:true, message:"Rất tiếc bạn không đủ điều kiện nhận thưởng."});
		}else{
			this.props.doMission(obj.actionName, obj.objectId, obj.objectValue, obj.scoinGameId);
		}
	}
	reward=(id)=>{
		this.props.reward(id);
		this.props.handleClosePopupMission();
	}
	render() {
		const {dataMission,openPopupMission}=this.props;
		return (
			<div>
				<Dialog
					fullScreen={false}
					onBackdropClick={this.props.handleClosePopupMission}
					open={openPopupMission}
					aria-labelledby="responsive-dialog-title"
				>	
				<div style={{background:"#fff"}}>
					<DialogTitle id="responsive-dialog-title"><span style={{ color: "#666666", fontWeight:'bold', fontSize:18 }}>Chi tiết nhiệm vụ</span></DialogTitle>
					<DialogContent style={{ color: "#fff" }}>
					{(dataMission !==undefined) ? (
						<div>		
							<div style={{minWidth:"200px"}}>
								<span style={{ color: "#666666", fontSize:16 }}>{dataMission.description}</span>
							</div>
								<div>
									<div style={{background:"#ecf4fe", marginTop:"15px", marginBottom:"15px", paddingBottom:15}}>
										{dataMission.missionProgress.map((obj, key) => {
											return (
												<div key={key}>
													{(obj.isFinish) ? (
														<div style={{padding:"15px 0px 0px 15px"}}>
															<img style={{background:"#47ac2c", marginRight:"15px"}} src="../check.png"alt="just alt"/>
															<span style={{ color: "#666666", fontSize:16 }}>1/1</span>
														</div>):(
														<div style={{padding:"15px 0px 0px 15px"}}>
															
															<div style={{width:"18px", height:"18px", border:"1px solid #779796", float:"left", marginRight:"15px"}}></div>
															<span style={{ color: "#666666", fontSize:16 }}>0/1</span>
														</div>)}
												</div>
											)
										})}
									</div>
									<div>
										<div style={{float:"left", paddingRight:"15px", color: "#666666", fontSize:16}}>Phần thưởng: </div>
										<div>
											{(dataMission.award === "XU") ? (
											<ListItemText style={{width:"100%", padding:"0 7px"}} disableTypography={true}
												secondary={(
													<span className="global-thit" style={{ color: "#ff9933" }}><img alt="just alt"
														src="../icon_xu.png" /> <span className="valueBonus">+{dataMission.valueAward}</span></span>)} />) : (<div></div>)}
											{(dataMission.award === "TURN_SPIN") ? (
											<ListItemText style={{width:"100%", padding:"0 7px"}} disableTypography={true}
												secondary={(
													<span className="global-thit" style={{ color: "#ff9933" }}><span className="valueBonus">+{dataMission.valueAward} lượt lật thẻ</span></span>)} />) : (<div></div>)}
										</div>
									</div>
								</div>
						</div>
					):(<div></div>)}
					</DialogContent>
					<DialogActions>
						<div>
							<button onClick={this.handleClosePopupMission} className="btn_close_popup">
								Đóng
							</button>
						</div>
						{(dataMission !==undefined) ? (
						<div>
							{(dataMission.finish && !dataMission.received && dataMission.awardAvailable !==0 && dataMission.missionStatus ==="active") ? (
											<button onClick={() => this.reward(dataMission.missionId)}
												className="buttonFull"
													>Nhận</button>) : (<div></div>)}
							{(!dataMission.finish && !dataMission.received && dataMission.missionStatus ==="active" && dataMission.awardAvailable !==0) ? (
											<button
												className="buttonGhost"
												onClick={() => this.doMission(dataMission)}>Thực Hiện</button>
										) : (<div></div>)}
							{(dataMission.finish && dataMission.received && dataMission.missionStatus ==="active") ? (
								<Button style={{ color: "#888787", textTransform:"none" }} disabled>
									Đã Nhận
								</Button>
												// <button className="received" disabled>Đã nhận</button>
											) : (<div></div>)}
							{(dataMission.awardAvailable ===0 && dataMission.missionStatus ==="active") ? (
								<Button style={{ color: "#888787", textTransform:"none" }} disabled>
									Đã Hết
								</Button>
							// <button className="received" disabled>Đã hết</button>
							) : (<div></div>)}
							{(dataMission.missionStatus ==="inactive") ? (
								<Button style={{ color: "#888787", textTransform:"none" }} disabled>
									Hết Hạn
								</Button>
											// <button className="received" disabled>Hết hạn</button>
										) : (<div></div>)}
						</div>):(<div></div>)}
					</DialogActions>
					</div>
				</Dialog>
				<Dialog
					fullScreen={false}
					open={this.state.openBonus}
					aria-labelledby="responsive-dialog-title">
					<DialogContent style={{ color: "#666666", fontSize:16 }}>
						{this.state.message}
					</DialogContent>
					<DialogActions>
						<div>
							<button onClick={this.handleCloseBonus} className="btn_close_popup">
								Đóng
							</button>
						</div>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}


export default PopupMission
