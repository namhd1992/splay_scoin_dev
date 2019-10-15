import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import IconButton from 'material-ui/IconButton'
import { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Help from 'material-ui-icons/Help';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { withStyles } from 'material-ui/styles'
import { withTheme } from 'material-ui/styles'
// import '../../styles/imageServerError.css'
import '../../styles/style.css';
import $ from 'jquery';
import 'bootstrap';


const styles = theme => ({
	root: {
		margin: "auto"
	},
	gridItem: {
		borderRadius: "5px",
		backgroundColor: "#fff",
		overflow: "hidden"
	}
});

class LuckyComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			height:0,
			width:0,
			linkLiveStream:'',
			img_bonus:'',
		};
	}

	componentWillMount(){
		var w=window.innerWidth;
		var height=0, width=0;
		if(w>1080){
			height=45;
			width=200;
		}else if(w>=768){
			height=35;
			width=170;
		}else{
			height=30;
			width=150;
		}
		this.setState({height:height, width:width});
	}


	loadMoreAction=()=>{
		this.props.loadMoreAction();
	}

	setIdLucky=(id)=>{
		localStorage.setItem("idLucky", id);
		return id;
	}
	detailBonus=()=>{
		console.log('ABV')
	}

	watchLivestream=(obj)=>{
		localStorage.setItem("linkLiveStream", obj.linkLiveStream);
	}

	getTime=(obj)=>{
		var now = moment(new Date()); //todays date
		var end = moment(new Date(obj.endDate)); // another date
		var duration = moment.duration(end.diff(now));
		var days = Math.floor(duration.asDays());
		var hours = Math.floor(duration.asHours());
		var minutes = Math.floor(duration.asMinutes());
		if (days > 0) {
			return "Còn " + days + " ngày";
		} else if (hours > 0) {
			return "Còn " + hours + " giờ";
		} else if (minutes > 0) {
			return "Còn " + minutes + " phút";
		}else{
			return "";
		}
	}

	openLiveStream=(obj)=>{
		this.setState({linkLiveStream: obj.linkLiveStream},()=>{
			$('#myModal1').modal('show');
		})
	}

	openBonus=(obj)=>{
		this.setState({img_bonus: obj.image},()=>{
			$('#myModal').modal('show');
		})
	}

	linkToDetail=(obj)=>{
		localStorage.setItem("idLucky", obj.id);
		if(obj.type==="LAT_THE"){
			window.location.replace(
				`${window.location.protocol}//${window.location.host}/luckydetail`,
			);
		}else if(obj.type==="VONG_QUAY"){
			window.location.replace(
				`${window.location.protocol}//${window.location.host}/luckyrotation`,
			);
		}
	}



	render() {
		const {data, waiting, totalRecords, loadedRecords, server}=this.props;
		const {linkLiveStream, img_bonus}=this.state;
		// console.log(data)
		const { classes } = this.props;
		// return (data.length>0) ? (<div className={classes.root}>
		return (<div className={classes.root}>

			<div class="container py-3" style={{marginTop:55}}>
				<div class="row">
					<div class="col-sm-9 px-2">
						<div class="bg-white p-3 mb-3">
							<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Lật thẻ</span></h2>
							{(data.length>0)?(<div class="row">
								{data.map((obj, key) => {
									return (<div class="col-md-6 my-2 px-3" key={key}>                     	
										<div class="thumb-lat-the position-relative">
											<span style={{cursor:"pointer"}} onClick={()=>this.linkToDetail(obj)}>
												<img src={obj.image} width="100%" />
												<div class="overlay">
													<div class="text text-white small">Chơi ngay &raquo;</div>
												</div>
											</span>
											<div class="position-absolute a1-title small">
												<span class="badge bg-badge p-1 text-dark border-radius-none">{this.getTime(obj)}</span>
												{(obj.linkLiveStream!=="")?(<span class="badge bg-badge p-1 border-radius-none"><img src="../spin.gif" width="7" /> <span style={{cursor: "pointer"}} class="text-dark" onClick={()=>this.openLiveStream(obj)}>Quay số</span></span>):(<div></div>)}
												
											</div>                 
											<div class="position-absolute icon-thongtinphanthuong px-2 py-0 bg-badge small"><span style={{cursor: "pointer"}} class="text-dark" onClick={()=>this.openBonus(obj)}>?</span></div>
										</div>
										
									</div>)
									}
								)}
								{(totalRecords > loadedRecords)?(<button type="button" class="btn btn-block shadow-sm m-3 border btn-hover text-uppercase text-white py-2"><span class="small">Còn {totalRecords-loadedRecords} game khác, Nhấn xem thêm</span></button>):(<div></div>)}
								
							</div>):(<div></div>)}
							
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
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Long Phi - </span>Thẻ 50k <span class="new">New</span></li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Huyền My - </span>Thẻ 10k <span class="new">New</span></li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">fb_356safh... - </span>Thẻ 20k <span class="new">New</span></li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Spider man - </span>Thẻ 30k </li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Ngọc Trinh - </span>Thẻ 10k </li>
									<li class="py-2"><img src="../icon-scoin.png" width="32" /><span class="text-muted px-2">Chim sẻ đi nắng - </span>Thẻ 5k </li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>   
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
						<p class="text-center"><img src={img_bonus} width="100%" /><br /><span class="font-italic">Cộng trực tiếp vào ví Scoin</span></p>
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
			
			{/* LiveStream */}
			<div class="modal fade" id="myModal1">
			<div class="modal-dialog">
					<div class="modal-content">
					<div class="modal-header pb-0">
						<h4 class="modal-title font13 border-title-cat font-weight-bold color-title-cat">Xem LiveStream</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body font13">
						<div class="facebook-responsive">
							<iframe src={linkLiveStream} width="560" height="315" style={{border:'none', overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
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

export default connect()(withStyles(styles)(withTheme()(LuckyComponent)))
