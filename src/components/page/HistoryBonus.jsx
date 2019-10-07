import React from 'react'
import Grid from 'material-ui/Grid'
import '../../styles/luckyHistory.css'
import { withRouter } from 'react-router-dom'


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
		const {limit, offset}=this.props;
		const {isAll, type}=this.state;
		if(isAll){
			this.props.getAllData(limit+offset)
		}else{
			if(type===''){
				this.props.getTuDo(limit+offset)
			}else if(type==='XU'){
				this.props.getXu(limit+offset)
			}else if(type==='GIFTCODE'){
				this.props.getGiftcode(limit+offset)
			}else if(type==='SCOIN_CARD'){
				this.props.getCard(limit+offset)
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

	getXu=()=>{
		this.setState({type:'XU'})
		this.props.getXu(0)
	}

	getGiftcode=()=>{
		this.setState({type:'GIFTCODE'})
		this.props.getGiftcode(0)
	}

	getCard=()=>{
		this.setState({type:'SCOIN_CARD'})
		this.props.getCard(0)
	}


	render() {
		const { data, totalRecords, offset, limit } = this.props;
		const {isAll}= this.state;
		// var totalRecords=0;
		// if(dataHistory !==undefined && dataHistory!==null){
		// 	data=dataHistory.data.slice(0, this.state.numberShow);
		// 	totalRecords=dataHistory.data.length;
		// }

		return (<Grid container spacing={12}>
			<Grid container spacing={12} style={{backgroundColor:'#fff', padding:10}}>
				<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:10}}>
					<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_latthe.png" alt="icon"/></div><span style={{float:'left', fontWeight:'bold', color:"#6a6a6a"}}>Lịch sử trúng thưởng</span>
				</Grid>
				<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:25}}>
					<div style={{display:'flex'}}>
						<div style={{flex:1, float:'left', color:"#6a6a6a", textAlign:'center'}}><h2 style={{cursor:'pointer', textDecoration:(isAll)?"underline":""}} onClick={this.getAllData}>Tất cả</h2></div>
						<div style={{flex:1, float:'left', color:"#6a6a6a", textAlign:'center'}}><h2 style={{cursor:'pointer', textDecoration:(!isAll)?"underline":""}} onClick={this.getData}>Của tôi</h2></div>
					</div>
				</Grid>
				<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:15}}>
					{(!isAll)?(<div style={{display:'flex'}}>
						<div style={{flex:1, float:'left', color:"#6a6a6a", textAlign:'center'}}><span style={{color:'#34c1c3', border:'2px solid #34c1c3', padding:'3px 20px', borderRadius:'5px', cursor:'pointer'}} onClick={this.getXu}>Xu</span></div>
						<div style={{flex:1, float:'left', color:"#6a6a6a", textAlign:'center'}}><span style={{color:'#34c1c3', border:'2px solid #34c1c3', padding:'3px 20px', borderRadius:'5px', cursor:'pointer'}} onClick={this.getCard}>Thẻ</span></div>
						<div style={{flex:1, float:'left', color:"#6a6a6a", textAlign:'center'}}><span style={{color:'#34c1c3', border:'2px solid #34c1c3', padding:'3px 20px', borderRadius:'5px', cursor:'pointer'}} onClick={this.getGiftcode}>Giftcode</span></div>
						<div style={{flex:1, float:'left', color:"#6a6a6a", textAlign:'center'}}><span style={{color:'#34c1c3', border:'2px solid #34c1c3', padding:'3px 20px', borderRadius:'5px', cursor:'pointer'}}>....</span></div>
					</div>):(<div></div>)}
					
				</Grid>
				<Grid item xs={12} md={12} style={{marginBottom:20, marginTop:20}}>
					{(data.length>0)?(<div>
						{data.map((obj, key) => (
							<div key={key} style={{borderBottom:'1px solid #a6a6a6', marginBottom:20, paddingBottom:15, display:'flex'}}>
								<div style={{flex:1, float:'left', color:"#6a6a6a"}}>{obj.date}</div>
								<div style={{flex:1, float:'left', color:"#6a6a6a"}}>{obj.itemName}</div>
								<div style={{flex:1, float:'left', color:"#6a6a6a"}}>{obj.userName}</div>
								<div style={{flex:1, color:"#6a6a6a"}}>{obj.phone}</div>
							</div>
						))}	
					</div>):(<div><p style={{textAlign:'center'}}>Chưa có thông tin</p></div>)}
					
				</Grid>
				<Grid item xs={12}>
					{(totalRecords>(offset+limit))?(<div item xs={12} className="div_more_history" onClick={this.loadMoreAction}>
						<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_add.png" alt="icon"/></div><span style={{float:'left'}}>Xem Thêm</span>
					</div>):(<div></div>)}
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


export default withRouter(HistoryBonusComponent)

