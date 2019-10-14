import React from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ReactCardFlip from 'react-card-flip';
import ReactResizeDetector from 'react-resize-detector';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Notification from '../../components/Notification';
import { Link } from 'react-router-dom'
// import '../../styles/imageServerError.css';
// import '../../styles/luckyDetail.css';
import '../../styles/style.css';
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff"
	},
	buttonOrange:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#ff5f27,#ff9019)",
		color: "#fff",
		padding: "10px", height:"35px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	},
	buttonGreen:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#22cab5,#3fe28f)",
		color: "#fff",
		padding: "10px", height:"40px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	}
};



class LuckyDetailComponent extends React.Component {

	constructor(){
		super();
		this.state = {
			intValue:0,
			whenSelect:"",
			btnPlay: false,
			div1:'back',
			div2:'front',
			guide1:'- Nhấn "CHƠI" để bắt đầu.',
			guide2:'- Sau đó các thẻ phần thưởng sẽ được úp xuống.'
		};
	}
	showItem=()=>{
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckyitembonus`,
		);
	}
	
	showBuyTurn=()=>{
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckybuyturn`,
		);
	}

	showHistory=()=>{
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckyhistory`,
		);
	}
	
	handleCloseDialogItem=()=>{
		this.props.handleCloseDialogItem();
	}
	
	handleCloseDialogLogin=()=>{
		this.props.handleCloseDialogLogin();
	}
	
	handleCloseMoreTurnDialog=()=>{
		this.props.handleCloseMoreTurnDialog();
	}
	
	handleCloseDialog=()=>{
		this.props.handleCloseDialog();
	}
	
	
	pick=(key)=>{
		var _this = this;
		setTimeout(function () {
			_this.showBtnPlay();
		}, 1500);
		this.props.pick(key);
	}
	showBtnPlay=()=>{
		this.setState({btnPlay: false, guide1:'- Phần thưởng sẽ được cộng vào tài khoản hoặc lưu trong Hộp thư.', guide2:'- Nhấn "CHƠI" để bắt đầu tiếp.'})
	}
	
	start=()=>{
		if(this.props.dataDetail.data.userTurnSpin.turnsBuy + this.props.dataDetail.data.userTurnSpin.turnsFree >0){
			this.setState({btnPlay: true,div1:'front', div2:'back', guide1:'- Mời bạn lật thẻ để nhận phần thưởng.', guide2:''})
		}
		this.props.start();
	}
	
	expand=()=>{
		this.props.expand();
	}

	flipCard=(key)=>{
		this.props.flipCard(key);
	}
	
	swap=(id1, id2)=>{
		this.props.swap(id1, id2);
	}
	
	unHighLight=()=>{
		this.props.unHighLight();
	}
	
	highLight=(card_id)=>{
		this.props.highLight(card_id);
	}
	
	random=()=>{
		this.props.random();
	}
	openCard=(id)=>{
		this.props.openCard(id);
	}
	onResize=()=>{
		this.props.onResize();
	}
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	selectPackage(value){
		this.setState({intValue:value, whenSelect:"1px solid #00ccd4"});
	}

	convettoLocaleString(value){
		return value.toLocaleString();
	}
	getStringBonus=(obj)=> {
		var output = document.getElementById("bonus");
		var bonus="";
		if(obj!=undefined){
			for (let i = 0; i < obj.length; i++) {
				bonus+='<span style="color:black"><span style="color:#00bf98">'+ obj[i].userName+'</span>'+' nhận thưởng '+ '<span style="color:#ff9d42">'+ obj[i].itemName+'</span>'+'</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
			}
		}
	
		if(output!==null){
			output.insertAdjacentHTML('beforeend',bonus)
		}
	}

	render() {
		const {dataDetail, dataProfile,message,cardWidth,cardHeight,flippedArr,collapse,cardArr,
			highLightCard,openSnack,snackVariant,dialogLoginOpen,dialogItemOpen,fontSize,dialogMoreTurnOpen,server,waiting, numberWidth,
			numberHeight}=this.props;	
			// console.log('AAAAAAA', cardArr)	
		const { classes } = this.props;
		const { theme } = this.props;
		const { secondary } = theme.palette;
		var splayPoint=dataProfile.splayPoint;
		if(splayPoint !== undefined){
			splayPoint=this.convettoLocaleString(splayPoint);
		}
		if(dataDetail!==undefined){
			this.getStringBonus(dataDetail.data.luckySpinHistory)
		}
		return (<div>
			<div class="container py-3" style={{marginTop:55}}>
				<div class="row">
					<div class="col-sm-9 px-2">
						<div class="bg-white p-3 mb-3">
							<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Lật thẻ</span></h2>
							<div class="row">
								<div class="col-12 my-2 px-3">                    	
									<div class="thumb-lat-the position-relative">
										<div class="alert alert-info fade show marquee small bg-transparent py-2 bg-badge-opacity-2">
												<p class="marquee_inner p-0 m-0"><img src="images/hot.gif" width="48"/>Chúc mừng <strong>Huyen My</strong> đã nhận được 5k Scoin <img src="images/hot.gif" width="48"/></p>
										</div>
										{(cardArr.length>0)?(<div style={{ margin: "auto", width: (cardWidth * numberWidth) + "px", height: (cardHeight * numberHeight) + "px", position: "relative" }}>
											
											{/* {cardArr.map((obj, key) => {
												var top = "0px";
												var left = "0px";
												if (!collapse) {
													left = (key % numberWidth) * cardWidth + "px";
													top = (Math.floor(key / numberWidth)) * cardHeight + "px"
												}
												return (<div key={key} className="lucky-card lucky-card-collapse"
													style={{
														transition: "0.5s",
														WebkitTransition: "0.5s",
														padding:"5px",
														width: cardWidth,
														height: cardHeight + "px",
														left: left,
														top: top
													}}>
													<ReactCardFlip style={{ height: '100%' }} isFlipped={flippedArr.find(x => x.id === obj.id).status}>
														<div key={this.state.div1} style={{
															opacity: (highLightCard === null || highLightCard === obj.id) ? "1" : "0.5",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															backgroundPosition: "center",
															backgroundImage: "url(../cardfront1.png)",
															width: "100%",
															height: cardHeight + "px",
															textAlign: "center"
														}}>
															<div style={{ paddingTop: cardHeight * 0.3 + "px" }}><img alt="just alt" style={{ width: (cardWidth * 0.5) + "px" }}
																src={obj.item.urlImage} /></div>
															<div style={{ fontSize: fontSize }}>{obj.item.name}</div>
														</div>
														<div key={this.state.div2} onClick={() => this.pick(obj.id)} style={{
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
															backgroundPosition: "center",
															backgroundImage: "url(../cardback1.png)",
															width: "100%",
															height: cardHeight + "px",
															textAlign: "center",
															cursor:'pointer'
															
														}}>
														</div>
													</ReactCardFlip>
												</div>)}
											)} */}
									</div>):(<div></div>)}
										
									</div>
									<div class="btn-group btn-block">
									<button type="button" class="btn btn-light font13 py-2"><img src="../icon-ticket.png" width="24" class="py-2" /> <br />Còn <span class="font-weight-bold text-warning">10</span> lượt chơi</button>
									<button type="button" class="btn btn-light font13 py-2 mx-1" data-toggle="modal" data-target="#myModal"><img src="../icon-gift-box.png" width="24" class="py-2" /><br />Xem  phần thưởng</button>
									<button type="button" class="btn btn-light font13 py-2 mr-1" data-toggle="modal" data-target="#myModal1"><img src="../icon-add.png" width="24" class="py-2" /> <br />Mua Lượt  ngay</button>
									<button type="button" class="btn btn-light font13 py-2"><img src="../icon-history.png" width="24" class="py-2" /> <br />Xem  lịch sử</button>
									</div>
									<div class="card mt-2">
									<div class="card-body font13">
										<ul class="list-unstyled mb-0">
											<li>{this.state.guide1}</li>
											<li>{this.state.guide2}</li>
										</ul>
									</div>
									</div>                    
								</div>
								<div class="btn-group btn-block m-3">
								<button type="button" class="btn shadow-sm border btn-hover border-right-0 text-uppercase text-white py-2"><span class="small">Chơi x 1</span></button>
								<button type="button" class="btn shadow-sm border btn-hover border-left-0 text-uppercase text-white py-2"><span class="small">Chơi x 10</span></button>
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
								<div class="col-6 col-md-4 px-3">
									<div class="thumb-lat-the position-relative">
										<a href="#" title="Chơi ngay" class="text-dark">
											<img src="images/banner-game/thien-dia-chi-ton.png" width="100%" />
											<div class="overlay">
												<div class="text text-white small">Chơi ngay &raquo;</div>
											</div>
										</a>
									</div>
									<h3 class="font13 py-2"><a href="#" title="Thiên địa chí tôn" class="text-dark">Thiên địa chí tôn</a></h3>
								</div>
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
								<div class="col-6 col-md-4 px-3">
									<div class="thumb-lat-the position-relative">
										<a href="#" title="Chơi ngay" class="text-dark">
											<img src="images/banner-game/thien-dia-chi-ton.png" width="100%" />
											<div class="overlay">
												<div class="text text-white small">Chơi ngay &raquo;</div>
											</div>
										</a>
									</div>
									<h3 class="font13 py-2"><a href="#" title="Thiên địa chí tôn" class="text-dark">Thiên địa chí tôn</a></h3>
								</div>
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
								<div class="col-6 col-md-4 px-3">
									<div class="thumb-lat-the position-relative">
										<a href="#" title="Chơi ngay" class="text-dark">
											<img src="images/banner-game/thien-dia-chi-ton.png" width="100%" />
											<div class="overlay">
												<div class="text text-white small">Chơi ngay &raquo;</div>
											</div>
										</a>
									</div>
									<h3 class="font13 py-2"><a href="#" title="Thiên địa chí tôn" class="text-dark">Thiên địa chí tôn</a></h3>
								</div>
							</div>
							
						</div>
					</div>
					<div class="col-sm-3 px-2">
						<div class="bg-white p-3">
							<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game thủ may mắn</span></h2>
							<div class="list-newest">
								<ul>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Long Phi - </span>Thẻ 50k <span class="new">New</span></li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Huyền My - </span>Thẻ 10k <span class="new">New</span></li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">fb_356safh... - </span>Thẻ 20k <span class="new">New</span></li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Spider man - </span>Thẻ 30k </li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Ngọc Trinh - </span>Thẻ 10k </li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Chim sẻ đi nắng - </span>Thẻ 5k </li>
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

			{/* <!-- The Modal Thong tin phan thuong --> */}
			<div class="modal fade" id="myModal">
			<div class="modal-dialog">
				<div class="modal-content">
				<div class="modal-header pb-0">
					<h4 class="modal-title font13 border-title-cat font-weight-bold color-title-cat">Phần thưởng</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body font13">
					<h3 class="text-center font16 font-weight-bold py-3">Thông tin lật thẻ Scoin</h3>
					<p class="text-center"><img src="images/img-lat-the-2.PNG" width="100%" /><br /><span class="font-italic">Cộng trực tiếp vào ví Scoin</span></p>
					<h5 class="font-weight-bold font13">Cơ cấu giải thưởng</h5>
					<ol class="pl-3">
						<li>10tr Scoin - 3000 giải</li>
						<li>5tr Scoin - 7000 giải</li>
						<li>10tr Scoin - 3000 giải</li>
						<li>5tr Scoin - 7000 giải</li>
					</ol>
					<h5 class="font-weight-bold font13">Thể lệ tham gia</h5>
					<p>Tất cả các khách hàng mua thẻ Scoin</p>
					<h5 class="font-weight-bold font13">Thời gian diễn ra</h5>
					<p>Từ 01/11/2019 đến hết năm 2020</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-hover" data-dismiss="modal"><span class="small">Đóng</span></button>
				</div>

				</div>
			</div>
			</div>

			{/* <!-- The Modal Mua luot --> */}
			<div class="modal fade" id="myModal1">
			<div class="modal-dialog">
				<div class="modal-content">
				<div class="modal-header pb-0">
					<h4 class="modal-title font13 border-title-cat font-weight-bold color-title-cat">Mua thêm lượt</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body font13">
					<a href="#" title="Mua 1 lượt" class="text-decoration-none">
							<div class="card shadow-sm mb-2 hover-mualuot" tabIndex="1">
							<div class="card-body p-3 pl-2">
								<div class="media position-relative">
								<div class="media-body">
									<span class="font-weight-bold color-nd">+ 1 lượt</span>
								</div>
								<div class="position-absolute text-dark" style={{right:0}}>
									<img src="images/icon.png" alt="icon" width="16" /> <strong>1.000</strong>
								</div>
								</div>
							</div>
							</div>
							</a>
							<a href="#" title="Mua 5 lượt" class="text-decoration-none">
							<div class="card shadow-sm mb-2 hover-mualuot" tabIndex="1">
							<div class="card-body p-3 pl-2">
								<div class="media position-relative">
								<div class="media-body">
									<span class="font-weight-bold color-nd">+ 5 lượt</span><span class="font13 font-italic text-muted px-2">(Nhiều người mua nhất)</span>
								</div>
								<div class="position-absolute text-dark" style={{right:0}}>
									<img src="images/icon.png" alt="icon" width="16" /> <strong>5.000</strong>
								</div>
								</div>
							</div>
							</div>
							</a>
							<a href="#" title="Mua 10 lượt" class="text-decoration-none">
							<div class="card shadow-sm mb-2 hover-mualuot" tabIndex="1">
							<div class="card-body p-3 pl-2">
								<div class="media position-relative">
								<div class="media-body">
									<span class="font-weight-bold color-nd">+ 10 lượt</span>
								</div>
								<div class="position-absolute text-dark" style={{right:0}}>
									<img src="images/icon.png" alt="icon" width="16" /> <strong>10.000</strong>
								</div>
								</div>
							</div>
							</div>
							</a>
							<a href="#" title="Mua 50 lượt" class="text-decoration-none">
							<div class="card shadow-sm mb-2 hover-mualuot" tabIndex="1">
							<div class="card-body p-3 pl-2">
								<div class="media position-relative">
								<div class="media-body">
									<span class="font-weight-bold color-nd">+ 50 lượt</span>
								</div>
								<div class="position-absolute text-dark" style={{right:0}}>
									<img src="images/icon.png" alt="icon" width="16" /> <strong>50.000</strong>
								</div>
								</div>
							</div>
							</div>
							</a>
							<button type="button" class="btn btn-block shadow-sm border btn-hover text-uppercase text-white py-2 my-2" data-toggle="modal" data-target="#myModal2"><span class="small">Mua ngay</span></button>
				</div>


				</div>
			</div>
			</div>

			{/* <!-- The Modal Thong bao mua luot --> */}
			<div class="modal fade" id="myModal2">
			<div class="modal-dialog">
				<div class="modal-content">
				<div class="modal-header pb-0">
					<h4 class="modal-title font13 border-title-cat font-weight-bold color-title-cat">Thông báo</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body font13">
					<div class="success-checkmark">
					<div class="check-icon">
						<span class="icon-line line-tip"></span>
						<span class="icon-line line-long"></span>
						<div class="icon-circle"></div>
						<div class="icon-fix"></div>
					</div>
					</div>
					<div class="alert alert-success text-center">
					Chúc mừng bạn đã mua thành công <span class="color-nd font-weight-bold">+ 5 lượt</span>!
					</div>
					<div class="alert alert-danger text-center">
					Giao dịch thất bại!
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-hover" data-dismiss="modal"><span class="small">Đóng</span></button>
				</div>

				</div>
			</div>
			</div>
		</div>)
	}
}

LuckyDetailComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(LuckyDetailComponent)))
