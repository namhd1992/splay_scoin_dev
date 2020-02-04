import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import '../../styles/lucky.css'
import {
	history,getTuDo, getCodeBonus
} from '../../modules/lucky'

import HistoryBonusComponent from '../../components/page/HistoryBonus'

class Lucky_History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 10,
			offset: 0,
			totalRecords:0,
			data:[],
			message: "",
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,
			scoin_token:'H1PuNJ%2bcoqqf5LuMQVl44l5tq2B%2fnmMeTd029tRUEkLfRZy9SjhIzfuDZfGFbSDrdGlKZ9kS%2bLuv9d5FzFtkfwhSQMA3R2YuoTUSecNuOn6iQFPFpXyYXRSK3V5vvxMqn9VO%2fYRnrmlMLwTWn11wlDtXidULLqJjqNB%2bOlbFqV8P4T%2bT1ZoR5b53Dc2UQ%2fHb',
		};
	}

	componentWillMount(){
		var scoin_token=localStorage.getItem("scoin_token");
		if(scoin_token!=="" && scoin_token!==undefined){
			this.setState({scoin_token: scoin_token})
		}		
	}

	componentDidMount() {
		this.getAllData(0);
	}


	getAllData=(offset)=>{
		var idLucky= localStorage.getItem("idLucky");
		const {scoin_token, limit}= this.state;
		this.setState({data:[]},()=>{
			this.props.history(idLucky, scoin_token, this.state.limit, offset).then(()=>{
				var data=this.props.dataHistory;
				if(data.status==="01"){
					this.setState({data:data.data, totalRecords: data.totalRecords, offset:offset+limit})
				}
			});
		})
	}


	getTuDo=(offset)=>{
		const {scoin_token, limit, data}= this.state;
		var idLucky= localStorage.getItem("idLucky");
		this.setState({data:[]},()=>{
			this.props.getTuDo(idLucky, scoin_token,limit,offset).then(()=>{
				var dataTuDo=this.props.dataTuDo;
				if(dataTuDo.status==="01"){
					this.setState({data:dataTuDo.data, totalRecords: data.totalRecords, offset:offset+limit})
				}
			});
		})
	}

	getXu=(offset)=>{
		const {scoin_token, limit}= this.state;
		var idLucky= localStorage.getItem("idLucky");
		this.setState({data:[]},()=>{
			this.props.getCodeBonus(idLucky, scoin_token, 'XU', limit , offset).then(()=>{
				var data=this.props.dataCodeBonus;
				if(data.status==="01"){
					this.setState({data:data.data, totalRecords: data.totalRecords, offset:offset+limit})
				}
			})
		})
	}

	getGiftcode=(offset)=>{
		const {scoin_token, limit}= this.state;
		var idLucky= localStorage.getItem("idLucky");
		this.setState({data:[]},()=>{
			this.props.getCodeBonus(idLucky, scoin_token,'GIFTCODE', limit , offset).then(()=>{
				var data=this.props.dataCodeBonus;
				if(data.status==="01"){
					this.setState({data:data.data, totalRecords: data.totalRecords, offset:offset+limit})
				}
			})
		})
	}

	getCard=(offset)=>{
		const {scoin_token, limit}= this.state;
		var idLucky= localStorage.getItem("idLucky");
		this.setState({data:[]},()=>{
			this.props.getCodeBonus(idLucky, scoin_token,'SCOIN_CARD', limit , offset).then(()=>{
				var data=this.props.dataCodeBonus;
				if(data.status==="01"){
					this.setState({data:data.data, totalRecords: data.totalRecords, offset:offset+limit})
				}
			})
		})
	}



	backLucky=()=>{
		var idLucky= localStorage.getItem("idLucky");
		window.location.replace(
			`${window.location.protocol}//${window.location.host}/luckydetail`,
		);
	}

	render() {
		const {offset, limit, totalRecords, data}=this.state;
		
		return (
			<div>
				<HistoryBonusComponent
					offset={offset}
					limit={limit}
					totalRecords={totalRecords}
					notSelectOption={this.notSelectOption}
					handleCloseDialogLogin={this.handleCloseDialogLogin}
					data={data}
					getTuDo={this.getTuDo}
					getCard={this.getCard}
					getGiftcode={this.getGiftcode}
					getXu={this.getXu}
					getAllData={this.getAllData}
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
	dataTuDo: state.lucky.dataTuDo,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	history,
	getTuDo,
	getCodeBonus,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_History)