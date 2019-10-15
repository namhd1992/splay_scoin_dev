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
import moment from 'moment'

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

	isEmpty=(obj)=> {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return false;
		}
		return true;
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
		if (!this.isEmpty(gameData)) {
			if (gameData.screenShot !== null && gameData.screenShot !== "") {
				arrScreenShot = gameData.screenShot.split(",");
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
		return (<div>	
					<div class="container py-3" style={{marginTop:55}}>
						<div class="row">
							<div class="col-sm-9 px-2">
								
								<div class="bg-white mb-3 content">
									<div class="detail-bannergame position-relative overflow-hidden">
										<img src="images/banner-game/thien-dia-chi-ton.png" class="overflow-hidden" width="100%" />
										<div class="row mx-0 position-absolute w-100 sum-game pt-5">
											<div class="col-md-10 pb-2">
												<div class="media px-1">
												<img src="images/thumb/thien-dia.png" alt="Thiên địa chí tôn" class="mr-3" style={{width:60}} />
												<div class="media-body mt-2">
													<h4 class="font13 font-weight-bold">Thiên địa chí tôn <span class="btn-tag-event font-weight-normal">Nhập vai</span></h4>
													<p class="font13 text-secondary">Hơn 10 triệu lượt tải</p>
												</div>
												</div>
											</div>
											<div id="btnPlay" class="col-md-2">
												<button type="button" class="btn btn-sm btn-block border-0 shadow-sm mx-1 border btn-hover text-uppercase text-white py-1"><span class="small">Chơi ngay</span></button><br />
												<button type="button" class="btn btn-sm btn-block btn-link mx-1 py-1">Fanpage</button> 
											</div>
										</div>
								
									</div>
								</div>
								<div class="bg-white p-3 mb-3 font13">
									<h2 class="font13 color-title-cat font-weight-bold pb-2">Chi tiết</h2>
									<div id="demo" class="carousel slide pb-3" data-ride="carousel" data-touch="true" data-wrap="true">
									{/* <!-- Indicators --> */}
									<ul class="carousel-indicators">
										<li data-target="#demo" data-slide-to="0" class="active"></li>
										<li data-target="#demo" data-slide-to="1"></li>
										<li data-target="#demo" data-slide-to="2"></li>
									</ul>    
									{/* <!-- Wrapper for slides --> */}
									<div class="carousel-inner">
										<div class="carousel-item active">
											<div class="row">
											<div class="col-6"><a href="#" title="Alice 3D"><img src="images/banner-game/thai-co-than-vuong.jpg" width="100%"  alt="Alice 3D" /></a></div>
											<div class="col-6"><a href="#" title="AU Love"><img src="images/banner-game/thien-dia-chi-ton.png" width="100%"  alt="AU Love" /></a></div>
											</div>
										</div>
										<div class="carousel-item">
											<div class="row">
											<div class="col-6"><a href="#" title="Alice 3D"><img src="images/banner-game/thai-co-than-vuong.jpg" width="100%"  alt="Alice 3D" /></a></div>
											<div class="col-6"><a href="#" title="AU Love"><img src="images/banner-game/thien-dia-chi-ton.png" width="100%"  alt="AU Love" /></a></div>
											</div>
										</div>
										<div class="carousel-item">
											<div class="row">
											<div class="col-6"><a href="#" title="Alice 3D"><img src="images/banner-game/thai-co-than-vuong.jpg" width="100%"  alt="Alice 3D" /></a></div>
											<div class="col-6"><a href="#" title="AU Love"><img src="images/banner-game/thien-dia-chi-ton.png" width="100%"  alt="AU Love" /></a></div>
											</div>
										</div>
									</div> 
									{/* <!-- Left and right controls --> */}
									<a class="carousel-control-prev" href="#demo" data-slide="prev">
										<span class="carousel-control-prev-icon"></span>
									</a>
									<a class="carousel-control-next" href="#demo" data-slide="next">
										<span class="carousel-control-next-icon"></span>
									</a>
									</div>
									<p>
										Chào mừng bạn gia nhập thế giới game đa màu sắc, đầy đủ tính năng nhất từ trước đến nay của cả 3 thể loại game kiếp hiệp, võ lâm và tiên hiệp. Game Mobile 2019 duy nhất “PK không do lực chiến” mà dựa vào kỹ năng và sự tính toán của người chơi.  </p>

					<p>1. Làm giàu không khó - Giao dịch tự do không lo thu phế: 
					Lần đầu tiên trong lịch sử Game Nhap Vai, giao dịch tự do được Nhà Phát Hành khuyến khích, tất cả đều vì lợi ích và mong muốn của game thủ.
					Săn đồ ảo – Kiếm tiền thật, những món đồ bạn mất công cày cuốc có thể giao dịch tự do trong game không lo mất phí. </p>

					<p>2. Săn Boss liên server - Anh em đoàn kết cân hết các server:
					Game có nhiều chế độ Boss: Boss Cá Nhân, Boss Thế Giới, Phó Bản Boss, Boss Bang Hội . . . với khoảng 70 con Boss khác nhau. Đặc biệt nhất là hệ thống săn Boss liên server đặc sắc chưa từng thấy trước đó với tính năng PK liên server chiến trường khốc liệt giữa các cụm server với nhau để giành quyền săn Boss.
									</p>
								</div>
								<div class="bg-white p-3 mb-3 font13">
									<h2 class="font13 color-title-cat font-weight-bold pb-2">Video</h2>
									<div class="row">
										<div class="col-6 col-md-4 px-3">
											<div class="thumb-lat-the position-relative">
												<iframe width="100%" src="https://www.youtube.com/embed/j-Y18C9NU6A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
											</div>
											<h3 class="font13 py-2"><a href="#" title="Thái cổ thần vương" class="text-dark">Thái cổ thần vương</a></h3>
										</div>
									</div>
								</div>
								<div class="mb-3 bg-white p-3">
									<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game có thể bạn quan tâm</span></h2>
									<div class="row">
										<div class="col-6 col-md-4 px-3">
											<div class="thumb-lat-the position-relative">
												<a href="#" title="Chơi ngay" class="text-dark">
													<img src="images/banner-game/thai-co-than-vuong.jpg" width="100%" />
													<div class="overlay">
														<div class="text text-white small">Chơi ngay &raquo;</div>
													</div>
												</a>
											</div>
											<h3 class="font13 py-2"><a href="#" title="Thái cổ thần vương" class="text-dark">Thái cổ thần vương</a></h3>
										</div>
									</div>
									
								</div>
							</div>
							<div class="col-sm-3 px-2">
								<div class="bg-white p-3">
									<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game thủ may mắn</span></h2>
									<div class="list-newest">
										<ul>
											<li class="py-2"><img src="images/icon-scoin.png" width="32" /><span class="text-muted px-2">Long Phi - </span>Thẻ 50k <span class="new">New</span></li>
											<li class="py-2"><img src="images/icon-scoin.png" width="32" /><span class="text-muted px-2">Huyền My - </span>Thẻ 10k <span class="new">New</span></li>
											<li class="py-2"><img src="images/icon-scoin.png" width="32" /><span class="text-muted px-2">fb_356safh... - </span>Thẻ 20k <span class="new">New</span></li>
											<li class="py-2"><img src="images/icon-scoin.png" width="32" /><span class="text-muted px-2">Spider man - </span>Thẻ 30k </li>
											<li class="py-2"><img src="images/icon-scoin.png" width="32" /><span class="text-muted px-2">Ngọc Trinh - </span>Thẻ 10k </li>
											<li class="py-2"><img src="images/icon-scoin.png" width="32" /><span class="text-muted px-2">Chim sẻ đi nắng - </span>Thẻ 5k </li>
										</ul>
									</div>                
								</div>
								<div class="bg-white p-3 mt-3">
									<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game Hot </span></h2>
									<div class="media border-bottom py-2 my-1">
									<img src="images/thumb/kiem-the-truyen-ky.png" alt="Kiếm thế" class="mr-3" style={{width:60}} />
									<div class="media-body">
										<h4 class="font13 font-weight-bold">Kiếm thế <img src="images/hot.gif" width="48"/></h4>
										<p class="small">Hơn 1tr lượt tải</p>
									</div>
									</div>
									<div class="media border-bottom py-2 my-1">
									<img src="images/thumb/kiem-the-truyen-ky.png" alt="Kiếm thế" class="mr-3" style={{width:60}} />
									<div class="media-body">
										<h4 class="font13 font-weight-bold">Kiếm thế <img src="images/hot.gif" width="48"/></h4>
										<p class="small">Hơn 1tr lượt tải</p>
									</div>
									</div>
									<div class="media border-bottom py-2 my-1">
									<img src="images/thumb/kiem-the-truyen-ky.png" alt="Kiếm thế" class="mr-3" style={{width:60}} />
									<div class="media-body">
										<h4 class="font13 font-weight-bold">Kiếm thế <img src="images/hot.gif" width="48"/></h4>
										<p class="small">Hơn 1tr lượt tải</p>
									</div>
									</div>
									
								</div>
								<div class="bg-white p-3 mt-3">
									<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Tin tức </span></h2>
									<ul class="list-unstyled">
										<li class="border-bottom py-2"><a href="#" title="" class="text-dark text-decoration-none small"><span class=" btn-tag-news">Tin tức</span> [HOT]Cuồng Ma ra chuỗi sự kiện chào mừng Server 1000 <span class="text-muted">- 30/05/2019</span></a></li>
										<li class="border-bottom py-2"><a href="#" title="" class="text-dark text-decoration-none small"><span class="btn-tag-event">Sự kiện</span> [HOT]Cuồng Ma ra chuỗi sự kiện chào mừng Server 1000 <span class="text-muted">- 30/05/2019</span></a></li>
									</ul>
									
									
								</div>
								
							</div>
						</div>   
					</div>
					<div class="container-fluid">
						<p class="text-center font13">Hệ thống phát hành game VTC Mobile <br /> Copyright ©2019 VTC Mobile. All rights reserved <br /> <a href="tel:19001104" class="text-dark">1900 1104</a>
						</p>
					</div>

		</div>)
	}
}

GameDetailComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles)(withTheme()(GameDetailComponent))))
