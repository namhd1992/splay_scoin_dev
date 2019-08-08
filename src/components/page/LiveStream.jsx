import React from 'react'
import Grid from 'material-ui/Grid'
import '../../styles/luckyHistory.css'


class LiveStreamComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
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
		var data=[];
		var totalRecords=0;
		if(dataDetail !==undefined && dataDetail!==null){
			data=dataDetail.luckySpinHistory.slice(0, this.state.numberShow);
			totalRecords=dataDetail.luckySpinHistory.length;
		}

		return (dataDetail !==undefined && dataDetail!==null)?(<Grid container spacing={12}>
			<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:30}}>
				<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_latthe.png" alt="icon"/></div><span style={{float:'left', fontWeight:'bold', color:"#6a6a6a"}}>Lịch sử trúng thưởng</span>
			</Grid>
			<Grid item xs={12} md={12} style={{marginBottom:20}}>
				<div>
					{data.map((obj, key) => (
						<div key={key} style={{borderBottom:'1px solid #a6a6a6', marginBottom:20, paddingBottom:15}}>
							<span>{obj.date}</span>
							<span>{obj.itemName}</span>
							<span>{obj.userName}</span>
							<span>{obj.phone}</span>
						</div>
					))}	
				</div>
			</Grid>
			<Grid item xs={12}>
				{(totalRecords>this.state.numberShow)?(<div item xs={12} className="div_more_history" onClick={this.loadMoreAction}>
					<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_add.png" alt="icon"/></div><span style={{float:'left'}}>Xem Thêm</span>
				</div>):(<div></div>)}
			</Grid>
			<Grid item xs={12}>
				<div style={{textAlign:'center', marginBottom:25, fontSize:14}}>
					<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
					<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
					<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
				</div>
			</Grid>
		</Grid>):(<div></div>)
	}
}


export default (LiveStreamComponent)
