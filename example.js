require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var GoogleMapPolygonFilter = require('react-gmap-filter');

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
		this.state = {
			drawMode: false,
			activeMarkers: []
		};
	}

	_createClass(App, [{
		key: 'onMarkerClick',
		value: function onMarkerClick(marker, e) {
			console.log(marker);
			this.setState({
				activeMarkers: [marker]
			});
		}
	}, {
		key: 'renderMarkerInfo',
		value: function renderMarkerInfo() {
			if (this.state.activeMarkers) {
				return this.state.activeMarkers.map(function (marker, i) {
					return React.createElement(
						'div',
						{ key: 'marker' + i },
						marker.label,
						marker.info
					);
				});
			}
		}
	}, {
		key: 'handleReturnedMarkers',
		value: function handleReturnedMarkers(markers) {
			this.setState({
				activeMarkers: markers
			});
		}
	}, {
		key: 'toggleDraw',
		value: function toggleDraw() {
			this.setState({
				drawMode: !this.state.drawMode
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var markers = [{
				icon: '/beergarden.png',
				info: 'beer garden',
				onMarkerClick: this.onMarkerClick.bind(this),
				title: 'hello',
				latLng: { lat: 2.13815342634916, lng: 41.39485570794 }
			}, {
				icon: '/dance_class.png',
				info: 'dance class',
				latLng: { lat: 2.1575260162353516, lng: 41.39586980544921 }
			}, {
				icon: '/dance_class.png',
				info: 'dance class',
				latLng: { lat: 2.162332534790039, lng: 41.397801375978204 }
			}, {
				icon: '/dance_class.png',
				info: 'dance class',
				latLng: { lat: 2.154865264892578, lng: 41.38576031676253 }
			}, {
				icon: '/gay-female.png',
				info: 'lesbian party',
				latLng: { lat: 2.142505645751953, lng: 41.38344199588044 }
			}, {
				icon: '/gay-female.png',
				info: 'lesbian party',
				latLng: { lat: 2.1316909790039062, lng: 41.40044109620138 }
			}, {
				icon: '/gay-male.png',
				info: 'gay party',
				latLng: { lat: 2.130146026611328, lng: 41.40308070920773 }
			}, {
				icon: '/gay-male.png',
				info: 'gay party',
				latLng: { lat: 2.1413040161132812, lng: 41.40346698504464 }
			}];

			return React.createElement(
				'div',
				null,
				React.createElement(
					'button',
					{ onClick: this.toggleDraw.bind(this) },
					'toggleDraw'
				),
				React.createElement(
					'div',
					{ className: 'App' },
					React.createElement(
						'div',
						{ className: 'App-header' },
						React.createElement(
							'h2',
							null,
							'Welcome to React'
						)
					),
					React.createElement(GoogleMapPolygonFilter, {
						drawMode: this.state.drawMode, //boolean that toggles draw mode (optional)
						markers: markers, // array of objects containing a latLng property with lat and lng properties
						apiKey: 'AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc', //REQUIRED
						handleReturnedMarkers: this.handleReturnedMarkers.bind(this) //Callback fired when polygon is closed
					})
				),
				React.createElement(
					'h1',
					null,
					this.renderMarkerInfo.bind(this)()
				)
			);
		}
	}]);

	return App;
})(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-gmap-filter":undefined}]},{},[1]);
