import React from 'react'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button';

import Pagination from "react-js-pagination";
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'


class HistoryComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			value: 0,
			listCodeBonus:[],
			activeCodeBonus:0,
			numberItemInpage:0, 
			countCodeBonus:0,
			numberPage:0,
		};
	}
	handlePageChangeCodeBonus=(pageNumber)=> {
		const {dataCodeBonus}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeCodeBonus: pageNumber, listCodeBonus: dataCodeBonus.slice(newPosition, newPosition+5)});
	}

	render() {
		var rows;
		var length;
		var emptyRows;
		const { classes } = this.props;
		const {listCodeBonus, activeCodeBonus, numberItemInpage, countCodeBonus, numberPage } = this.state; 
		
		return (
			<Grid container spacing={12}>
				<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:40}}>
					<div style={{float:'left'}}><img style={{width:24, height:24, marginRight:10}} src="../icon_latthe.png" alt="icon"/></div><span style={{float:'left', fontWeight:'bold', color:"#6a6a6a"}}>Lịch sử mua sắm</span>
				</Grid>
				<Grid item xs={12} md={12} style={{marginTop:5, marginBottom:40}}>
					<div>
						<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
							<thead>
							<tr className="text-uppercase lead">
								<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Mã</th>
								<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
								<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
							</tr>
							</thead>            
							<tbody className="popup-tudo">
							{listCodeBonus.map((obj, key) => (
								<tr key={key}>
									<td className="border-right-0">{obj.description}</td>
									<td className="border-left-0 border-right-0">{obj.itemName}</td>
									<td className="border-left-0">{obj.date}</td>
								</tr>
							))}
							</tbody>
						</table>
						<div className="pagination justify-content-center pag-custom">
							<Pagination
								activePage={activeCodeBonus}
								itemsCountPerPage={numberItemInpage}
								totalItemsCount={countCodeBonus}
								pageRangeDisplayed={numberPage}
								lastPageText={'Trang cuối'}
								firstPageText={'Trang đầu'}
								itemClass={"page-item"}
								linkClass={"page-link"}
								onChange={(v) => this.handlePageChangeCodeBonus(v)}
							/>
						</div> 
					</div>
				</Grid>
			</Grid>
		);
	}
}


export default HistoryComponent
