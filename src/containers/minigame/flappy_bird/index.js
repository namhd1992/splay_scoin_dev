import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ListComponent from '../../../components/page/List'
// import '../../styles/lucky.css'


class FlappyBird extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,
			txt_btn:'Bắt Đầu',
			start:false,
			reset:false	
		};
	}

	componentWillMount(){
        

	}

	componentDidMount() {

	}
	

	render() {
        const {txt_btn, start, reset}=this.state;
        const {list_game}=this.props
		return (
			<div class='container'>
				<div>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
			
                <ListComponent list_game={list_game} />
				
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FlappyBird)