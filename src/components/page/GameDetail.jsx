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
import $ from 'jquery';
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
			widthImage:450,
			widthScreenShot:200,
			rankPosition:1,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			items:[],
			active_bxh: true,
			active_thele:false,
			active_phucloi:false,
			positon_rank:0,
			data_ranking:[],
			rangeTop:0
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
		var testDiv = document.getElementById("top");
		this.setState({rangeTop: testDiv.offsetTop+15})
	}

	onResize=()=>{
		if (window.innerWidth <= 600) {
			this.setState({ iframeWidth: window.innerWidth-10, iframeHeight:400, widthImage:215, widthScreenShot:100});
			return;
		}
		if (window.innerWidth > 1024) {
			this.setState({ iframeWidth: 275, iframeHeight:400, widthScreenShot:200, widthImage:450});
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
		const {positon_rank}=this.state;
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
		if(this.props.endDateReceivedGift !== nextProps.endDateReceivedGift){
			this.timeRemain(nextProps.endDateReceivedGift);
		}

		if(this.props.data_ranking !== nextProps.data_ranking){
			this.setState({items: nextProps.data_ranking[positon_rank].items, data_ranking: nextProps.data_ranking})
		}
		
	}

	timeRemain=(times)=>{
		var _this=this;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
			}
		}, 1000);
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

	changeRanking=(obj)=>{
		const {data_ranking}=this.state
		var pos = data_ranking.map(function(e) { return e.rankPosition; }).indexOf(obj.rankPosition);
		this.setState({rankPosition:obj.rankPosition, items:obj.items, positon_rank:pos})
	}

	changeTabBXH=()=>{
		this.setState({active_bxh:true, active_thele:false, active_phucloi:false})
	}

	changeTabTheLe=()=>{
		this.setState({active_bxh:false, active_thele:true, active_phucloi:false});
	}

	changeTabPhucLoi=()=>{
		this.setState({active_bxh:false, active_thele:false, active_phucloi:true})
	}

	closeAward=()=>{
		$('#award_success').removeClass('show d-block').addClass('fade')
		$("#award_success").modal({backdrop: false});
	}
	
	closeError=()=>{
		$('#award_error').removeClass('show d-block').addClass('fade')
	}
	
	awards=(item)=>{
		this.props.awards(item);
		$('#award_success').addClass('show d-block')
		$('#award_success').modal({backdrop: 'static'});
		$("#award_success").css({paddingRight: 0});
	}


	render() {
		const {data, dataGiftcode, youtubeData, dialogLoginOpen, dialogRatingOpen, videoId, pointSubmit, showMore, message,gameCare, gameMoi,data_ranking, users,data_bxh,myPosition,item_award, message_error, show_award,show_award_error,
			 snackVariant, openSnack,lightBoxOpen, lightBoxIndex, youtubeOpen, gameArticles, gameData,server, week, gameRanking}=this.props;
		const { classes } = this.props;
		const {iframeWidth, iframeHeight, year, widthImage, heightScreenShot, widthScreenShot, rankPosition, day, hour, minute, second, items, active_bxh, active_phucloi, active_thele, rangeTop}=this.state;
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
					<div id="top" class="py-3 container container-gamedetail">
					<div class="row">
						<div class="col-sm-9 px-1">
							<div class="bg-white mb-2 content">
								<div class="detail-bannergame position-relative overflow-hidden card border-0 shadow-ssm mb-0">
									<img src={gameData.bigImage} class="overflow-hidden mb-4" width="100%" />
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
							<div class="bg-white p-3 mb-2 font13 text-justify shadow-ssm">
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
										<div style={{ overflowX: "scroll", overflowY: "hidden", whiteSpace:"nowrap"}}>
											{arrScreenShot.map((obj, key) => (
												<span key={key} style={{marginRight:5}} onClick={() => this.openLightBox(key)}>
													<img src={obj} width= {widthScreenShot} height={heightScreenShot} />
													{/* <div onClick={() => this.openLightBox(key)} style={{
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
													</div> */}
												</span>
											))}
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
													marginTop: "-30px",
													
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
							{/* {(youtubeData !== undefined && youtubeData.length > 0) ? (
							<div class="bg-white p-3 mb-2 font13 shadow-ssm">
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
								) : (<div class="bg-white p-3 mb-3 font13" style={{backgroundImage: "url(../loading.gif)", backgroundSize: "50px 50px",minHeight: 100,backgroundPositionX: "center", backgroundPositionY:'center', backgroundRepeat:'no-repeat'}}></div>)} */}
							
							<div class="mb-2 bg-white p-3 shadow-ssm">
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
						<div class="col-sm-3 px-1">
							<div class="download mb-2 card border-0 shadow-ssm bg-transparent">
								{(gameData.gameType==="MOBILE")?(<div><a href={gameData.urlDownloadIos}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải iOS <img src="../icon-ios.png" alt="" width="24" /></span></button></a>
								<a href={gameData.urlDownloadAndroid}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải Android <img src="../icon-android.png" alt="" width="24" /></span></button></a>
								<a href={gameData.urlDownloadPC}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Tải bản pc <img src="../icon-windows.png" alt="" width="24" /></span></button></a></div>):(
									<a href={gameData.webgameUrl}  target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm btn-light py-4 text-uppercase border" style={{marginBottom:10}}><span class="small">Chơi Ngay</span></button></a>
								)}
								
								<a href="https://scoin.vn/nap-game" target="_blank" style={{textDecoration:'none'}}><button type="button" class="btn btn-block shadow-sm border btn-hover text-uppercase text-white py-4"><span class="small">Nạp Game</span></button></a>                
							</div>
							<div class="bg-white mb-2 fb-box card border-0 shadow-ssm" style={{backgroundImage: "url(../loading.gif)", backgroundSize: "50px 50px",minHeight: 100,backgroundPositionX: "center", backgroundPositionY:'center', backgroundRepeat:'no-repeat'}}>
								<iframe src={"https://www.facebook.com/plugins/page.php?href="+gameData.fanpageFB+"%2F&tabs=timeline&width="+iframeWidth+"&height="+iframeHeight+"&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=138908086313274"} width={iframeWidth} height={iframeHeight} style={{border:'none',overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
								
							</div>
							
							<div class="bg-white p-3 mb-2 card border-0 shadow-ssm">
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
				{(gameRanking)?(<div class="fixed-bottom rounded-circle top-rank text-danger container"><a href="#bxhmodal" data-toggle="modal"><img src="../top-rank.png" width="48" onClick={()=>this.showBXH(week)} /></a></div>):(<div></div>)}
				
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


						{/* <Dialog
							fullScreen={false}
							open={show_award}
							onClose={this.props.closeAward}
							aria-labelledby="responsive-dialog-title"
							classes={{ paper: classes.paper }}
						>
							<DialogContent>
								<div class="small" style={{paddingRight:40, paddingLeft:40, lineHeight:"30px"}}>
									<span style={{fontWeight:'bold', fontSize:16}}>Tên phúc lợi:</span> <br></br>
								  	<span>{item_award.itemName}</span><br></br>
									<span style={{fontWeight:'bold', fontSize:16, marginTop:10}}>Nội dung:</span> <br></br>
								  	<span>{item_award.show_value ? item_award.show_value.toLocaleString() : 0}</span><br></br>
									{(item_award.consumable)?(<span style={{color:'red'}}>(Đã cộng vào tài khoản)</span>):(<div></div>)}
								</div>
							</DialogContent>
							<DialogActions>
								<div>
									<Button onClick={this.props.closeAward} style={{ color: "#fe8731", borderRadius:"20px" }}>Đóng</Button>
								</div>
							</DialogActions>
						</Dialog>

						<Dialog
							fullScreen={false}
							open={show_award_error}
							onClose={this.props.closeError}
							aria-labelledby="responsive-dialog-title"
							classes={{ paper: classes.paper }}
						>
							<DialogContent>
								<div>
									{message_error}
								</div>
							</DialogContent>
							<DialogActions>
								<div>
									<Button onClick={this.props.closeError} style={{ color: "#fe8731", borderRadius:"20px" }}>Đóng</Button>
								</div>
							</DialogActions>
						</Dialog> */}



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

					<div class={show_award ? "modal fade show d-block" : "modal fade"} id="award_success" style={{marginTop:rangeTop, zIndex:10006, backgroundColor:"rgba(0,0,0,0.6)"}}>
						<div class="modal-dialog">
							<div class="modal-content">

							<div>
								<button type="button" class="close" data-dismiss="modal" style={{marginRight:10, marginTop:10}} onClick={this.closeAward}>&times;</button>
							</div>
							<div class="small" style={{paddingRight:40, paddingLeft:40, lineHeight:"30px"}}>
								<span style={{fontWeight:'bold', fontSize:16}}>Tên phúc lợi:</span> <br></br>
								<span>{item_award.itemName}</span><br></br>
								<span style={{fontWeight:'bold', fontSize:16, marginTop:10}}>Nội dung:</span> <br></br>
								<span>{item_award.show_value ? item_award.show_value.toLocaleString() : 0}</span><br></br>
								{(item_award.consumable)?(<span style={{color:'red'}}>(Đã cộng vào tài khoản)</span>):(<div></div>)}
							</div>

							<div style={{textAlign:'right', padding:'5px 30px 10px 0px'}}>
								<button type="button" class="btn btn-hover text-white" style={{padding:'7px 30px'}} data-dismiss="modal" onClick={this.closeAward}><span class="small">Đóng</span></button>
							</div>

							</div>
						</div>
					</div>


					<div class={show_award_error ? "modal fade show d-block" : "modal fade"} id="award_error" style={{marginTop:rangeTop}}>
						<div class="modal-dialog">
							<div class="modal-content">

							<div>
								<button type="button" class="close" data-dismiss="modal" style={{marginRight:10, marginTop:10}} onClick={this.closeError}>&times;</button>
							</div>
							
							<p style={{textAlign:'center', marginTop:10, lineHeight:"20px"}}>{message_error}</p>

							<div style={{textAlign:'right', padding:'5px 30px 10px 0px'}}>
								<button type="button" class="btn btn-hover text-white" style={{padding:'7px 30px'}} onClick={this.closeError}><span class="small">Đóng</span></button>
							</div>

							</div>
						</div>
					</div>


					<div class="modal p-0" id="bxhmodal" style={{marginTop:rangeTop}}>
						<div class="modal-dialog">
							<div class="modal-content">
							<div class="modal-body py-2 px-1">
								<ul class="nav nav-tabs nav-justified">
								<li class="nav-item" onClick={this.changeTabBXH}>
									<a class={active_bxh ? "nav-link active text-danger font-weight-bold" : "nav-link text-danger font-weight-bold"}  data-toggle="tab" href="#bxh" onClick={()=>this.showBXH(week)}>BXH</a>
								</li>
								<li class="nav-item" onClick={this.changeTabTheLe}>
									<a class={active_thele ? "nav-link active text-danger font-weight-bold" : "nav-link text-danger font-weight-bold"} data-toggle="tab" href="#thele">Thể lệ</a>
								</li>
								<li class="nav-item" onClick={this.changeTabPhucLoi}>
									<a class={active_phucloi ? "nav-link active text-danger font-weight-bold" : "nav-link text-danger font-weight-bold"} data-toggle="tab" href="#phucloi" onClick={this.showRanking}>Phúc lợi</a>
								</li>
								<li class="">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
								</li>
								</ul>
								
								<div class="tab-content">
								<div class="tab-pane active" id="bxh">
									<ul class="nav nav-pills nav-justified mt-3" style={{lineHeight:'15px'}}>
									<li class="nav-item">
										<a class="nav-link text-secondary active small" data-toggle="pill" href="#tuantruongnua" onClick={()=>this.showBXH('WEEK_BEFORE_LAST')}>Tuần trước nữa</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-secondary small" data-toggle="pill" href="#tuantruoc" onClick={()=>this.showBXH('')}>Tuần trước</a>
									</li>
									<li class="nav-item">
										<a class="nav-link text-secondary small" data-toggle="pill" href="#tuannay" onClick={()=>this.showBXH('THIS_WEEK')}>Tuần này</a>
									</li>
									</ul>
									
									<div class="tab-content">
									<div class="tab-pane active" id="tuantruongnua">
										<table class="table table-striped text-center mt-3 small" style={{lineHeight:'15px'}}>
											<thead>
											<tr>
												<th>Top</th>
												<th>Tên NV</th>
												<th>Rank</th>
											</tr>
											</thead>
											<tbody>
												{users.map((obj, key) => (
													<tr key={key}>
														<td>{obj.position}</td>
														<td>{obj.userName}</td>
														<td>{obj.rankName} {(obj.rankIconUrl!==null)?(<img src={obj.rankIconUrl} width="30" height="30" />):(<div></div>)}</td>
													</tr>
												))}
											</tbody>
										</table>
										<h6 class="text-left"><span class="badge badge-pill badge-info">#</span> Thứ hạng của bạn</h6>
										<table class="table table-striped text-center mt-3 small" style={{lineHeight:'15px'}}>
											<tbody>
											{(data_bxh.myPosition > 0 && data_bxh.myPosition < 100) ? (<tr>
												<td>{data_bxh.myPosition}</td>
												<td>{data_bxh.myGameName}</td>
												<td>{data_bxh.myRankName} {(data_bxh.myRankIconUrl!==null)?(<img src={data_bxh.myRankIconUrl} width="30" height="30" />):(<div></div>)}</td>
											</tr>):(<tr>
												<td colspan="2">Chỉ thống kê đến Top 100. <a href="https://scoin.vn/nap-game" target="_blank">Nạp thêm</a> hoặc <a data-toggle="tab" href="#thele" onClick={this.changeTabTheLe}>Xem thể lệ</a></td>
											</tr>)}
											</tbody>
										</table>
										
									</div>
									<div class="tab-pane fade" id="tuantruoc">
										<table class="table table-striped text-center mt-3 small" style={{lineHeight:'15px'}}>
											<thead>
											<tr>
												<th>Top</th>
												<th>Tên NV</th>
												<th>Rank</th>
											</tr>
											</thead>
											<tbody>
												{users.map((obj, key) => (
													<tr key={key}>
														<td>{obj.position}</td>
														<td>{obj.userName}</td>
														<td>{obj.rankName} {(obj.rankIconUrl!==null)?(<img src={obj.rankIconUrl} width="30" height="30" />):(<div></div>)}</td>
													</tr>
												))}
											</tbody>
										</table>
										<h6 class="text-left"><span class="badge badge-pill badge-info">#</span> Thứ hạng của bạn</h6>
										<table class="table table-striped text-center mt-3 small">
											<tbody>
											{(data_bxh.myPosition > 0 && data_bxh.myPosition < 100) ? (<tr>
												<td>{data_bxh.myPosition}</td>
												<td>{data_bxh.myGameName}</td>
												<td>{data_bxh.myRankName} {(data_bxh.myRankIconUrl!==null)?(<img src={data_bxh.myRankIconUrl} width="30" height="30" />):(<div></div>)}</td>
											</tr>):(<tr>
												<td colspan="2">Chỉ thống kê đến Top 100. <a href="https://scoin.vn/nap-game" target="_blank">Nạp thêm</a> hoặc <a data-toggle="tab" href="#thele" onClick={this.changeTabTheLe}>Xem thể lệ</a></td>
											</tr>)}
											</tbody>
										</table>
									</div>
									<div class="tab-pane fade" id="tuannay">
										<table class="table table-striped text-center mt-3 small" style={{lineHeight:'15px'}}>
											<thead>
											<tr>
												<th>Top</th>
												<th>Tên NV</th>
												<th>Rank</th>
											</tr>
											</thead>
											<tbody>
												{users.map((obj, key) => (
													<tr key={key}>
														<td>{obj.position}</td>
														<td>{obj.userName}</td>
														<td>{obj.rankName} {(obj.rankIconUrl!==null)?(<img src={obj.rankIconUrl} width="30" height="30" />):(<div></div>)}</td>
													</tr>
												))}
											</tbody>
										</table>
										<h6 class="text-left"><span class="badge badge-pill badge-info">#</span> Thứ hạng của bạn</h6>
										<table class="table table-striped text-center mt-3 small">
											<tbody>
											{(data_bxh.myPosition > 0 && data_bxh.myPosition < 100) ? (<tr>
												<td>{data_bxh.myPosition}</td>
												<td>{data_bxh.myGameName}</td>
												<td>{data_bxh.myRankName} {(data_bxh.myRankIconUrl!==null)?(<img src={data_bxh.myRankIconUrl} width="30" height="30" />):(<div></div>)}</td>
											</tr>):(<tr>
												<td colspan="2">Chỉ thống kê đến Top 100. <a href="https://scoin.vn/nap-game" target="_blank">Nạp thêm</a> hoặc <a data-toggle="tab" href="#thele" onClick={this.changeTabTheLe}>Xem thể lệ</a></td>
											</tr>)}
											</tbody>
										</table>
									</div>
									</div>          
								</div>
								<div class="tab-pane fade small" id="thele">
									<div style={{ lineHeight:'20px', padding: "30px 10px 10px 10px" }}
										dangerouslySetInnerHTML={{ __html: data_bxh.gameRule }}>
									</div>
								</div>
								<div class="tab-pane fade" id="phucloi">
									<h6 class="text-center mt-3">Rank tuần trước</h6>
									<ul class="nav nav-pills nav-justified">
										{data_ranking.map((obj, key) => {
											return (<li class="nav-item" key={key} style={{cursor:'pointer'}}>
												<a class={rankPosition===obj.rankPosition ? "nav-link active" : "nav-link"} data-toggle="pill" onClick={()=>this.changeRanking(obj)} ><img class="img-shadow" src={obj.rankIconUrl} width="72"/></a>
											</li>)}
										)}
									</ul>
									<div class="tab-content">
										{data_ranking.map((obj, key) => (
											<div class={rankPosition===obj.rankPosition ? "tab-pane active" : "tab-pane"}>
												{(obj.rankPosition===myPosition)?(<div>
												<h6 class="text-center mt-3">Quà nhận được <br /><span class="text-danger small">Hết hạn sau: {day} ngày {hour}h {minute}p {second}s</span></h6>
													<div class="row pt-3">
														{items.map((item, k)=>{
															return (<div class="col-3 pr-1 pl-3 text-center">
															<a class="text-secondary" style={{cursor:'pointer'}} onClick={()=>this.awards(item)}>
																<img class="zoom" src={item.itemIconUrl} width="60" height="60" alt={item.itemName} />
																<h4 class="small pt-2" style={{color:'black'}}>{item.itemName}</h4>
															</a>
														</div>)
														})}
													
													</div>
												</div>):(<div>
													<h6 class="text-center mt-3 text-danger small">Xếp hạng của bạn trong chu kỳ trước không thuộc Rank này</h6>
													
													<div class="row pt-3">
														{items.map((item, k)=>{
															return (<div class="col-3 pr-1 pl-3 text-center">
																<a class="text-secondary" title="">
																	<img src={item.itemIconUrl} width="60" height="60" alt={item.itemName} style={{filter: 'grayscale(100%)'}} />
																		<h4 class="small pt-2">{item.itemName}</h4>
																</a>
															</div>)
														})}
													</div>
												</div>)}
											</div>
										))}
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
