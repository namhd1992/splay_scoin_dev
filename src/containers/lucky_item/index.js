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
			scoin_token:'H1PuNJ%2bcoqqf5LuMQVl44l5tq2B%2fnmMeTd029tRUEkLfRZy9SjhIzQW6IedF1MqAhm4oKQs%2f%2bLCv9d5FzFtkf0ZspWiwpWXS3UQQDmfqY%2b%2fY2e5MC%2fhuDDBszTicVPo95Bn8DyQI34AYmtwf%2bV%2f91Twrs0DvXsS7U4k0pa1aQ9NOtP1wK041P753Dc2UQ%2fHb',

		};
	}
	componentWillMount(){
		var scoin_token=localStorage.getItem("scoin_token");
		if(scoin_token!=="" && scoin_token!==undefined){
			this.setState({scoin_token: scoin_token})
		}		
	}

	componentDidMount() {
		var _this = this;
		const {scoin_token}= this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		var idLucky= localStorage.getItem("idLucky");
		// if (user !== null) {
		// 	this.props.getDetailData(user.access_token, idLucky);
		// } else {
		// 	_this.setState({ dialogLoginOpen: true });
		// }
		this.props.getDetailData(idLucky, scoin_token);
	}


	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	backLucky=()=>{
		var idLucky= localStorage.getItem("idLucky");
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckydetail`,
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