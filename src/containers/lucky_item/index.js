import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	getDetailData,
} from '../../modules/lucky'
import LuckyDetailComponent from '../../components/page/LuckyItem'

class Lucky_Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,

		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var idLucky= localStorage.getItem("idLucky");
		// if (user !== null) {
		// 	this.props.getDetailData(user.access_token, idLucky);
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }
		this.props.getDetailData(idLucky);
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	backLucky=()=>{
		var idLucky= localStorage.getItem("idLucky");
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckydetail/`+idLucky,
		);
	}

	render() {
		
		return (
			<div>
				<LuckyDetailComponent
						showItem={this.showItem}
						handleCloseSnack={this.handleCloseSnack}
						handleCloseDialogLogin={this.handleCloseDialogLogin}
						dataDetail={this.props.dataDetail}
						backLucky={this.backLucky}
						server={this.props.server}
						waiting={this.props.waiting}
						message={this.state.message}
						openSnack={this.state.openSnack}
						snackVariant={this.state.snackVariant}
						dialogLoginOpen={this.state.dialogLoginOpen}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataDetail: state.lucky.dataDetail,
	waiting: state.lucky.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Item)