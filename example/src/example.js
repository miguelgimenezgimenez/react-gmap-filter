var React = require('react');
var ReactDOM = require('react-dom');
var GoogleMapPolygonFilter = require('react-gmap-filter');


class App extends React.Component {
	constructor () {
		super();
		this.state = {
			drawMode:false,
			activeMarkers: [],
		};
	}
	onMarkerClick(marker,e){
		console.log(marker);
		this.setState({
			activeMarkers : [marker]
		});
	}
	renderMarkerInfo() {
		if (this.state.activeMarkers) {
			return this.state.activeMarkers.map((marker,i)=>(
				<div key={`marker${i}`}>
					{marker.label}
					{marker.info}
				</div>)
			)
		}
	}

	handleReturnedMarkers(markers) {
		this.setState({
			activeMarkers: markers
		});
	}
	toggleDraw(){
		this.setState({
			drawMode:!this.state.drawMode ,
		});
	}

	render() {
		const markers = [
			{
				icon:'/beergarden.png',
				info:'beer garden',
				onMarkerClick:this.onMarkerClick.bind(this),
				title:'hello',
				latLng:{lat:2.13815342634916,lng:41.39485570794}
			},

			{
				icon:'/dance_class.png',
				info:'dance class',
				latLng:{lat:2.1575260162353516,lng: 41.39586980544921}
			},

			{
				icon:'/dance_class.png',
				info:'dance class',
				latLng:{lat:2.162332534790039 ,lng:41.397801375978204}
			},

			{
				icon:'/dance_class.png',
				info:'dance class',
				latLng:{lat:2.154865264892578 ,lng:41.38576031676253}
			},

			{
				icon:'/gay-female.png',
				info:'lesbian party',
				latLng:{lat:2.142505645751953 ,lng:41.38344199588044}
			},
			{
				icon:'/gay-female.png',
				info:'lesbian party',
				latLng:
				{lat:2.1316909790039062,lng: 41.40044109620138}
			},
			{
				icon:'/gay-male.png',
				info:'gay party',
				latLng:
				{lat:2.130146026611328 ,lng:41.40308070920773}
			},
			{
				icon:'/gay-male.png',
				info:'gay party',
				latLng:
				{lat:2.1413040161132812,lng: 41.40346698504464}
			},
		]



		return (<div>
			<button onClick={this.toggleDraw.bind(this)}>toggleDraw</button>
			<div className="App">
				<div className="App-header">
					<h2>Welcome to React</h2>
				</div>
				<GoogleMapPolygonFilter
					drawMode={this.state.drawMode}
					markers={markers}
					apiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
					handleReturnedMarkers={this.handleReturnedMarkers.bind(this)}
				/>
			</div>
			<h1>{this.renderMarkerInfo.bind(this)()}</h1>
		</div>
	);
}
}

ReactDOM.render(<App />, document.getElementById('app'));
