import React from 'react'
import Grid from 'material-ui/Grid'
import '../../styles/luckyHistory.css'


class LiveStreamComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
			linkLiveStream:'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fscoinvtcmobile%2Fvideos%2F1364269870398870%2F&show_text=0&width=560'
		};
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
