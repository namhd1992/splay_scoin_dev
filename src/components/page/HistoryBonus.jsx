import React from 'react'
import Grid from 'material-ui/Grid'
// import '../../styles/luckyHistory.css'
import { withRouter } from 'react-router-dom';
import '../../styles/style.css';
import $ from 'jquery';
import 'bootstrap';


class HistoryBonusComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
			isAll:true,
			isSelect:false,
			itemSelect:'',
			type:'',
		};
	}

	loadMoreAction=()=>{
		const {offset}=this.props;
		const {isAll, type}=this.state;
		if(isAll){
			this.props.getAllData(offset)
		}else{
			if(type===''){
				this.props.getTuDo(offset)
			}else if(type==='XU'){
				this.props.getXu(offset)
			}else if(type==='GIFTCODE'){
				this.props.getGiftcode(offset)
			}else if(type==='SCOIN_CARD'){
				this.props.getCard(offset)
			}
		}
		// this.setState({numberShow: this.state.numberShow+15})
	}

	getAllData=()=>{
		this.props.getAllData(0)
		this.setState({isAll:true})
	}

	getData=()=>{
		this.props.getTuDo(0)
		this.setState({isAll:false})
	}


	select=(v)=>{
		const type=v.target.value;
		if(type==='All'){
			this.props.getTuDo(0)
		}else if(type==="Xu"){
			this.setState({type:'XU'})
			this.props.getXu(0)
		}else if(type==="Card"){
			this.setState({type:'SCOIN_CARD'})
		this.props.getCard(0)
		}else if(type==="Giftcode"){
			this.setState({type:'GIFTCODE'})
			this.props.getGiftcode(0)
		}
	}


	render() {
		const { data, totalRecords, offset, limit } = this.props;
		const {isAll}= this.state;
		// var totalRecords=0;
		// if(dataHistory !==undefined && dataHistory!==null){
		// 	data=dataHistory.data.slice(0, this.state.numberShow);
		// 	totalRecords=dataHistory.data.length;
		// }

		return (<div>
					<div class="container py-3" style={{marginTop:55}}>
						<div class="row">
							<div class="col-sm-9 px-2">
								<div class="bg-white p-3 mb-3 page-history">
									<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Lịch sử trúng thưởng</span></h2>
									<ul class="nav nav-tabs nav-justified m-3">
										<li class="nav-item">
											<a className="nav-link active text-secondary font13 m-1" data-toggle="tab" href="#all" onClick={this.getAllData}>Tất cả</a>
										</li>
										<li class="nav-item">
											<a className="nav-link text-secondary font13 m-1" data-toggle="tab" href="#my" onClick={this.getData}>Của tôi</a>
										</li>
									</ul>

									<div class="tab-content">
										<div style={{paddingRight:15, paddingLeft:15}}>
											{(!isAll)?(<form>
												<select name="history" class="custom-select custom-select-sm mb-1 float-right" style={{width: 90, fontSize: 12}} onChange={(v)=>this.select(v)}>
													<option value="All">Tất cả</option>
													<option value="Xu">Xu</option>
													<option value="Card">Thẻ</option>
													<option value="Giftcode">Giftcode</option>
												</select>
											</form>):(<div></div>)}
											
											<table class="table table-striped table-responsive-sm font13">                       
												
												{(data.length>0)?(<tbody>
													{data.map((obj, key) => (
														<tr>
															<td>{obj.date}</td>
															<td>{obj.itemName}</td>
															<td>{obj.userName}</td>
															<td>{obj.phone}</td>
														</tr>))}	
														</tbody>):(<div><p style={{textAlign:'center'}}>Chưa có thông tin</p></div>)}
											</table>
										</div>
									</div>
									{(totalRecords>offset)?(<button type="button" class="btn btn-block shadow-sm border btn-hover text-uppercase text-white py-2 my-2" onClick={this.loadMoreAction}><span class="small">Xem thêm, còn nhiều lắm</span></button>  ):(<div></div>)}
									
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
								<div class="bg-white p-3 mt-3">
									<h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Game Hot </span></h2>
									<div class="media border-bottom py-2 my-1">
										<img src="images/thumb/kiem-the-truyen-ky.png" alt="Kiếm thế" class="mr-3" style={{width:60}} />
										<div class="media-body">
											<h4 class="font13 font-weight-bold">Kiếm thế <img src="images/hot.gif" width="48"/></h4>
											<p class="small">Hơn 1tr lượt tải</p>
										</div>
									</div>
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


export default withRouter(HistoryBonusComponent)

