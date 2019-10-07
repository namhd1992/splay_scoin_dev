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
			scoin_token:'y%2bETt%2bPUG68ECJOjzjBQ7F5tq2B%2fnmMeDD%2bJNOrMG1LfRZy9SjhIzdVEp0mNyd27gT5RAC0MWEOsVvjfShGrJzMe7uhZEit%2bHIZ70XHpJPQ9i7c5A6AIWgBgoTkeOzw6ENmaN9BOridvgCQJvTbPWRwirA9PAFz2IfNNb2qZK6bRK64v76mJ2r53Dc2UQ%2fHb',

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