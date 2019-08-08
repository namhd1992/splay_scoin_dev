import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import RightArea from '../../components/RightArea'
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
import HeadMenu from '../../components/HeadMenu'
import moment from 'moment'

import LoginRequired from '../../components/LoginRequired'
import YouTube from 'react-youtube'
import { withStyles } from 'material-ui/styles'
import '../../styles/gameDetail.css'
import '../../styles/carousel.css'
import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#ecf4fe"
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
			marginTop:'',
		}
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
		if(this.props.data !== nextProps.data){
			const _this=this;
			var arrScreenShot = [];
			if (nextProps.data !== undefined && nextProps.data.length === 1) {
				if (nextProps.data[0].screenShot !== null && nextProps.data[0].screenShot !== "") {
					arrScreenShot = nextProps.data[0].screenShot.split(",");
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

	render() {
		const {data, dataGiftcode, youtubeData, dialogLoginOpen, dialogRatingOpen, videoId, pointSubmit, showMore, message,
			 snackVariant, openSnack,lightBoxOpen, lightBoxIndex, youtubeOpen, gameArticles, gameData,server}=this.props;

		const { classes } = this.props;

		const { theme } = this.props;
		const { primary, secondary } = theme.palette;
		const { fullScreen } = this.props;
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		var deviceType = Ultilities.getMobileOperatingSystem(userAgent);
		var arrScreenShot = [];
		if (data !== undefined && data.length === 1) {
			if (data[0].screenShot !== null && data[0].screenShot !== "") {
				arrScreenShot = data[0].screenShot.split(",");
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
		return (gameData.tagsList !==undefined) ? (
			<div style={{ marginTop: "8px", borderRadius: "5px", overflow: "hidden", margin: "auto" }}>
				<Grid container style={{
					margin: "0px",
					width: "100%",
				}}>
					<Grid item xs={12} md={12}>
						<Grid container style={{
							margin: "0px",
							width: "100%",
							backgroundImage: "url(" + gameData.bigImage + ")",
							backgroundSize: "100% auto",
							backgroundPosition: "center top",
							backgroundRepeat: "no-repeat"
						}}
							justify="center">
							<Grid item xs={12} style={{ paddingTop: "20%" }}>
							</Grid>
							<Grid item xs={12}
								style={{ background: "linear-gradient(180deg,transparent,rgba(231, 241, 253,0) 5%,rgba(231, 241, 253,.8) 20%,#fff 50%,#fff)" }}>
								<ListItem style={{ padding: "5px", maxWidth: "1100px", margin: "auto" }}>
									<img alt="game icon" style={{ width: "72px" }} src={gameData.defaultImage} />
									<Hidden xsDown>
										<ListItemText style={{ textAlign: "left", padding: "10px" }} secondary={(
											<span style={{color:'#6b6b6b'}}> {gameData.downloadTurns + " Lượt tải"}<br /><span
												onClick={this.openRatingDialog}><Rating point={gameData.pointReview}></Rating></span>
												<span style={{
															marginLeft:"20px",
															fontSize:"11px",
															border: "1px solid #6b6b6b",
															padding:"1px 2px",
															borderRadius: "5px"}}>
															<label style={{color:"#6b6b6b"}}>{this.getTheLoai(gameData)}</label>
													</span></span>)}
											primary={(<span style={{ color: '#6b6b6b' }}><b>{gameData.name}</b></span>)} />
									</Hidden>
									<Hidden smUp>
										<ListItemText style={{ textAlign: "right", padding: "0px" }} secondary={(
											<span> {gameData.downloadTurns + " Lượt tải"}<br />
												<span onClick={this.openRatingDialog}>
													<Rating
															point={gameData.pointReview}>
													</Rating>
													<span style={{
															float:"right",
															fontSize:"11px",
															border: "1px solid #23c9b6",
															padding:"1px 2px",
															borderRadius: "20px"}}>
															<label style={{color:"#23c9b6"}}>{this.getTheLoai(gameData)}</label>
													</span>
												</span>
											</span>)} primary={(
															<span style={{ color: primary.main }}><b>{gameData.name}</b></span>)} 
										/>
									</Hidden>
									<Hidden xsDown>
										<div style={{ textAlign: "center", display: "grid", paddingTop:15 }}>
											<a className="game-button-wrap" target="_blank"
												href={(deviceType === "ios") ? gameData.urlDownloadIos : gameData.urlDownloadAndroid}>
												<Button
													variant="raised"
													style={{
														borderRadius: "5px",
														background: "#33cbcc",
														color: "#fff",
														padding: "7px 10px",
														fontSize: "0.8em",
														whiteSpace: "nowrap",
														minHeight: "auto",
														clear: "both"
													}}
												>Chơi</Button></a>
											<a className="game-button-wrap" href={gameData.fanpageFB} style={{ clear: "both", marginTop:5 }}>
												<Button style={{ color: "#fe8731", borderRadius:"5px" }}>Fanpage</Button>
											</a>
										</div>
									</Hidden>
								</ListItem>
							</Grid>
							<Grid item xs={12} style={{ backgroundColor: "#fff"}}>
								<Hidden smUp>
									<div style={{ textAlign: "center", display: "grid" }}>
										<a className="game-button-wrap" target="_blank"
											href={(deviceType === "ios") ? gameData.urlDownloadIos : gameData.urlDownloadAndroid}><Button
												variant="raised" style={{
													borderRadius: "5px",
													background: "#33cbcc",
													color: "#fff",
													padding: "10px",
													fontSize: "0.8em",
													whiteSpace: "nowrap",
													minHeight: "auto",
													width: "100%",
													margin: "auto"
												}}>Chơi</Button></a>
										<a className="game-button-wrap" href={gameData.fanpageFB}>
											<Button style={{ color: "#fe8731", borderRadius:"5px" }}>Fanpage</Button>
										</a>
									</div>
								</Hidden>
							</Grid>
						</Grid>
						
						<Grid container style={{
							width: "100%",
							backgroundColor: "#fff",
							borderRadius: "5px",
							margin: "8px 0px 0px 0px",
							color: "#6b6b6b"
						}}>
							<Grid item xs={12} style={{margin:"15px 10px"}}>
								<span style={{ fontSize: "1.2em", fontWeight:'bold'}}>Chi tiết</span>
							</Grid>
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
							<Grid item xs={12}>
								{(showMore) ? (
									<div style={{ padding: "10px" }}
										dangerouslySetInnerHTML={{ __html: gameData.description }}>
									</div>
								) : (<div style={{ position: "relative", padding: "10px" }}>
									<HTMLEllipsis
										unsafeHTML={gameData.description}
										maxLine='5'
										ellipsis='...'
										basedOn='letters'
									/>
									<a style={{
										color: secondary.main,
										textAlign: "center",
										width: "100%",
										display: "block",
										position: "absolute",
										paddingTop: "60px",
										marginTop: "-80px",
										background: "linear-gradient(to top, rgba(35, 43, 54,1) 0%,rgba(35, 43, 54,0.5) 50%,rgba(35, 43, 54,0) 100%)"
									}} onClick={() => this.readMore()}>Xem thêm</a>
								</div>
									)}
							</Grid>
						</Grid>
						{(youtubeData !== undefined && youtubeData.length > 0) ? (
							<Grid container style={{
								width: "100%",
								backgroundColor: "#fff",
								borderRadius: "5px",
								margin: "8px 0px 0px 0px",
								overflow: "hidden",
								padding: "8px",
								color:'#6b6b6b'
							}}>
								<Grid item xs={12}>
									<Grid container className="game-giftcode-root">
										<Grid item xs={12}>
											<span style={{ fontSize: "1.2em"}}>Videos</span>
										</Grid>
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
																		<Grid item xs={12} style={{ padding: "0px", fontSize: "0.8em" }}>
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
						<Grid container style={{ padding: "8px", width: "100%", backgroundColor: "#fff", margin: "8px 0px 0px 0px", borderRadius: "5px", color: "#6b6b6b" }}>
							<Grid item xs={12}>
								<span style={{ fontSize: "1.2em" }}>Phân loại</span>
							</Grid>
							<Grid item xs={12} style={{marginTop:15}}>
								{gameData.tagsList.map((obj, key) => {
									return (
											<div key={key} style={{
												border: "solid 1px #6b6b6b",
												display: "inline-block",
												padding: "2px 3px",
												marginRight: "5px",
												borderRadius: "5px",
												fontSize: "0.8em",
												color: "#6b6b6b"
											}}>{obj.name}</div>
									)
								})}
							</Grid>
						</Grid>
						{/* <Grid container style={{
							width: "100%",
							backgroundColor: "#232b36",
							borderRadius: "5px",
							margin: "8px 0px 0px 0px",
							overflow: "hidden"
						}}>
							{(dataGiftcode.length > 0) ? (
								<Grid item xs={12}>
									<Grid container className="game-giftcode-root">
										<Grid item xs={12}>
											<span style={{ fontSize: "1.2em", color: "#fff", padding: "8px" }}>Giftcode</span>
										</Grid>
										{dataGiftcode.map((obj, key) => (
											<Grid key={key} item xs={12}>
												<Link to={"/giftcodedetail/" + obj.giftcodeEvent.id} style={{ textDecoration: "none" }}>
													<ListItem key={key} style={{ padding: "8px", borderBottom: "solid 1px #333" }}>
														<ListItemText
															disableTypography={true}
															primary={(<h4 style={{ color: secondary.main, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "400" }}
																className="giftcode-item-name">{obj.title}</h4>)}
															secondary={(<span
																style={{ color: "#fff" }}>{"Còn lại " + (obj.giftcodeEvent.numberGiftcode - obj.giftcodeEvent.numberGiftcodeLost)}</span>)} />
														<div>
															<Button style={{
																borderRadius: "20px",
																background: "linear-gradient(90deg,#ff5f27,#ff9019)",
																color: "#fff",
																padding: "10px",
																fontSize: "0.8em",
																whiteSpace: "nowrap",
																minWidth: "auto",
																minHeight: "auto",
															}}>
																Nhận
                          </Button>
														</div>
													</ListItem>
												</Link>
											</Grid>
										))}
									</Grid>
								</Grid>) : (<div></div>)}
						</Grid> */}
						<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
						<LoginRequired open={dialogLoginOpen}></LoginRequired>
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
									<Button onClick={this.dialogYoutubeClose} style={{ color: "#6b6b6b", borderRadius: "5px" }}>
										Đóng
              </Button>
								</div>
							</DialogActions>
						</Dialog>
						<Dialog
							open={dialogRatingOpen}
							onClose={this.dialogRatingClose}
							aria-labelledby="responsive-dialog-title"
							classes={{ paper: classes.paper }}
						>
							<DialogTitle id="responsive-dialog-title" ><span style={{ color: "#6b6b6b" }}>Đánh giá</span></DialogTitle>
							<DialogContent>
								<span onClick={() => this.changePointSubmit(1)}>{(pointSubmit < 1) ? (
									<StarBorder style={{ color: "#6b6b6b" }}></StarBorder>) : (<Star style={{ color: "#6b6b6b" }}></Star>)}</span>
								<span onClick={() => this.changePointSubmit(2)}>{(pointSubmit < 2) ? (
									<StarBorder style={{ color: "#6b6b6b" }}></StarBorder>) : (<Star style={{ color: "#6b6b6b" }}></Star>)}</span>
								<span onClick={() => this.changePointSubmit(3)}>{(pointSubmit < 3) ? (
									<StarBorder style={{ color: "#6b6b6b" }}></StarBorder>) : (<Star style={{ color: "#6b6b6b" }}></Star>)}</span>
								<span onClick={() => this.changePointSubmit(4)}>{(pointSubmit < 4) ? (
									<StarBorder style={{ color: "#6b6b6b" }}></StarBorder>) : (<Star style={{ color: "#6b6b6b" }}></Star>)}</span>
								<span onClick={() => this.changePointSubmit(5)}>{(pointSubmit < 5) ? (
									<StarBorder style={{ color: "#6b6b6b" }}></StarBorder>) : (<Star style={{ color: "#6b6b6b" }}></Star>)}</span>
							</DialogContent>
							<DialogActions>
								<div>
									<Button onClick={this.dialogRatingClose} style={{ color: "#6b6b6b", borderRadius: "5px" }}>
										Hủy bỏ
              </Button>
									<Button onClick={this.ratingAction}
										style={{
											borderRadius: "5px",
											background: "#33cbcc",
											color: "#fff",
											padding: "7px 10px",
											fontSize: "0.8em",
											whiteSpace: "nowrap",
											minWidth: "auto",
											minHeight: "auto"
										}}
									>
										Xác nhận
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
					</Grid>
				</Grid>
			</div>
		) : (<div className="global-loading" style={{ backgroundColor: "transparent", marginTop: "8px" }}>
		{(server !== true) ? (												
			<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
			src="../baotri.png" />)}
		</div>)
	}
}

GameDetailComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles)(withTheme()(GameDetailComponent))))
