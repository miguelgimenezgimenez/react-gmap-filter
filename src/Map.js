import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import isInside from './pointInPoly';

const polygon=[];
const markersArray=[];

class Map extends React.Component {
  componentDidMount() {
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentWillReceiveProps(nextProps) {
    const google = this.props.google;


    if (nextProps.toggleDraw) {
      this.drawPolyline.bind(this)();
    }
  }


  renderMarkers(markers){

  }

  drawPolyline(){
    const google = this.props.google;
    let drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode:             google.maps.drawing.OverlayType.POLYGON,

      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE,
        ]
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
      }
    });
    drawingManager.setMap(this.map);
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
      event.getPath().forEach(coord=>{
        polygon.push([coord.lat(),coord.lng()]);
      })
      for (let i = 0; i < markersArray.length; i++) {
        console.log(markersArray[i].getPosition().lat());
        const x = markersArray[i].getPosition().lat();
        const y = markersArray[i].getPosition().lng();
        if (!isInside([x,y],polygon)) {
          markersArray[i].setMap(null)
        }
      }
    })
  }


  loadMap(){
    if (this.props && this.props.google) {
      // google is available
      console.log(this.props);
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 41.384279176844764;
      let lng = 2.1526336669921875;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      console.log(maps);
      this.props.markers.forEach((flag)=>{
        const marker = new maps.Marker({
          position: new google.maps.LatLng(flag.latLng.lng,flag.latLng.lat),
          map: this.map,
        });
        markersArray.push(marker);
      })
    }
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div
        style={style}
        ref='map'>
        Loading map...
      </div>
    )
  }
};


export default Map;
