var React = require('react');
var ReactDOM = require('react-dom');
var GoogleMapPolygonFilter = require('react-gmap-filter');

const markers = [
	{latLng:{lat:2.13815342634916,lng:41.39485570794}},
	{latLng:{lat:2.13815342634236,lng:41.3948557079626}},
	{latLng:{lat:2.13815342634946,lng:41.3948557079436}},
	{latLng:{lat:2.13815342634966,lng:41.3948557079429}},
	{latLng:{lat:2.13815342634928,lng:41.394855707948}},  {latLng:{lat:2.143278121948242 ,lng:41.38962400121987}},
	{latLng:{lat:2.1582984924316406,lng: 41.38904446318836}},
	{latLng:{lat:2.1575260162353516,lng: 41.39586980544921}},
	{latLng:{lat:2.162332534790039 ,lng:41.397801375978204}},
	{latLng:{lat:2.154865264892578 ,lng:41.38576031676253}},
	{latLng:{lat:2.142505645751953 ,lng:41.38344199588044}},
	{latLng:{lat:2.1316909790039062,lng: 41.40044109620138}},
	{latLng:{lat:2.130146026611328 ,lng:41.40308070920773}},
	{latLng:{lat:2.1413040161132812,lng: 41.40346698504464}},
	{latLng:{lat:2.151517868041992 ,lng:41.40314508867334}},
	{latLng:{lat:2.175722122192383 ,lng:41.40810211598549}},
	{latLng:{lat:2.163105010986328 ,lng:41.40990457761008}},
	{latLng:{lat:2.1581268310546875,lng: 41.4132518736699}},
	{latLng:{lat:2.185077667236328 ,lng:41.412350695543616}},
	{latLng:{lat:2.201986312866211 ,lng:41.40771586770284}},
	{latLng:{lat:2.1940040588378906,lng: 41.412930025774244}},
	{latLng:{lat:2.1955490112304688,lng: 41.3962561241472}},
	{latLng:{lat:2.164735794067383 ,lng:41.378096663330936}},
	{latLng:{lat:2.1529769897460938,lng: 41.381832002193605}},
	{latLng:{lat:2.1443939208984375,lng: 41.38782097704566}},
	{latLng:{lat:2.1430206298828125,lng: 41.38086598684855}},
	{latLng:{lat:2.132120132446289 ,lng:41.3676623390089}},
	{latLng:{lat:2.123537063598633 ,lng:41.36160708721221}},
	{latLng:{lat:2.090578079223633 ,lng:41.359159059527066}},
	{latLng:{lat:2.1104907989501953,lng: 41.358257131378124}},
	{latLng:{lat:2.140531539916992 ,lng:41.35845040274797}},
	{latLng:{lat:2.161130905151367 ,lng:41.36843530931768}},
	{latLng:{lat:2.156238555908203 ,lng:41.372042382668596}}
]

class App extends React.Component {
	constructor () {
		super();
		this.state = {
			filter:false,

		};
	}
	toggleDraw(){
		this.setState({
			filter:!this.state.filter ,

		});

	}

	render() {
		return (<div>
			<button onClick={this.toggleDraw.bind(this)}>toggleDraw</button>
			<div className="App">

				<div >
				</div>

					<GoogleMapPolygonFilter
						toggleDraw={this.state.filter}
						markers={markers}
						apiKey='AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
					/>
			</div>
		</div>
	);
}
}

ReactDOM.render(<App />, document.getElementById('app'));
