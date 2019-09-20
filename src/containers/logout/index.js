import React from 'react'


class Logout extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount(){
		localStorage.removeItem("user");
	}

	componentDidMount() {

	}
	render() {
		
		return (
			<div>
			</div>
		)
	}
}

export default Logout