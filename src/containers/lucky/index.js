import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData,
	getMoreData
} from '../../modules/lucky'
import {
	changeTitle
} from '../../modules/global'
import LuckyComponent from '../../components/page/Lucky'

class Lucky extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			limit: 10,
			offset: 0,
			loadedRecords: 0,
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
		var _this = this;
		const {scoin_token}= this.state;
		this.props.changeTitle("MAY MẮN");
		this.props.getData(this.state.limit, this.state.offset, scoin_token).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + _this.state.offset });
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


	loadMoreAction = () => {
		var _this = this;
		const {scoin_token}= this.state;
		var newOffset = this.state.limit + this.state.offset;
		this.props.getMoreData(this.state.limit, newOffset, scoin_token).then(function () {
			_this.setState({ loadedRecords: _this.state.limit + newOffset });
		});
	}

	render() {
		
		return (
			<div>
				<LuckyComponent
					loadMoreAction={this.loadMoreAction}
					data={this.props.data}
					waiting={this.props.waiting}
					totalRecords={this.props.totalRecords}
					loadedRecords={this.state.loadedRecords}
					server={this.props.server}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.lucky.data,
	waiting: state.lucky.waiting,
	totalRecords: state.lucky.totalRecords,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getMoreData,
	changeTitle
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky)