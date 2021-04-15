import React from 'react';
import { Route } from 'react-router-dom'
// import '../../styles/main.css';
// import Login from '../login';
// import Logout from '../logout';
// import Lucky from '../lucky';
// import Lucky_detail from '../lucky_detail';
// import Lucky_Item from '../lucky_item';
// import Lucky_BuyTurn from '../lucky_buyturn';
// import Lucky_History from '../lucky_history';
// import Lucky_Live from '../lucky_live';
// import Checkin from '../checkin';
import Mission from '../mission';
// import MenuAppBar from '../../components/MenuAppBar';
import Game_detail from '../game_detail';
// import Auction_detail from '../auction_detail';
import History from '../shop_history';
import Lucky_Rotation from '../lucky_rotation'
import San_Kho_Bau from '../san_kho_bau'
import Vong_Quay_May_Man from '../vqmm'
import Snake from '../snakes'
// import Snakes from '../new_snake'
import list_game from '../list_minigame'
import minigame from '../minigame_detail'

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			main: null,
			backgroundColor:'#f5f5f5',
		};
	}

	render() {
		return (
			<div style={{ backgroundColor: this.state.backgroundColor }}>
				{/* <div style={{maxWidth:"1200px", margin:"auto", background: this.state.backgroundColor }}> */}
				<div style={{background: this.state.backgroundColor }}>
				{/* <MenuAppBar isMobile={this.state.isMobile} pathname={document.location.pathname} compact={this.state.compact} scrolling={this.state.scrolling}
						data={[{ url: "home", label: "home" }, { url: "about", label: "about" }]}></MenuAppBar> */}
					<main ref={(c) => this.main = c}>
						{/* <Route exact path="/" component={Home} />
						<Route exact path="/about-us" component={About} />
						<Route exact path="/loginwidget" component={LoginWidget} />
						<Route exact path="/loginwidget1" component={LoginWidget1} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/history" component={History} />
						<Route exact path="/game" component={Game} />
						<Route exact path="/gamedetail/:id" component={Game_detail} />
						<Route exact path="/auction" component={Auction} />
						<Route exact path="/auctiondetail/:id" component={Auction_detail} />
						<Route exact path="/itemgiftcodedetail/:id" component={Item_giftcode_detail} />
						<Route exact path="/giftcode" component={Giftcode} />
						<Route exact path="/giftcodedetail/:id" component={Giftcode_detail} /> */}
						{/* <Route exact path="/login" component={Login} /> */}
						{/* <Route exact path="/logout" component={Logout} /> */}
						<Route exact path="/" component={Game_detail} />
						<Route exact path="/luckyrotation" component={Lucky_Rotation} />
						<Route exact path="/san-kho-bau" component={San_Kho_Bau} />
						<Route exact path="/snake" component={Snake} />
						<Route exact path="/vqmm/:id" component={Vong_Quay_May_Man} />
						{/* <Route exact path="/history" component={History} /> */}
						{/* <Route exact path="/lucky" component={Lucky} /> */}
						<Route exact path="/gamedetail/" component={Game_detail} />
						{/* <Route exact path="/help" component={Help} />
						<Route exact path="/dieu-khoan" component={Dieukhoan} />
						<Route exact path="/vip" component={Vip} /> */}
						<Route exact path="/nhiem-vu" component={Mission} />
						<Route exact path="/list_game" component={list_game} />
						<Route exact path="/minigame" component={minigame} />
						{/* <Route exact path="/inbox" component={Inbox} />
						<Route exact path="/profile" component={Profile} />    
						<Route exact path="/article" component={Article} />
						<Route exact path="/article_detail/:id" component={Article_detail} /> */}
						{/* <Route exact path="/checkin" component={Checkin} /> */}
						{/* <Route exact path="/luckydetail" component={Lucky_detail} />
						<Route exact path="/luckyitembonus" component={Lucky_Item} />
						<Route exact path="/luckyhistory" component={Lucky_History} />
						<Route exact path="/luckybuyturn" component={Lucky_BuyTurn} />
						<Route exact path="/luckylive" component={Lucky_Live} /> */}
						{/* <Route exact path="/giftcodeplugin" component={Giftcode_plugin} />
						<Route exact path="/giftcodepluginlogin" component={Giftcode_plugin_login} />
						<Route exact path="/phonecard" component={Phone_card} />
						<Route exact path="/chongame" component={SelectGame} />
						<Route exact path="/chitiet" component={Coin} />
						<Route exact path="/doi" component={TypeChangeCoin} />
						<Route exact path="/MCD-trieuhoi" component={EventGame} />
						<Route exact path="/MCD-trieuhoi/:id" component={EventGame} />
						<Route exact path="/Su-Kien-Truy-Kich-Bung-No" component={GameTruyKich} />
						<Route exact path="/Su-Kien-Truy-Kich-Bung-No/:id" component={GameTruyKich} /> */}
					</main>
				</div>
			</div>
		)
	}
}


export default App;