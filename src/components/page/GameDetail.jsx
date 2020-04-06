import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import Slider from 'react-slick'
import Ultilities from '../../Ultilities/global'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import Hidden from 'material-ui/Hidden'
import Rating from '../../components/Rating'

import Star from 'material-ui-icons/Star'
import PlayArrow from 'material-ui-icons/PlayArrow'
import StarBorder from 'material-ui-icons/StarBorder'
import { withTheme } from 'material-ui/styles'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import Notification from '../../components/Notification'
import Lightbox from 'react-images'
import moment from 'moment';
import '../../styles/style.css';

import {
	isAndroid,
	isIOS,
  } from "react-device-detect";

import YouTube from 'react-youtube'
import { withStyles } from 'material-ui/styles'
// import '../../styles/gameDetail.css'
// import '../../styles/carousel.css'
// import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#ecf5fe"
	},
};




class GameDetailComponent extends React.Component {
	
	constructor(props){
		super(props);
		this.state={
			data:props.data,
			numberImgDestop:0,
			numberImgTablet:0,
			numberImgMoble:0,
			width:"",
			height:"",
			paddingBottom:"",
			margin:"",
			compact: false,
			showButtonPlay: false,
			lightBoxOpen: false,
			lightBoxIndex: 0,
			marginTop:'',
			iframeWidth:230,
			iframeHeight:250,
			device:'',
		}
	}
	componentWillMount(){
		var d = new Date();
		var n = d.getFullYear();
		if (isIOS) {
			this.setState({device:'isIOS'})
		}
		if (isAndroid) {
			this.setState({device:'isAndroid'})
		}
		this.setState({year:n})
		this.onResize();
	}

	componentWillUnmount() {
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
		window.removeEventListener('scroll', this.handleScroll);
	}


	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.setState({ marginTop: '-68px' });
		} else {
			this.setState({ marginTop: '-30px' });
		}
		window.addEventListener('scroll', this.handleScroll);
	}

	onResize=()=>{
		if (window.innerWidth <= 600) {
			this.setState({ iframeWidth: window.innerWidth-20, iframeHeight:400});
			return;
		}
		if (window.innerWidth > 1024) {
			this.setState({ iframeWidth: 265, iframeHeight:400});
			return;
		}
	}

	handleScroll = (event) => {
		if (document.body.offsetWidth < 768) {
			this.setState({ compact: true });
		} else {
			this.setState({ compact: false });
		}

		if (document.body.getBoundingClientRect().top >-250){
			this.setState({ showButtonPlay: false });
		}else{

			this.setState({ showButtonPlay: true });
		}
	}
	UNSAFE_componentWillReceiveProps(nextProps){
		if(this.props.gameData !== nextProps.gameData){
			const _this=this;
			var arrScreenShot = [];
			if (nextProps.gameData !== undefined) {
				if (nextProps.gameData.screenShot !== null && nextProps.gameData.screenShot !== "") {
					arrScreenShot = nextProps.gameData.screenShot.split(",");
				}
			}
			var link=arrScreenShot[0];
			if(link!=="" && link !== undefined){
				var img = new Image();
				img.onload = function() {
					if(this.width>this.height){
						_this.setState({numberImgDestop:3, numberImgTablet: 2, numberImgMoble: 1, height:"200px", margin:"0px 2px"})
					}else{
						_this.setState({numberImgDestop:5, numberImgTablet: 4, numberImgMoble: 3, paddingBottom:"160%"})	
					}
					// _this.setState({width:this.width, height: this.height})
				}
				img.src = link.replace("=download","");
			}	
		}
	}

	getDataGame=(obj)=>{
		this.props.getData(obj.scoinGameId);
	}

	goToLightBoxPrev=()=>{
		this.props.goToLightBoxPrev();
	}

	goToLightBoxNext=()=>{
		this.props.goToLightBoxNext();
	}

	openLightBox=(index)=>{
		this.props.openLightBox(index);
	}
	
	closeLightBox=()=>{
		this.props.closeLightBox();
	}

	openRatingDialog=()=>{
		this.props.openRatingDialog();
	}
	
	ratingAction=()=>{
		this.props.ratingAction();
	}

	changePointSubmit=(point)=>{
		this.props.changePointSubmit(point);
	}

	dialogYoutubeClose=()=>{
		this.props.dialogYoutubeClose();
	}

	dialogYoutubeOpen=(videoId)=>{
		this.props.dialogYoutubeOpen(videoId);
	}

	dialogRatingClose=()=>{
		this.props.dialogRatingClose();
	}

	dialogRatingOpen=()=>{
		this.props.dialogRatingOpen();
	}

	dialogLoginClose=()=>{
		this.props.dialogLoginClose();
	}

	dialogLoginOpen=()=>{
		this.props.dialogLoginOpen();
	}

	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	readMore=()=>{
		this.props.readMore();
	}

	compact=()=>{
		this.props.compact();
	}

	getTheLoai=(obj)=>{
		var tagsList=obj.tagsList;
		console.log(tagsList)
		var theloai="";
		if (tagsList !== undefined) {
			for(var i=0; i<tagsList.length;i++){
				if (tagsList[i].typeName === "theloai") {
					theloai=tagsList[i].name;
					break;
				}
			};
		}
		return theloai;
	}

	isEmpty=(obj)=> {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return false;
		}
		return true;
	}

	render() {
		const {data, dataGiftcode, youtubeData, dialogLoginOpen, dialogRatingOpen, videoId, pointSubmit, showMore, message,gameCare, gameMoi,
			 snackVariant, openSnack,lightBoxOpen, lightBoxIndex, youtubeOpen, gameArticles, gameData,server}=this.props;

		const { classes } = this.props;
		const {iframeWidth, iframeHeight, year}=this.state;
		const { theme } = this.props;
		const { primary, secondary } = theme.palette;
		const { fullScreen } = this.props;
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		var deviceType = Ultilities.getMobileOperatingSystem(userAgent);
		var arrScreenShot = [];
		var tagsList = [];
		if (!this.isEmpty(gameData)) {
			if (gameData.screenShot !== null && gameData.screenShot !== "") {
				arrScreenShot = gameData.screenShot.split(",");
			}
			if (gameData.tagsList!==null){
				tagsList=gameData.tagsList;
			}
		}
		var articlesData = gameArticles;
		var arrImages = [];
		

		arrScreenShot.map((obj, key) => {
			arrImages.push({ src: obj, caption: 'Screen shot' });
			return 0;
		});
		var settings = {
			infinite: true,
			speed: 500,
			slidesToShow: this.state.numberImgDestop,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 2000,
			responsive: [
				{
					breakpoint: 1080,
					settings: {
						slidesToShow: this.state.numberImgDestop,
						slidesToScroll: 1,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: this.state.numberImgTablet,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 520,
					settings: {
						slidesToShow: this.state.numberImgMoble,
						slidesToScroll: 1
					}
				}
			]
		};
		return (gameData!==undefined)?(<div>	
					<div class="py-3 container" style={{marginTop:55}}>
					<div class="row">
						<div class="col-sm-9 px-2">
							<div class="bg-white mb-3 content">
								<div class="detail-bannergame position-relative overflow-hidden">
									<img src={gameData.bigImage} class="overflow-hidden" width="100%" />
									<div class="row mx-0 position-absolute w-100 sum-game pt-3">
										<div class="col-md-9 pb-2">
											<div class="media px-1">
											<img src={gameData.defaultImage} alt={gameData.name} class="mr-3" style={{width:60}} />
											<div class="media-body mt-2">
												<h4 class="font13 font-weight-bold" style={{marginBottom:0}}>{gameData.name}</h4>
												{tagsList.map((obj, key)=>{
													return <span class="btn-tag-event font-weight-normal"> {obj.name} </span>
												})}
												<p class="font13 text-secondary pt-2">{gameData.downloadTurns ? gameData.downloadTurns.toLocaleString() : 0} Lượt tải</p>
											</div>
											</div>
										</div>
										<div id="btnPlay" class="col-md-3 text-center box-social pt-4">
											{/* <!-- <button type="button" class="btn btn-sm btn-block border-0 shadow-sm mx-1 border btn-hover text-uppercase text-white py-1"><span class="small">Chơi ngay</span></button>
											<button type="button" class="btn btn-sm btn-block btn-link mx-1 py-1">Fanpage</button> --> */}
											<a href={gameData.fanpageFB} title="Fanpage" style={{paddingRight:5}} target="_blank"><img src="../fb-fanpage.png" width="32" alt="Fanpage" /></a>
											<a href={gameData.groupFB} title="Group" style={{paddingRight:5}} target="_blank"><img src="../fb-group.png" width="32" alt="Group" /></a>
											<a href="tel:19001104" title="Support"><img src="../support.png" width="32" alt="Support" /></a>
										</div>
									</div>
									<div class="md-box-social md-mobile">                           
										<a href={gameData.fanpageFB} title="Fanpage" style={{paddingRight:5}} target="_blank"><img src="../fb-fanpage.png" width="32" alt="Fanpage" class="py-1" /></a>
										<a href={gameData.groupFB} title="Group" style={{paddingRight:5}} target="_blank"><img src="../fb-group.png" width="32" alt="Group" class="py-1" /></a>
										<a title="Support" href="tel:19001104"><img src="../support.png" width="32" alt="Support" class="py-1" /></a>
									</div>
							
								</div>
							</div>
							<div class="mb-3 font13 btn-md-mobile">
								<div style={{marginBottom:10}}>{(isIOS)?(<a href={gameData.urlDownloadIos} class="text-decoration-none"  target="_blank"><button type="button" class="btn btn-block shadow-sm btn-light py-2 text-uppercase"><span class="small">Tải ngay</span></button></a>):(<div></div>)}</div>
								<div style={{marginBottom:10}}>{(isAndroid)?(<a href={gameData.urlDownloadAndroid} class="text-decoration-none"  target="_blank"><button type="button" class="btn btn-block shadow-sm btn-light py-2 text-uppercase"><span class="small">Tải ngay</span></button></a>):(<div></div>)}</div>
								<a href='https://scoin.vn/nap-game' class="text-white text-decoration-none" target="_blank"><button type="button" class="btn btn-block shadow-sm border text-white btn-hover text-uppercase py-2"><span class="small">Nạp Game</span></button></a>
							</div>
							<div class="bg-white p-3 mb-3 font13">
								<h2 class="font16 color-title-cat font-weight-bold pb-2">Chi tiết</h2>
								<div id="demo" class="carousel slide pb-3" data-ride="carousel" data-touch="true" data-wrap="true">
									<Grid item xs={12} style={{
									width: "100%",
									overflow: "hidden",
									padding:"0px 30px"
									}}>
										<Slider dotsClass={"slick-dots carousel-dot"} {...settings} >
											{arrScreenShot.map((obj, key) => (
												<div key={key} style={{}}>
													<div onClick={() => this.openLightBox(key)} style={{
														backgroundImage: "url(" + obj + ")",
														backgroundRepeat: "no-repeat",
														backgroundPosition: "center",
														backgroundSize: "contain",
														with: "100%",
														height:this.state.height,
														margin:this.state.margin,
														paddingBottom: this.state.paddingBottom
													}}>
													</div>
												</div>
											))}
										</Slider>
									</Grid>
								</div>
								<div>
									{(showMore) ? (
										<div>
											<div style={{ padding: "10px", lineHeight:'20px' }}
												dangerouslySetInnerHTML={{ __html: gameData.description }}>
											</div>
											<a style={{
													color: '#00cc00',
													cursor:'pointer',
													textAlign: "center",
													width: "100%",
													display: "block",
													position: "absolute",
													paddingTop: "20px",
													marginTop: "-40px",
													background: "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.6), rgba(255,255,255,.9), rgba(255,255,255,1))"
													
												}} onClick={() => this.compact()}>Thu gọn</a>
										</div>
									) : (<div style={{ position: "relative", padding: "10px" }}>
										<HTMLEllipsis
											unsafeHTML={gameData.description}
											maxLine='5'
											ellipsis='...'
											basedOn='letters'
											style={{lineHeight:"20px", fontSize:14}}
										/>
										<a style={{
											color: '#00cc00',
											cursor:'pointer',
											textAlign: "center",
											width: "100%",
											display: "block",
											position: "absolute",
											paddingTop: "20px",
											marginTop: "-40px",
											background: "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.6), rgba(255,255,255,.9), rgba(255,255,255,1))"
											
										}} onClick={() => this.readMore()}>Xem thêm</a>
									</div>
										)}
								</div>
							</div>
							<div class="bg-white p-3 mb-3 font13">
								<h2 class="font16 color-title-cat font-weight-bold pb-2">Video</h2>
								{(youtubeData !== undefined && youtubeData.length > 0) ? (
									<Grid container style={{
										width: "100%",
										borderRadius: "5px",
										margin: "8px 0px 0px 0px",
										overflow: "hidden",
										padding: "8px"
									}}>
										<Grid item xs={12}>
											<Grid container className="game-giftcode-root">
												<Grid item xs={12}>
													<div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
														<div style={{ display: "flex" }}>
															{youtubeData.map((obj, key) => {
																if (obj.id.kind !== "youtube#channel") {
																	return (
																		<div
																			key={key}
																			onClick={() => this.dialogYoutubeOpen(obj.id.videoId)}
																			style={{ padding: "8px", cursor: "pointer", position: "relative", width: "180px", paddingTop: "3px", paddingBottom: "3px" }}>
																			<Grid container spacing={8} style={{ margin: "0px", width: "100%" }}>
																				<Grid item xs={12} style={{ padding: "0px" }}>
																					<div style={{
																						backgroundImage: "url(" + obj.snippet.thumbnails.medium.url + ")",
																						backgroundSize: "cover",
																						backgroundPostition: "center middle",
																						height: "90px",
																						width: "140px",
																						textAlign: "center",
																						paddingTop: "8px"
																					}}><PlayArrow style={{ color: secondary.main, margin: "auto", width: "72px", height: "72px" }}></PlayArrow></div>
																				</Grid>
																				<Grid item xs={12} style={{ padding: "0px", color: 'black', fontSize: "0.9em", lineHeight:'13px', marginTop:8 }}>
																					{obj.snippet.title}
																				</Grid>
																			</Grid>
																		</div>)
																} else {
																	return (<div></div>)
																}
															})}
														</div>
													</div>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								) : (<div></div>)}
							</div>
							<div class="mb-3 bg-white p-3">
								<h2 class="font16 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game có thể bạn quan tâm</span></h2>
								<div class="row">
									{gameCare.map((obj, key)=>{
										return (
											<div class="col-6 col-md-4 px-3" key={key} style={{cursor:'pointer'}} onClick={()=>this.getDataGame(obj)}>
												<div class="thumb-lat-the position-relative">
													<a class="text-dark">
														<img src={obj.bigImage} width="100%" />
													</a>
												</div>
												<h3 class="font13 py-2"><a title="Thái cổ thần vương" class="text-dark">{obj.name}</a></h3>
											</div>
										)
									})}
									
									
								</div>
								
							</div>
						</div>
						<div class="col-sm-3 px-2">
							<div class="download">
								<a href={gameData.urlDownloadIos}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải iOS <img src="../icon-ios.png" alt="" width="24" /></span></button></a>
								<a href={gameData.urlDownloadAndroid}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải Android <img src="../icon-android.png" alt="" width="24" /></span></button></a>
								<a href={gameData.website}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải bản pc <img src="../icon-windows.png" alt="" width="24" /></span></button></a>
								<a href="https://scoin.vn/nap-game" target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm border btn-hover text-uppercase text-white py-4"><span class="small">Nạp Game</span></button></a>                
							</div>
							<div class="bg-white mt-3">
								<iframe src={"https://www.facebook.com/plugins/page.php?href="+gameData.fanpageFB+"%2F&tabs=timeline&width="+iframeWidth+"&height="+iframeHeight+"&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=138908086313274"} width={iframeWidth} height={iframeHeight} style={{border:'none',overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
								
							</div>
							
							<div class="bg-white mt-3">
								<h2 class="font16 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game Mới </span></h2>
								{gameMoi.map((obj, key)=>{
										return (
											<div class="media border-bottom py-2 my-1" style={{cursor:'pointer'}} onClick={()=>this.getDataGame(obj)}>
												<img src={obj.defaultImage} alt={obj.name} class="mr-3" style={{width:60}} />
												<div class="media-body">
													<h4 class="font13 font-weight-bold">{obj.name}</h4>
													<p class="small">{obj.downloadTurns ? obj.downloadTurns.toLocaleString() : 0} lượt tải</p>
												</div>
											</div>
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
				<Dialog
							fullScreen={fullScreen}
							open={youtubeOpen}
							onClose={this.dialogYoutubeClose}
							aria-labelledby="responsive-dialog-title"
							fullWidth={true}
							classes={{ paper: classes.paper }}
						>
							<DialogContent>
								<YouTube
									videoId={videoId}
									opts={{
										width: '100%',
										playerVars: {
											autoplay: 1
										}
									}}
								/>
							</DialogContent>
							<DialogActions>
								<div>
									<Button onClick={this.dialogYoutubeClose} style={{ color: "#888787", borderRadius: "20px" }}>
										Đóng
              </Button>
								</div>
							</DialogActions>
						</Dialog>
						{((arrImages !== undefined) && (
							<Lightbox
								images={arrImages}
								currentImage={lightBoxIndex}
								isOpen={lightBoxOpen}
								onClickNext={this.goToLightBoxNext}
								onClickPrev={this.goToLightBoxPrev}
								onClose={this.closeLightBox}
							/>
						))}

		</div>):(<div></div>)
	}
}

GameDetailComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles)(withTheme()(GameDetailComponent))))
