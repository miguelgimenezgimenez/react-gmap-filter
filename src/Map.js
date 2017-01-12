import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import isInside from 'point-in-polygon';

const polygon=[];
const markersArray=[];
const insideMarkers=[];


class Map extends React.Component {
  constructor () {
    super();
    this.state = {
      drawMode:false,
    };
  }
  componentDidMount() {
    this.loadMap();

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
      if (this.props.drawMode) {
        this.drawPolyline.bind(this)();
      }
    }
  }

  componentWillReceiveProps(nextProps) {

    const google = this.props.google;
    if (nextProps.drawMode && this.props.google) {
      this.drawPolyline.bind(this)();
    }
  }

  drawPolyline(){
    const google = this.props.google;
    let drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode:             google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions:this.props.polygonOptions
    });
    drawingManager.setMap(this.map);

//======================================================
// Filter elements outside Polygon
//======================================================

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
      event.getPath().forEach(coord=>{
        polygon.push([coord.lat(),coord.lng()]);
      })
      for (let i = 0; i < markersArray.length; i++) {
        const x = markersArray[i].getPosition().lat();
        const y = markersArray[i].getPosition().lng();
        if (!isInside([x,y],polygon)) {
          markersArray[i].setMap(null)
        } else {
          insideMarkers.push(markersArray[i]);
        }
      }
      if (this.props.handleReturnedMarkers) {
        this.props.handleReturnedMarkers(insideMarkers);
      }

    }.bind(this))
  }


  loadMap(){
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const {mapConfig}=this.props;
      let {zoom} = mapConfig;
      let {lat} = mapConfig;
      let {lng} = mapConfig;
      const center = new maps.LatLng(lat, lng);
      const mapConfiguration = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfiguration);
//======================================================
// DISPLAY MARKERS IN MAP
//======================================================
      this.props.markers.forEach((flag)=>{
        const markerProps=({
          ...flag,
          position: new google.maps.LatLng(flag.latLng.lng,flag.latLng.lat),
          map: this.map,})
          const marker = new maps.Marker(markerProps);
          if (marker.onMarkerClick) {
            google.maps.event.addListener(marker,'click',(event)=>{
              marker.onMarkerClick(marker,event);
            })
          }
          markersArray.push(marker);
        })
      }
    }

    render() {

      return (
        <div
          style={this.props.mapStyle}
          ref='map'>
          Loading map...
        </div>
      )
    }
  };


  export default Map;
