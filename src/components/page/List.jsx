import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui/Progress'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'
// import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
// import CheckinIcon from 'material-ui-icons/CheckCircle'
// import LikeIcon from 'material-ui-icons/ThumbUp'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
	withMobileDialog,
} from 'material-ui/Dialog'
import PropTypes from 'prop-types'
import { withStyles } from "material-ui/styles/index"
import Notification from '../Notification'
import PopupMission from '../PopupMission';
import '../../styles/style.css';
import $ from 'jquery';
import 'bootstrap';
import {
	FacebookIcon,
	FacebookShareButton,
  } from "react-share";
// import '../../styles/mission.css'
// import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#fff",
	},
};

class ListComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title_popup:"",
			openPopupMission:false,
			height:0,
			paddingL:0,
			dataMission:{},
			rangeTop:0,
		};
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

	render() {
		const {list_game}=this.props;
		const {dataMission, year, rangeTop}=this.state;

		return (<div class="container py-2">
                    <div class="mb-2 bg-white p-3 card border-0 shadow-ssm">
                        <h2 class="font13 color-title-cat font-weight-bold border-bottom pb-2"><span class="border-title-cat pr-2">Tất cả mini game H5</span></h2>
                        <div class="row">
                            {list_game.map((obj, key) => {
                                return (<div class="col-4 col-md-3 px-3" key={key}>
                                            <div class="thumb-lat-the position-relative">
                                                <Link to={{pathname: `minigame`,  state:{id: obj.id}}}>
                                                    <a title="Chơi ngay" class="text-dark text-center">
                                                        <img src={obj.img} alt="Thiên ma quyết" width={50} height={50} class="border-4 mx-auto" />
                                                        <h2 class="small py-2">{obj.name}</h2>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>)}
							)}
                        </div>
                        <button type="button" class="btn btn-light btn-block btn-sm text-primary"><span class="spinner-grow spinner-grow-sm"></span> Xem thêm... </button>          
                    </div>
					
		</div>)
	}
}
ListComponent.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};


export default connect()(withMobileDialog()(withStyles(styles, { withTheme: true })(ListComponent)))
