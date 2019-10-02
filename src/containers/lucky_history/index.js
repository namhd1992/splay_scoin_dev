import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../../styles/lucky.css'
import {
	history,getTuDo
} from '../../modules/lucky'

import HistoryBonusComponent from '../../components/page/HistoryBonus'

class Lucky_History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 10,
			offset: 0,
			offsetAll:0,
			data:[],
			dataAll:[],
			message: "",
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,
			scoin_token:'y%2bETt%2bPUG68ECJOjzjBQ7F5tq2B%2fnmMeDD%2bJNOrMG1LfRZy9SjhIzaLPEvrH6hnDOpNcM685IBCsVvjfShGrJyfCbHHP%2fwTk2eu6TqfyzsKsjPPFATGGL8ea3oojq%2fmrIhf%2bLKkBJ7b74lUpBPkU1%2f7a1kc3I1O595Idg7np1d42qzsY9f7QAr53Dc2UQ%2fHb',
		};
	}

	componentWillMount(){
		var scoin_token=this.getParamValue("ud");
		if(scoin_token!=="" && scoin_token!==undefined){
			this.setState({scoin_token: scoin_token})
		}		
	}

	componentDidMount() {
		this.getAllData();
	}


	getAllData=()=>{
		var idLucky= localStorage.getItem("idLucky");
		const {scoin_token, limit, offsetAll}= this.state;
		this.props.history(idLucky, scoin_token, this.state.limit, this.state.offsetAll).then(()=>{
			
		});
	}

	getParamValue=(key)=>
	{
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) 
		{
			var pArr = qArray[i].split('=');
			if (pArr[0] === key) 
				return pArr[1];
		}
	}

	getTuDo=()=>{
		const {scoin_token, limit, offset}= this.state;
		var idLucky= localStorage.getItem("idLucky");
		this.props.getTuDo(idLucky, scoin_token,limit,offset);
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
				<HistoryBonusComponent
					notSelectOption={this.notSelectOption}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					dataHistory={this.props.dataHistory}
					getTuDo={this.getTuDo}
					backLucky={this.backLucky}
					server={this.props.server}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}

				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dataHistory: state.lucky.dataHistory,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	history,
	getTuDo,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_History)