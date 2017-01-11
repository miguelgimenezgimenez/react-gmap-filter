import React, { Component } from 'react'
import cache from './ApiComponents/ScriptCache';

import GoogleApi from './ApiComponents/GoogleApi';
import GoogleApiComponent from './ApiComponents/GoogleApiComponent';
import Map from './Map';


let ApiKey;


class GoogleMapPolygonFilter extends React.Component{

	componentWillMount(){
		ApiKey=this.props.apiKey;
	}

	render () {

		return (
			<div >
				<Map
					google={this.props.google}
					toggleDraw={this.props.toggleDraw}
					markers={this.props.markers}
				/>
			</div>
		)
	}
}

export default GoogleApiComponent({
	apiKey: ApiKey
})(GoogleMapPolygonFilter)
