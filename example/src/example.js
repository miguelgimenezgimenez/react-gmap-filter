var React = require('react');
var ReactDOM = require('react-dom');
var GoogleMapPolygonFilter = require('react-gmap-filter');

var App = React.createClass({
	render () {
		return (
			<div>
				<GoogleMapPolygonFilter />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
