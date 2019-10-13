import React from 'react'
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
// import '../../styles/luckyHistory.css';


class LiveStreamComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
			linkLiveStream:'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fscoinvtcmobile%2Fvideos%2F1364269870398870%2F&show_text=0&width=560'
			// https://www.facebook.com/scoinvtcmobile/videos/1364269870398870/
		};
	}

	componentWillMount(){
		var linkLiveStream= localStorage.getItem("linkLiveStream");
		this.setState({linkLiveStream:linkLiveStream})

	}

	// componentDidUpdate(){
	// 	window.onpopstate  = (e) => {
	// 		var idLucky= localStorage.getItem("idLucky");
	// 		window.location.replace(
	// 			`${window.location.protocol}//${window.location.host}/luckydetail/`+idLucky,
	// 		);
	// 	}
	// }

	loadMoreAction=()=>{
		this.setState({numberShow: this.state.numberShow+15})
	}

	render() {
		const { dataDetail } = this.props;
		const {linkLiveStream}=this.state;
		var data=[];
		var totalRecords=0;
		if(dataDetail !==undefined && dataDetail!==null){
			data=dataDetail.luckySpinHistory.slice(0, this.state.numberShow);
			totalRecords=dataDetail.luckySpinHistory.length;
		}

		return (<Grid container spacing={12}>
			<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:30}}>
				<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_latthe.png" alt="icon"/></div><span style={{float:'left', fontWeight:'bold', color:"#6a6a6a"}}>Lịch sử trúng thưởng</span>
			</Grid>
			<Grid item xs={12} md={12} style={{marginBottom:20}}>
				<div class="facebook-responsive">
					<iframe src={linkLiveStream} width="560" height="315" style={{border:'none', overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
				</div>
				<Grid style={{paddingLeft:"8px", marginTop:20, marginBottom:20, paddingBottom:20, borderBottom:'1px solid #d0d1d5'}} container spacing={8} sm={12}>			
					<Grid container spacing={8}>
						<div className="actionPlay">
							<Link to={"/luckyitembonus/"}>
								<div item xs={12} className="btn_bonus_latthe">
									<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_face.png" alt="icon"/></div><span style={{float:'left', color:'#009999'}}>Xem Trên Facebook</span>
								</div>
							</Link>
							<Link to={"/lucky"}>
								<div item xs={12} className="btn_buy_latthe">
									<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5, marginLeft:25}} src="../icon_back.png" alt="icon"/></div><span style={{float:'left', color:'#009999'}}>Quay Lại</span>
								</div>
							</Link>
						</div>
					</Grid>
				</Grid>     
			</Grid>

			<Grid item xs={12}>
				<div style={{textAlign:'center', marginBottom:25, fontSize:14}}>
					<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
					<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
					<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
				</div>
			</Grid>
		</Grid>)
	}
}


export default (LiveStreamComponent)
