import React from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import {withMobileDialog} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Notification from '../Notification';
import LoginRequired from '../LoginRequired';
import '../../styles/imageServerError.css';
import '../../styles/luckyDetail.css';


class LuckyItemComponent extends React.Component {

	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}
	backLucky=()=>{
		this.props.backLucky();
	}
	convettoLocaleString(value){
		return value.toLocaleString();
	}

	render() {
		const {dataDetail,message,openSnack,snackVariant,dialogLoginOpen,server,waiting}=this.props;

		return (dataDetail!==undefined) ? (
			<div>
				<Grid container xs={12} md={12} style={{background:'#fff', border:'1px solid #d0d0d1', padding:10}}>
					<Grid item xs={12}>
						<div style={{height:"50px", paddingTop:5, borderBottom:'1px solid #999999'}}>
							<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_bonus.png" alt="icon"/></div><span style={{float:'left'}}>Phần thưởng</span>
						</div>
								
					</Grid>
					{/* {dataDetail.itemOfSpin.map((obj, key) => (
						<ListItem key={key} style={{ minWidth: "120px", color:'black', borderBottom:'1px solid #999999' }}>
							<div>
								<img alt="just alt" className="lucky-item-img" src={obj.item.urlImage} />
							</div>&nbsp;&nbsp;&nbsp;&nbsp;
							<span>{obj.item.name}</span>
						</ListItem>
					))} */}
					<div className={"article_content"}
						 dangerouslySetInnerHTML={{ __html: dataDetail.luckySpin.description }}>
					</div>

					<div item xs={12} className="btn_buy_latthe" onClick={this.backLucky}>
						<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_back.png" alt="icon"/></div><span style={{float:'left', color:'#009999'}}>Quay Lại</span>
					</div>
				</Grid>

				<Grid item xs={12}>
					<div style={{textAlign:'center', marginTop:40, marginBottom:25, fontSize:14}}>
						<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
						<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
						<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
					</div>
				</Grid>
				{/* <button className="closeBuyTurn" onClick={this.backLucky}>
								QUAY LẠI
				</button> */}
				<LoginRequired open={dialogLoginOpen}></LoginRequired>
				<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>
		) : (<div className="global-loading">
			{(waiting === true) ? (												
				<CircularProgress style={{ color: "black" }} size={50} />):((server===true)?(<img className="error" alt="just alt"
				src="../baotri.png" />):(<div style={{color:"black", fontSize:"20px"}}>Không có dữ liệu!</div>))}
			{/* <LoginRequired open={dialogLoginOpen}></LoginRequired> */}
		</div>)
	}
}

LuckyItemComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default connect()(withMobileDialog()(LuckyItemComponent))
