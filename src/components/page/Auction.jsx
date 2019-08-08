import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import LoginRequired from '../../components/LoginRequired'
import { Avatar } from 'material-ui'
import { ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import PopupDetailBonus from '../../components/PopupDetailBonus';
import ReactResizeDetector from 'react-resize-detector'
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles'
import '../../styles/auction.css'
import '../../styles/imageServerError.css'

const styles = theme => ({
	root: {
		borderRadius: "5px",
		width: "100%"
	},
	gridItem: {
		display: "flex",
		height: "100%",
		borderRadius: "5px",
		overflow: "hidden",
		padding: "8px",
		backgroundColor: "#fff",
		justifyContent: "space-between"
	},
	gridLink: {
		textDecoration: "none",
	}
});

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: "0px", paddingTop: "10px" }}>
			{props.children}
		</Typography>
	);
}

class AuctionComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			openDetailBonus:false,
			speed:10,
			device:false,
			close:'block',
		};
	}

	componentWillMount(){
		if (document.body.offsetWidth < 768) {
			this.setState({ device: 'mobile' });
		} else if(document.body.offsetWidth >= 768 && document.body.offsetWidth < 1366){
			this.setState({ device: 'tablet' });
		}else {
			this.setState({ device: 'destop' });
		}
	}
	onResize=()=>{
		if (document.body.offsetWidth < 768) {
			this.setState({ device: 'mobile' });
		} else if(document.body.offsetWidth >= 768 && document.body.offsetWidth < 1366){
			this.setState({ device: 'tablet' });
		}else {
			this.setState({ device: 'destop' });
		}
	}
	handleChange=(event, value)=>{
		this.props.handleChange(event,value);
	}

	loadMoreAllAction=()=>{
		this.props.loadMoreAllAction()
	}

	loadMoreShopItemGiftcodeAction=()=>{
		this.props.loadMoreShopItemGiftcodeAction()
	}

	loadMoreShopItemAction=()=>{
		this.props.loadMoreShopItemAction()
	}

	loadMoreAction=()=>{
		this.props.loadMoreAction()
	}
	handleCloseBonus=()=>{
		this.setState({openDetailBonus:false});
	}
	handleOpenBonus=()=>{
		this.setState({openDetailBonus:true});
	}
	getStatusAuction=(obj)=>{
		var status="";
		var color="";
		var distance=6 * 3600 * 1000;
		var now=Date.now();
		var end=obj.toDate;
		var duration=end-now;
		if (duration > distance) {
			status = "ĐANG DIỄN RA";
			color="#00e24d";
		}
		if (duration < distance) {
			status = "SẮP KẾT THÚC";
			color="#de352f";
		}
		if (duration < 0) {
			status = "HẾT HẠN";
			color="#888787";
		}
		return {status,color};
	}
	getStringBonus=(obj)=> {
		var output = document.getElementById("bonus");
		var bonus="";
		for (let i = 0; i < obj.length; i++) {
			bonus+='<span>Chúc mừng <span style="color:#00bf98">'+ obj[i].userName+'</span>'+' vừa giành được '+ '<span style="color:#ff9d42">'+ obj[i].itemName+'</span>'+' từ sự kiện ' +'<span style="color:#00bf98">'+ obj[i].eventName+'.'+'</span></span>&nbsp;&nbsp;&nbsp;&nbsp;'
		}
		if(output!==null){
			output.insertAdjacentHTML('beforeend',bonus)
		}
	}
	handleMouseOut=()=>{
		this.setState({speed:10});
	}
	handleMouseOver=()=>{
		this.setState({speed:0});
	}

	setImage=(type)=>{
		if(type==="XU"){
			return <img src={"../Xu.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}else if(type==="THIT"){
			return <img src={"../thit.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}else if(type==="SCOIN"){
			return <img src={"../scoin.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}else{
			return <img src={"../scoin.png"} style={{ width: "22px", verticalAlign: "text-bottom" }} />
		}
	}
	closeMarquee=()=>{
		this.setState({close:'none'})
	}

	getNameObject=(v)=>{
		const {device}=this.state;
		var l=0;
		if(device==="mobile"){
			l=16
		}else if(device==="tablet"){
			l=19
		}else{
			l=25;
		}
		if(v.length>l){
			return v.substring(0, l)+'...';
		}else{
			return v;
		}
	}

	render() {
		const { classes } = this.props;
		const { secondary } = this.props.theme.palette;
		const {dialogLoginOpen, value, waiting, loadedRecordsAll, loadedRecordsShopItem, loadedRecordsShopItemGiftcode,loadedRecords,
			data, totalRecords, profileData, dataShopItemGiftcode, waitingShopItemGiftcode, totalRecordsShopItemGiftcode,
			dataShopItem, waitingShopItem, totalRecordsShopItem, dataAll, waitingAll, totalRecordsAll,server,dataAutionAndLucky}=this.props;
		if(dataAutionAndLucky!==null && dataAutionAndLucky.length>0){
			this.getStringBonus(dataAutionAndLucky)
		}
		return (
			<div className={classes.root}>
				<Grid container spacing={8} style={{ width: "100%", margin: "0px" }}>
					<Grid item xs={12} md={12}>
						<Grid container spacing={8} justify="center" style={{backgroundColor:'#fff'}}>
							<Grid item xs={12} >
								<AppBar
									style={{ boxShadow: "none", borderBottom:'1px solid #d1d1d1'}}
									position="static">
									<Toolbar style={{ display: "block", minHeight: "auto", padding: "5px", margin: "0px"}}>
										<Tabs value={value} onChange={this.handleChange}>
											<Tab style={{width:'33%'}} label="Tất cả" />
											<Tab style={{width:'33%'}} label="Code" />
											<Tab style={{width:'33%'}} label="Đấu giá" />
										</Tabs>
									</Toolbar>
								</AppBar>
								{value === 0 && <TabContainer style={{
									padding: "0px"
								}}>
									{(dataAll.length <= 0 && !waitingAll) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center", color:'#676767' }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8}>
										{dataAll.map((obj, key) => (
											<Grid key={key} item xs={12} sm={12}>
												<Link to={(obj.objectType === "auction") ? "/auctiondetail/" + obj.shopingItemAndAuction.id : "itemgiftcodedetail/" + obj.shopingItemAndAuction.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem} style={{ border:'1px solid #d1d1d1', padding:15, borderRadius:5 }}>
														<div style={{ width: "70%", position: "relative" }}>
														{(obj.shopingItemAndAuction.hasPromotion)?(<div><div><span className="auctionNameWhite">{this.getNameObject(obj.shopingItemAndAuction.name)}</span>&nbsp;&nbsp;<span style={{color:"#fff", padding:"2px 5px", backgroundColor:"#f24726", border:"0px solid", borderRadius:"5px"}}>{obj.promotion.tagView.toLocaleString()}% OFF</span></div>
														 	<div className="auctionNameBlack">{this.setImage(obj.shopingItemAndAuction.coinType)} <span style={{ color: "#fe8731" }}>{obj.promotion.newPrice.toLocaleString()}</span>&nbsp;&nbsp;&nbsp;<span style={{ color: "#fff", textDecoration:"line-through" }}>{obj.shopingItemAndAuction.price.toLocaleString()}</span></div></div>):(<div><div className="auctionNameWhite">{obj.shopingItemAndAuction.name}</div>
														 	<div className="auctionNameBlack">{this.setImage(obj.shopingItemAndAuction.coinType)} <span style={{ color: "#fe8731" }}>{obj.shopingItemAndAuction.price.toLocaleString()}</span></div></div>)}
															<div style={{paddingTop:"5px"}}><span style={{color:"#12cdd4", borderRadius:"5px", padding:"1px 7px", border:"1px solid #12cdd4", fontSize:"12px"}}>{obj.shopingItemAndAuction.objectType}</span></div>
														</div>
														<div style={{
															width: "70px",
															paddingBottom: "80px",
															backgroundImage: "url(" + obj.defaultImage + ")",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															margin: "auto",
															backgroundPosition: "center"
														}}></div>
													</div>
												</Link>
											</Grid>
										))}
										{(waitingAll) ? (<Grid item xs={12}>
											<div className="global-loading">
											{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
											</div>
										</Grid>) : (totalRecordsAll > loadedRecordsAll) ? (
											<Grid item xs={12}>
												<div className="global-loadmore">
													<a onClick={this.loadMoreAllAction}>Xem thêm</a>
												</div>
											</Grid>
										) : (<div></div>)}
									</Grid>
								</TabContainer>}
								{value === 1 && <TabContainer style={{
									padding: "0px"
								}}>
									{(dataShopItemGiftcode.length <= 0 && !waitingShopItemGiftcode) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center", color:'#676767' }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{dataShopItemGiftcode.map((obj, key) => (
											<Grid key={key} item xs={12} sm={12}>
												<Link to={"/itemgiftcodedetail/" + obj.shopingItem.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem} style={{ border:'1px solid #d1d1d1', padding:15, borderRadius:5 }}>
														<div style={{ width: "70%", position: "relative" }}>
															{(obj.shopingItem.hasPromotion)?(<div><div className="auctionNameWhite"><span >{obj.shopingItem.name}</span>&nbsp;&nbsp;<span style={{color:"#fff", padding:"2px 5px", backgroundColor:"#f24726", border:"0px solid", borderRadius:"5px"}}>{obj.promotion.tagView.toLocaleString()}</span></div>
														 	<div className="auctionNameBlack">{this.setImage(obj.shopingItem.coinType)} <span style={{ color: "#fe8731" }}>{obj.promotion.newPrice.toLocaleString()}</span>&nbsp;&nbsp;&nbsp;<span style={{ color: "#fff", textDecoration:"line-through" }}>{obj.shopingItem.price.toLocaleString()}</span></div></div>):(<div><div className="auctionNameWhite">{obj.shopingItem.name}</div>
														 	<div className="auctionNameBlack">{this.setImage(obj.shopingItem.coinType)} <span style={{ color: "#fe8731" }}>{obj.shopingItem.price.toLocaleString()}</span></div></div>)}
															
														</div>
														<div style={{
															width: "70px",
															paddingBottom: "80px",
															backgroundImage: "url(" + obj.defaultImage + ")",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															margin: "auto",
															backgroundPosition: "center"
														}}></div>
													</div>
												</Link>
											</Grid>
										))}
										{(waitingShopItemGiftcode) ? (<Grid item xs={12}>
											<div className="global-loading">
											{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
											</div>
										</Grid>) : (totalRecordsShopItemGiftcode > loadedRecordsShopItemGiftcode) ? (
											<Grid item xs={12}>
												<div className="global-loadmore">
													<a onClick={this.loadMoreShopItemGiftcodeAction}>Xem thêm</a>
												</div>
											</Grid>
										) : (<div></div>)}
									</Grid>
								</TabContainer>}
								{value === 2 && <TabContainer style={{
									padding: "0px"
								}}>
									{(data.length <= 0 && !waiting) ? (<Grid container spacing={8}><Grid item xs={12} style={{ textAlign: "center", color:'#676767' }}>Không có vật phẩm</Grid></Grid>) : (<span></span>)}
									<Grid container spacing={8} >
										{data.map((obj, key) => (
											<Grid key={key} item xs={12} sm={12}>
												<Link to={"/auctiondetail/" + obj.id} key={key} className={classes.gridLink}>
													<div className={classes.gridItem} style={{ border:'1px solid #d1d1d1', padding:15, borderRadius:5 }}>
														<div style={{ width: "70%", position: "relative" }}>
															<div className="auctionNameWhite">{obj.name}</div>
															<div className="auctionNameBlack">{this.setImage(obj.coinType)} <span style={{ color: "#fe8731" }}>{obj.topPrice.toLocaleString()}</span></div>
															<div className="auction-name" style={{
																	textAlign: "left",
																	width: "100%",
																	overflow: "hidden",
																	fontSize:"11px",
																	textOverflow: "ellipsis",
																	whiteSpace: "nowrap",
																	color: this.getStatusAuction(obj).color,
																	padding: "5px"
																}}>{this.getStatusAuction(obj).status}</div>
														</div>
														<div style={{
															width: "70px",
															paddingBottom: "80px",
															backgroundImage: "url(" + obj.defaultImage + ")",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															margin: "auto",
															backgroundPosition: "center"
														}}></div>
													</div>
												</Link>
											</Grid>
										))}
										{(waiting) ? (<Grid item xs={12}>
											<div className="global-loading">
											{(server !== true) ? (												
												<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
												src="../baotri.png" />)}
											</div>
										</Grid>) : (totalRecords > loadedRecords) ? (
											
												<div item xs={12} className="div_more_lucky" onClick={this.loadMoreAction}>
													<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_add.png" alt="icon"/></div><span style={{float:'left', color:'black'}}>Xem Thêm</span>
												</div>
										) : (<div></div>)}
									</Grid>
								</TabContainer>}
							</Grid>
							<Link to="/history" style={{width:"100%", color: '#31cbcb'}}>
								<div item xs={12} className="div_btn_history" onClick={this.loadMoreAction}>
									<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../history-clock-button.png" alt="icon"/></div><span style={{float:'left'}}>Lịch sử mua sắm</span>
								</div>
							</Link>
						</Grid>
						<Grid item xs={12} style={{borderTop:'1px solid #d1d1d1', paddingTop:15, marginTop:15}}>
								<div style={{textAlign:'center', marginTop:20, marginBottom:25, fontSize:14}}>
									<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
									<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
									<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
								</div>
							</Grid>
					</Grid>
				</Grid>
				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
				<PopupDetailBonus
					handleCloseBonus={this.handleCloseBonus}
					openDetailBonus={this.state.openDetailBonus}
					dataAutionAndLucky={dataAutionAndLucky}
				/>
			</div>
		)
	}
}

export default connect()(withStyles(styles)(withTheme()(AuctionComponent)))
