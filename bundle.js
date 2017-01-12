require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var GoogleApi = function GoogleApi(opts) {
  opts = opts || {};

  var apiKey = opts.apiKey;
  var libraries = opts.libraries || [];
  var client = opts.client;
  var URL = 'https://maps.googleapis.com/maps/api/js';

  var googleVersion = '3.25';
  var script = null;
  var google = window.google = null;
  var loading = false;
  var channel = null;
  var language = null;
  var region = null;

  var onLoadEvents = [];

  var url = function url() {
    var url = URL;
    var params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region
    };

    var paramStr = Object.keys(params).filter(function (k) {
      return !!params[k];
    }).map(function (k) {
      return k + '=' + params[k];
    }).join('&');

    return url + '?' + paramStr;
  };

  return url();
};

exports.GoogleApi = GoogleApi;
exports['default'] = GoogleApi;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ScriptCache = require('./ScriptCache');

var _ScriptCache2 = _interopRequireDefault(_ScriptCache);

var _GoogleApi = require('./GoogleApi');

var _GoogleApi2 = _interopRequireDefault(_GoogleApi);

var defaultMapConfig = {};
var wrapper = function wrapper(options) {
  return function (WrappedComponent) {
    var apiKey = options.apiKey;
    var libraries = options.libraries || ['places'];

    var Wrapper = (function (_React$Component) {
      _inherits(Wrapper, _React$Component);

      function Wrapper(props, context) {
        _classCallCheck(this, Wrapper);

        _get(Object.getPrototypeOf(Wrapper.prototype), 'constructor', this).call(this, props, context);

        this.state = {
          loaded: false,
          map: null,
          google: null
        };
      }

      _createClass(Wrapper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this = this;

          var refs = this.refs;
          this.scriptCache.google.onLoad(function (err, tag) {
            var maps = window.google.maps;
            var props = _extends({}, _this.props, {
              loaded: _this.state.loaded
            });

            var mapRef = refs.map;

            var node = _reactDom2['default'].findDOMNode(mapRef);
            var center = new maps.LatLng(_this.props.lat, _this.props.lng);

            var mapConfig = _extends({}, defaultMapConfig, {
              center: center, zoom: _this.props.zoom
            });

            _this.map = new maps.Map(node, mapConfig);

            _this.setState({
              loaded: true,
              map: _this.map,
              google: window.google
            });
          });
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {

          this.scriptCache = (0, _ScriptCache2['default'])({
            google: (0, _GoogleApi2['default'])({
              apiKey: apiKey,
              libraries: ['drawing']
            })
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var props = _extends({}, this.props, {
            loaded: this.state.loaded,
            map: this.state.map,
            google: this.state.google,
            mapComponent: this.refs.map
          });
          return _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(WrappedComponent, props),
            _react2['default'].createElement('div', { ref: 'map' })
          );
        }
      }]);

      return Wrapper;
    })(_react2['default'].Component);

    return Wrapper;
  };
};

exports.wrapper = wrapper;
exports['default'] = wrapper;

},{"./GoogleApi":2,"./ScriptCache":4,"react":undefined,"react-dom":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var counter = 0;
var scriptMap = new Map();

var ScriptCache = (function (global) {
  return function ScriptCache(scripts) {
    var Cache = {};

    Cache._onLoad = function (key) {
      return function (cb) {
        var stored = scriptMap.get(key);
        if (stored) {
          stored.promise.then(function () {
            stored.error ? cb(stored.error) : cb(null, stored);
          });
        } else {
          // TODO:
        }
      };
    };

    Cache._scriptTag = function (key, src) {
      if (!scriptMap.has(key)) {
        (function () {
          var tag = document.createElement('script');
          var promise = new Promise(function (resolve, reject) {
            var resolved = false,
                errored = false,
                body = document.getElementsByTagName('body')[0];

            tag.type = 'text/javascript';
            tag.async = false; // Load in order

            var cbName = 'loaderCB' + counter++ + Date.now();
            var cb = undefined;

            var cleanup = function cleanup() {
              if (global[cbName] && typeof global[cbName] === 'function') {
                global[cbName] = null;
              }
            };
            var handleResult = function handleResult(state) {
              return function (evt) {
                var stored = scriptMap.get(key);
                if (state === 'loaded') {
                  stored.resolved = true;
                  resolve(src);
                  // stored.handlers.forEach(h => h.call(null, stored))
                  // stored.handlers = []
                } else if (state === 'error') {
                    stored.errored = true;
                    // stored.handlers.forEach(h => h.call(null, stored))
                    // stored.handlers = [];
                    reject(evt);
                  }
                cleanup();
              };
            };

            tag.onload = handleResult('loaded');
            tag.onerror = handleResult('error');
            tag.onreadystatechange = function () {
              handleResult(tag.readyState);
            };

            // Pick off callback, if there is one
            if (src.match(/callback=CALLBACK_NAME/)) {
              src = src.replace(/(callback=)[^\&]+/, '$1' + cbName);
              cb = window[cbName] = tag.onload;
            } else {
              tag.addEventListener('load', tag.onload);
            }
            tag.addEventListener('error', tag.onerror);

            tag.src = src;
            body.appendChild(tag);
            return tag;
          });
          var initialState = {
            loaded: false,
            error: false,
            promise: promise,
            tag: tag
          };
          scriptMap.set(key, initialState);
        })();
      }
      return scriptMap.get(key);
    };

    Object.keys(scripts).forEach(function (key) {
      var script = scripts[key];
      Cache[key] = {
        tag: Cache._scriptTag(key, script),
        onLoad: Cache._onLoad(key)
      };
    });

    return Cache;
  };
})(window);

exports.ScriptCache = ScriptCache;
exports['default'] = ScriptCache;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pointInPolygon = require('point-in-polygon');

var _pointInPolygon2 = _interopRequireDefault(_pointInPolygon);

var polygon = [];
var markersArray = [];
var insideMarkers = [];

var Map = (function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map() {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this);
    this.state = {
      drawMode: false
    };
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadMap();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.google !== this.props.google) {
        this.loadMap();
        if (this.props.drawMode) {
          this.drawPolyline.bind(this)();
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      var google = this.props.google;
      if (nextProps.drawMode && this.props.google) {
        this.drawPolyline.bind(this)();
      }
    }
  }, {
    key: 'drawPolyline',
    value: function drawPolyline() {
      var google = this.props.google;
      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: this.props.polygonOptions
      });
      drawingManager.setMap(this.map);

      //======================================================
      // Filter elements outside Polygon
      //======================================================

      google.maps.event.addListener(drawingManager, 'polygoncomplete', (function (event) {
        event.getPath().forEach(function (coord) {
          polygon.push([coord.lat(), coord.lng()]);
        });
        for (var i = 0; i < markersArray.length; i++) {
          var x = markersArray[i].getPosition().lat();
          var y = markersArray[i].getPosition().lng();
          if (!(0, _pointInPolygon2['default'])([x, y], polygon)) {
            markersArray[i].setMap(null);
          } else {
            insideMarkers.push(markersArray[i]);
          }
        }
        if (this.props.handleReturnedMarkers) {
          this.props.handleReturnedMarkers(insideMarkers);
        }
      }).bind(this));
    }
  }, {
    key: 'loadMap',
    value: function loadMap() {
      var _this = this;

      if (this.props && this.props.google) {
        (function () {
          // google is available
          var google = _this.props.google;

          var maps = google.maps;

          var mapRef = _this.refs.map;
          var node = _reactDom2['default'].findDOMNode(mapRef);
          var mapConfig = _this.props.mapConfig;
          var zoom = mapConfig.zoom;
          var lat = mapConfig.lat;
          var lng = mapConfig.lng;

          var center = new maps.LatLng(lat, lng);
          var mapConfiguration = _extends({}, {
            center: center,
            zoom: zoom
          });
          _this.map = new maps.Map(node, mapConfiguration);
          //======================================================
          // DISPLAY MARKERS IN MAP
          //======================================================
          _this.props.markers.forEach(function (flag) {
            var markerProps = _extends({}, flag, {
              position: new google.maps.LatLng(flag.latLng.lng, flag.latLng.lat),
              map: _this.map });
            var marker = new maps.Marker(markerProps);
            if (marker.onMarkerClick) {
              google.maps.event.addListener(marker, 'click', function (event) {
                marker.onMarkerClick(marker, event);
              });
            }
            markersArray.push(marker);
          });
        })();
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2['default'].createElement(
        'div',
        {
          style: this.props.mapStyle,
          ref: 'map' },
        'Loading map...'
      );
    }
  }]);

  return Map;
})(_react2['default'].Component);

;

exports['default'] = Map;
module.exports = exports['default'];

},{"point-in-polygon":1,"react":undefined,"react-dom":undefined}],"react-gmap-filter":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ApiComponentsScriptCache = require('./ApiComponents/ScriptCache');

var _ApiComponentsScriptCache2 = _interopRequireDefault(_ApiComponentsScriptCache);

var _ApiComponentsGoogleApi = require('./ApiComponents/GoogleApi');

var _ApiComponentsGoogleApi2 = _interopRequireDefault(_ApiComponentsGoogleApi);

var _ApiComponentsGoogleApiComponent = require('./ApiComponents/GoogleApiComponent');

var _ApiComponentsGoogleApiComponent2 = _interopRequireDefault(_ApiComponentsGoogleApiComponent);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var ApiKey = undefined;

var GoogleMapPolygonFilter = (function (_React$Component) {
	_inherits(GoogleMapPolygonFilter, _React$Component);

	function GoogleMapPolygonFilter() {
		_classCallCheck(this, GoogleMapPolygonFilter);

		_get(Object.getPrototypeOf(GoogleMapPolygonFilter.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(GoogleMapPolygonFilter, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			ApiKey = this.props.apiKey;
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(_Map2['default'], {
					google: this.props.google,
					drawMode: this.props.drawMode,
					markers: this.props.markers,
					mapConfig: this.props.mapConfig,
					mapStyle: this.props.mapStyle,
					polygonOptions: this.props.polygonOptions,
					handleReturnedMarkers: this.props.handleReturnedMarkers
				})
			);
		}
	}]);

	return GoogleMapPolygonFilter;
})(_react2['default'].Component);

GoogleMapPolygonFilter.propTypes = {
	apiKey: _react2['default'].PropTypes.string.isRequired,
	drawMode: _react2['default'].PropTypes.bool,
	markers: _react2['default'].PropTypes.array,
	mapConfig: _react2['default'].PropTypes.object,
	polygonOptions: _react2['default'].PropTypes.object,
	google: _react2['default'].PropTypes.object, //is provided by wrapper
	mapStyle: _react2['default'].PropTypes.object,
	handleReturnedMarkers: _react2['default'].PropTypes.func
};
GoogleMapPolygonFilter.defaultProps = {
	drawMode: true,
	mapConfig: {
		zoom: 14,
		lat: 41.384279176844764,
		lng: 2.1526336669921875

	},
	mapStyle: {
		height: '600px',
		width: '600px'
	},
	polygonOptions: {
		fillColor: '#455A64',
		fillOpacity: 0.3,
		strokeColor: '#455A64',
		strokeWeight: 3,
		clickable: true,
		editable: true,
		zIndex: 1
	},
	markers: []
};

exports['default'] = (0, _ApiComponentsGoogleApiComponent2['default'])({
	apiKey: ApiKey
})(GoogleMapPolygonFilter);
module.exports = exports['default'];

},{"./ApiComponents/GoogleApi":2,"./ApiComponents/GoogleApiComponent":3,"./ApiComponents/ScriptCache":4,"./Map":5,"react":undefined}]},{},[]);
