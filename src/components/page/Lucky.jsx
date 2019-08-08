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
import '../../styles/imageServerError.css'


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
		};
	}

	componentWillMount(){
		var w=window.innerWidth;
		var height=0, width=0;
		if(w>1080){
			height=40;
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

	render() {
		const {data, waiting, totalRecords, loadedRecords, server}=this.props;
		const { classes } = this.props;
		return (data!==undefined) ? (<div className={classes.root}>
			<Grid container spacing={12}>
				<Grid item xs={12} md={12}>
					<Grid item xs={12} md={12} style={{background:'#fff', border:'1px solid #d0d0d1', padding:10}}>
						<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:40}}>
							<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_latthe.png" alt="icon"/></div><span style={{float:'left', fontWeight:'bold', color:"#6a6a6a"}}>Lật thẻ</span>
						</Grid>
						<Grid container spacing={12}>
							{data.map((obj, key) => {
								var now = moment(new Date()); //todays date
								var end = moment(new Date(obj.endDate)); // another date
								var duration = moment.duration(end.diff(now));
								var days = Math.floor(duration.asDays());
								var hours = Math.floor(duration.asHours());
								var minutes = Math.floor(duration.asMinutes());
								var time_text = "";
								if (days > 0) {
									time_text = "Còn " + days + " ngày";
								} else if (hours > 0) {
									time_text = "Còn " + hours + " giờ";
								} else if (minutes > 0) {
									time_text = "Còn " + minutes + " phút";
								}
								return (
									<Grid key={key} item xs={12} md={12} style={{marginBottom:20}}>
										<div className={classes.gridItem}>
											
												<GridListTile style={{ listStyleType: "none", backgroundColor: "#fff" }}>
													<Link to={"/luckydetail/" + obj.id} onClick={() => this.setIdLucky(obj.id)}>
														<div style={{
															backgroundImage: "url(" + obj.image + ")",
															backgroundSize: "cover",
															width: "100%",
															paddingBottom: "30%",
															backgroundRepeat: "no-repeat",
															backgroundPosition: "center"
														}} />
													</Link>
													<GridListTileBar
														style={{backgroundColor:'rgba(45, 124, 125, 0.6)', height:this.state.height, borderRadius:5}}
														title={time_text}
														actionIcon={
															<IconButton aria-label={`info about`} className={classes.icon} onClick={this.detailBonus}>
															  <Help></Help>
															</IconButton>
														  }
													/>
												</GridListTile>
											
										</div>
										<div style={{border:'1px solid #ff0000', borderRadius:3, padding:10}}>
											<span>Đang diễn ra livestream quay số</span><span>Xem</span>
										</div>
									</Grid>
								)
							}
							)}
							{(waiting) ? (<Grid item xs={12}>
								<div className="global-loading">
								{(server !== true) ? (												
									<CircularProgress style={{ color: "black" }} size={50} />):(<img className="error" alt="just alt"
									src="../baotri.png" />)}
								</div>
							</Grid>) : (totalRecords > loadedRecords) ? (
									<div item xs={12} className="div_more_lucky" onClick={this.loadMoreAction}>
										<div style={{float:'left'}}><img style={{width:20, height:20, marginRight:5}} src="../icon_add.png" alt="icon"/></div><span style={{float:'left'}}>Xem Thêm</span>
									</div>
							) : (<div></div>)}
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<div style={{textAlign:'center', marginTop:40, marginBottom:25, fontSize:14}}>
							<div><span style={{color:'#747c89'}}>Hệ thống phát hành game VTC Mobile</span></div>
							<div><span style={{color:'#747c89'}}>Copyright 2017 VTC Mobile. All rights reverved</span></div>
							<div><span style={{color:'#59d0c4'}}>Hotline 1900 1104</span></div>
						</div>
					</Grid>
				</Grid>
			</Grid>
		</div>):(<div></div>)
	}
}

export default connect()(withStyles(styles)(withTheme()(LuckyComponent)))
