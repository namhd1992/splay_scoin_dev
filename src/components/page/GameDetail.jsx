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
	isMobile
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
			widthImage:1024,
			widthScreenShot:200,
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
			this.setState({ iframeWidth: window.innerWidth-20, iframeHeight:400, widthImage:215, widthScreenShot:100});
			return;
		}
		if (window.innerWidth > 1024) {
			this.setState({ iframeWidth: 265, iframeHeight:400, widthScreenShot:200});
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
					if(isMobile){
						if(this.width>this.height){
							// _this.setState({numberImgDestop:3, numberImgTablet: 2, numberImgMoble: 1, height:"150px", margin:"0px 2px", widthScreenShot:widthScreenShot*1.5})
							_this.setState({widthScreenShot:200, heightScreenShot:100})
						}else{
							_this.setState({widthScreenShot:100, heightScreenShot:200})	
						}
					}else{
						if(this.width>this.height){
							_this.setState({widthScreenShot:400, heightScreenShot:200})
						}else{
							_this.setState({widthScreenShot:200, heightScreenShot:400})	
						}
					}
					
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

	showBXH=(week)=>{
		this.props.getWithWeekBXH(week)
	}

	showRanking=()=>{
		this.props.getDataRanking()
	}

	render() {
		const {data, dataGiftcode, youtubeData, dialogLoginOpen, dialogRatingOpen, videoId, pointSubmit, showMore, message,gameCare, gameMoi,
			 snackVariant, openSnack,lightBoxOpen, lightBoxIndex, youtubeOpen, gameArticles, gameData,server}=this.props;

		const { classes } = this.props;
		const {iframeWidth, iframeHeight, year, widthImage, heightScreenShot, widthScreenShot}=this.state;
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
			slidesToScroll: 5,
			autoplay: false,
			autoplaySpeed: 2000,
			responsive: [
				{
					breakpoint: 1080,
					settings: {
						slidesToShow: this.state.numberImgDestop,
						slidesToScroll: 5,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: this.state.numberImgTablet,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 520,
					settings: {
						slidesToShow: this.state.numberImgMoble,
						slidesToScroll: 3
					}
				}
			]
		};
		return (gameData!==undefined)?(<div>	
					<div id="top" class="py-3 container" style={{marginTop:55}}>
					<div class="row">
						<div class="col-sm-9 px-2">
							<div class="bg-white mb-3 content">
								<div class="detail-bannergame position-relative overflow-hidden">
									<img src={gameData.bigImage} class="overflow-hidden" width="100%" />
									<div class="row mx-0 position-absolute w-100 sum-game pt-4">
										<div class="col-md-9">
											<div class="media px-1">
											<img src={gameData.defaultImage} alt={gameData.name} class="mr-3 mt-2" style={{width:60}} />
											<div class="media-body mt-2">
												<h4 class="h5 font-weight-bold" style={{marginBottom:0}}>{gameData.name}</h4>
												{tagsList.map((obj, key)=>{
													return <span class="btn-tag-event font-weight-normal"> {obj.name} </span>
												})}
												<p class="font13 text-secondary pt-2 mb-1">{gameData.downloadTurns ? gameData.downloadTurns.toLocaleString() : 0} Lượt tải</p>
											</div>
											</div>
										</div>
										<div id="btnPlay" class="col-md-3 text-center box-social pt-4">
											{/* <!-- <button type="button" class="btn btn-sm btn-block border-0 shadow-sm mx-1 border btn-hover text-uppercase text-white py-1"><span class="small">Chơi ngay</span></button>
											<button type="button" class="btn btn-sm btn-block btn-link mx-1 py-1">Fanpage</button> --> */}
											<span class="con-hover"><a href={gameData.fanpageFB} title="Fanpage"  class="img-hover" style={{paddingRight:5}} target="_blank"><img src="../fb-fanpage.png" width="32" alt="Fanpage" /></a></span>
											<span class="con-hover"><a href={gameData.groupFB} title="Group"  class="img-hover" style={{paddingRight:5}} target="_blank"><img src="../fb-group.png" width="32" alt="Group" /></a></span>
											<span class="con-hover"><a href="tel:19001104" title="Support"  class="img-hover"><img src="../support.png" width="32" alt="Support" /></a></span>
										</div>
									</div>
									<div class="md-box-social md-mobile">                           
										<span class="con-hover"><a href={gameData.fanpageFB} title="Fanpage"  class="img-hover" style={{paddingRight:5}} target="_blank"><img src="../fb-fanpage.png" width="32" alt="Fanpage" class="py-1" /></a></span>
										<span class="con-hover"><a href={gameData.groupFB} title="Group"  class="img-hover" style={{paddingRight:5}} target="_blank"><img src="../fb-group.png" width="32" alt="Group" class="py-1" /></a></span>
										<span class="con-hover"><a title="Support" href="tel:19001104"  class="img-hover"><img src="../support.png" width="32" alt="Support" class="py-1" /></a></span>
									</div>
							
								</div>
							</div>
							<div class="mb-3 font13 btn-md-mobile">
								{(gameData.gameType==='MOBILE')?(<div>
									<div style={{marginBottom:10}}>{(isIOS)?(<a href={gameData.urlDownloadIos} class="text-decoration-none"  target="_blank"><button type="button" class="btn btn-block shadow-sm btn-downgame text-white py-2 text-uppercase"><span class="small">Tải ngay</span></button></a>):(<div></div>)}</div>
								<div style={{marginBottom:10}}>{(isAndroid)?(<a href={gameData.urlDownloadAndroid} class="text-decoration-none"  target="_blank"><button type="button" class="btn btn-block shadow-sm btn-downgame text-white py-2 text-uppercase"><span class="small">Tải ngay</span></button></a>):(<div></div>)}</div>
								</div>):(
									<a href={gameData.webgameUrl} class="text-decoration-none"  target="_blank"><button type="button" class="btn btn-block shadow-sm btn-downgame text-white py-2 text-uppercase"><span class="small">Chơi Ngay</span></button></a>
								)}
								
								<a href='https://scoin.vn/nap-game' class="text-white text-decoration-none" target="_blank"><button type="button" class="btn btn-block shadow-sm border text-white btn-hover text-uppercase py-2"><span class="small">Nạp Game</span></button></a>
							</div>
							<div class="bg-white p-3 mb-3 font13 text-justify">
								<h2 class="font16 color-title-cat font-weight-bold pb-2">Chi tiết</h2>
								<div id="demo" class="carousel slide pb-" data-ride="carousel" data-touch="true" data-wrap="true">
									<Grid item xs={12} style={{
									width: "100%",
									overflow: "hidden",
									padding:"0px 10px"
									}}>
										{/* <Slider dotsClass={"slick-dots carousel-dot"} {...settings} >
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
										</Slider> */}
										<div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
											<div style={{ display: "flex" }}>
											{arrScreenShot.map((obj, key) => (
												<div key={key} style={{marginRight:5}}>
													<div onClick={() => this.openLightBox(key)} style={{
														backgroundImage: "url(" + obj + ")",
														backgroundRepeat: "no-repeat",
														backgroundPosition: "center",
														backgroundSize: "contain",
														with: "100%",
														width: widthScreenShot,
														height:heightScreenShot,
														margin:this.state.margin,
														paddingBottom: this.state.paddingBottom
													}}>
													</div>
												</div>
											))}
											</div>
										</div>
									</Grid>
								</div>
								<div>
									{(showMore) ? (
										<div style={{ position: "relative", padding: "10px" }}>
											<div style={{ lineHeight:'20px' }}
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
							{(youtubeData !== undefined && youtubeData.length > 0) ? (
							<div class="bg-white p-3 mb-3 font13">
								<h2 class="font16 color-title-cat font-weight-bold pb-2">Video</h2>
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
																			class="thumb-lat-the position-relative"
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
																				<Grid item xs={12} style={{ padding: "0px", color: 'black', fontSize: "0.9em", lineHeight:'13px', marginTop:8, fontFamily:'Tahoma, Verdana, Arial' }}>
																					{obj.snippet.title}
																				</Grid>
																			</Grid>
																			<div class="overlay">
																			</div>
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
									</Grid></div>
								) : (<div class="bg-white p-3 mb-3 font13" style={{backgroundImage: "url(../loading.gif)", backgroundSize: "50px 50px",minHeight: 100,backgroundPositionX: "center", backgroundPositionY:'center', backgroundRepeat:'no-repeat'}}></div>)}
							
							<div class="mb-3 bg-white p-3">
								<h2 class="font16 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game có thể bạn quan tâm</span></h2>
								<div class="row">
									{gameCare.map((obj, key)=>{
										return (
											
											<div class="col-6 col-md-4 px-3" key={key} style={{cursor:'pointer'}} onClick={()=>this.getDataGame(obj)}>
												<a href="#top">
												<div class="thumb-lat-the position-relative">
													<a class="text-dark">
														<img src={obj.bigImage} width="100%" />
													</a>
													<h3 class="font13 py-2"><a title="Thái cổ thần vương" class="text-dark a_game">{obj.name}</a></h3>
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
						<div class="col-sm-3 px-2">
							<div class="download">
								{(gameData.gameType==="MOBILE")?(<div><a href={gameData.urlDownloadIos}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải iOS <img src="../icon-ios.png" alt="" width="24" /></span></button></a>
								<a href={gameData.urlDownloadAndroid}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải Android <img src="../icon-android.png" alt="" width="24" /></span></button></a>
								<a href={gameData.urlDownloadPC}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải bản pc <img src="../icon-windows.png" alt="" width="24" /></span></button></a></div>):(
									<a href={gameData.webgameUrl}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Chơi Ngay</span></button></a>
								)}
								
								<a href="https://scoin.vn/nap-game" target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm border btn-hover text-uppercase text-white py-4"><span class="small">Nạp Game</span></button></a>                
							</div>
							<div class="bg-white mt-3" style={{backgroundImage: "url(../loading.gif)", backgroundSize: "50px 50px",minHeight: 100,backgroundPositionX: "center", backgroundPositionY:'center', backgroundRepeat:'no-repeat'}}>
								<iframe src={"https://www.facebook.com/plugins/page.php?href="+gameData.fanpageFB+"%2F&tabs=timeline&width="+iframeWidth+"&height="+iframeHeight+"&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=138908086313274"} width={iframeWidth} height={iframeHeight} style={{border:'none',overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
								
							</div>
							
							<div class="bg-white pt-3 pl-3 mt-3">
								<h2 class="font16 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game mới </span></h2>
								{gameMoi.map((obj, key)=>{
										return (
											<a href="#top" style={{color:'black'}} class='a_game'>
											<div class="media border-bottom py-2 my-1" style={{cursor:'pointer'}} onClick={()=>this.getDataGame(obj)}>
												
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
				<div class="fixed-bottom rounded-circle top-rank text-danger container"><a href="#bxhmodal" data-toggle="modal"><img src="../top-rank.png" width="48" onClick={()=>this.showBXH('WEEK_BEFORE_LAST')} /></a></div>
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
								width={widthImage}
								onClickNext={this.goToLightBoxNext}
								onClickPrev={this.goToLightBoxPrev}
								onClose={this.closeLightBox}
							/>
						))}
		<div class="modal p-0" id="bxhmodal">
			<div class="modal-dialog">
				<div class="modal-content">
				{/* <!-- Modal body --> */}
				<div class="modal-body py-2 px-1">
					{/* <!-- Nav tabs --> */}
					<ul class="nav nav-tabs nav-justified">
					<li class="nav-item">
						<a class="nav-link active text-danger font-weight-bold" data-toggle="tab" href="#bxh" onClick={()=>this.showBXH('WEEK_BEFORE_LAST')}>BXH</a>
					</li>
					<li class="nav-item">
						<a class="nav-link text-danger font-weight-bold" data-toggle="tab" href="#thele">Thể lệ</a>
					</li>
					<li class="nav-item">
						<a class="nav-link text-danger font-weight-bold" data-toggle="tab" href="#phucloi" onClick={this.showRanking}>Phúc lợi</a>
					</li>
					<li class="">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</li>
					</ul>
					
					{/* <!-- Tab panes --> */}
					<div class="tab-content">
					<div class="tab-pane active" id="bxh">
						{/* <!-- Nav pills --> */}
						<ul class="nav nav-pills nav-justified mt-3">
						<li class="nav-item">
							<a class="nav-link text-secondary active small" data-toggle="pill" href="#tuantruongnua" onClick={()=>this.showBXH('WEEK_BEFORE_LAST')}>Tuần trước nữa</a>
						</li>
						<li class="nav-item">
							<a class="nav-link text-secondary small" data-toggle="pill" href="#tuantruoc" onClick={()=>this.showBXH('null')}>Tuần trước</a>
						</li>
						<li class="nav-item">
							<a class="nav-link text-secondary small" data-toggle="pill" href="#tuannay" onClick={()=>this.showBXH('THIS_WEEK')}>Tuần này</a>
						</li>
						</ul>
						
						{/* <!-- Tab panes --> */}
						<div class="tab-content">
						<div class="tab-pane active" id="tuantruongnua">
							<table class="table table-striped text-center mt-3 small">
								<thead>
								<tr>
									<th>Top</th>
									<th>Tên NV</th>
									<th>Rank</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>1</td>
									<td>Jo đẹp trai</td>
									<td>S-Kim cương <span class="badge badge-pill badge-danger">&nbsp;</span></td>
								</tr>
								<tr>
									<td>2</td>
									<td>Maya</td>
									<td>Kim cương <span class="badge badge-pill badge-danger">&nbsp;</span></td>
								</tr>
								<tr>
									<td>3</td>
									<td>Raul</td>
									<td>Vàng <span class="badge badge-pill badge-warning">&nbsp;</span></td>
								</tr>
								</tbody>
							</table>
							<h6 class="text-left"><span class="badge badge-pill badge-info">#</span> Thứ hạng của bạn</h6>
							<table class="table table-striped text-center mt-3 small">
								<tbody>
								<tr>
									<td>1</td>
									<td>Jo đẹp trai</td>
									<td>S-Kim cương <span class="badge badge-pill badge-danger">&nbsp;</span></td>
								</tr>
								<tr>
									<td colspan="2" class="font-italic">Chưa có dữ liệu</td>
									<td><button type="button" class="btn btn-info btn-sm">Xem chi tiết &rarr;</button></td>
								</tr>
								</tbody>
							</table>
							
						</div>
						<div class="tab-pane fade" id="tuantruoc">...</div>
						<div class="tab-pane fade" id="tuannay">...</div>
						</div>          
					</div>
					<div class="tab-pane fade" id="thele"><p class="mt-3">Thể lệ</p></div>
					<div class="tab-pane fade" id="phucloi">
						<h6 class="text-center mt-3">Rank tuần trước</h6>
						{/* <!-- Nav pills --> */}
						<ul class="nav nav-pills nav-justified">
						<li class="nav-item">
							<a class="nav-link active" data-toggle="pill" href="#tuan0"><span class="badge badge-pill badge-danger" style={{width: 30, height: 30}}>&nbsp;</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#tuan1"><span class="badge badge-pill badge-warning" style={{width: 30, height: 30}}>&nbsp;</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#tuan2"><span class="badge badge-pill badge-primary" style={{width: 30, height: 30}}>&nbsp;</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" data-toggle="pill" href="#tuan3"><span class="badge badge-pill badge-info" style={{width: 30, height: 30}}>&nbsp;</span></a>
						</li>
						</ul>
						{/* <!-- Tab panes --> */}
						<div class="tab-content">
						<div class="tab-pane active" id="tuan0">
							<h6 class="text-center mt-3">Quà nhận được <br /><span class="text-danger small">Hết hạn sau: 6 ngày 5h 43p 10s</span></h6>
							<div class="row pt-3">
							{/* <div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>
							<div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>                     */}
							</div>
						</div>
						<div class="tab-pane fade" id="tuan1">
							<h6 class="text-center mt-3 text-danger small">Xếp hạng của bạn trong chu kỳ trước không thuộc Rank này</h6>
							<div class="row pt-3">
							{/* <div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>
							<div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>                     */}
							</div>
						</div>
						<div class="tab-pane fade" id="tuan2">
							<h6 class="text-center mt-3 text-danger small">Xếp hạng của bạn trong chu kỳ trước không thuộc Rank này</h6>
							<div class="row pt-3">
							{/* <div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>
							<div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>                     */}
							</div>
						</div>
						<div class="tab-pane fade" id="tuan3">
							<h6 class="text-center mt-3 text-danger small">Xếp hạng của bạn trong chu kỳ trước không thuộc Rank này</h6>
							<div class="row pt-3">
							{/* <div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>
							<div class="col-3 pr-1 pl-3 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/kiem-the-truyen-ky.png" width="60" height="60" alt="Kiếm thế truyền kỳ"><h4 class="small pt-2">Rương KNB</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/long-ky-nguyen.png" width="60" height="60" alt="Long kỷ nguyên"><h4 class="small pt-2">Rương đồ thời trang</h4></a></div>
							<div class="col-3 px-0 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/thien-ma-quyet.png" width="60" height="60" alt="Thiên ma quyết"><h4 class="small pt-2">Bình máu cỡ lớn</h4></a></div>
							<div class="col-3 pr-3 pl-1 text-center"><a class="text-secondary" href="#" title=""><img src="images/thumb/vo-hon-chien.png" width="60" height="60" alt="Võ hồn chiến"><h4 class="small pt-2">1000 đá hồn thạch</h4></a></div>                     */}
							</div>
						</div>
						</div>  
					</div>
					</div>
				</div>

				</div>
			</div>
			</div>

		</div>):(<div></div>)
	}
}

GameDetailComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles)(withTheme()(GameDetailComponent))))
