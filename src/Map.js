import React from 'react';


export class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    // ...
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
}
