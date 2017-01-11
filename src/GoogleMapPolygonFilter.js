import React, { PropTypes } from 'react'
import cache from './ApiComponents/ScriptCache';

import GoogleApi from './ApiComponents/GoogleApi';

let ApiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc';


const GoogleMapPolygonFilter = React.createClass({
	componentDidMount: function() {
		console.log(window.google);
		this.scriptCache.google.onLoad((err, tag) => {
			const maps = window.google.maps;
			const props = Object.assign({}, this.props, {
				loaded: this.state.loaded
			});

			const mapRef = refs.map;

			const node = ReactDOM.findDOMNode(mapRef);
			let center = new maps.LatLng(this.props.lat, this.props.lng)

			let mapConfig = Object.assign({}, defaultMapConfig, {
				center, zoom: this.props.zoom
			})

			this.map = new maps.Map(node, mapConfig);

			this.setState({
				loaded: true,
				map: this.map,
				google: window.google
			})
		});
	},
componentWillMount: function() {
	this.scriptCache = cache({
		google: GoogleApi({
			apiKey: ApiKey,
		 	libraries:['places'],

		})
	});
	console.log(GoogleApi({apiKey:ApiKey}));
	console.log(this.scriptCache);
},

	render () {
		return (
	   <div>GMAPS</div>
		)
	}
})

export default GoogleMapPolygonFilter
