import React, { Component } from "react";
import { compose, withProps } from "recompose";
import { G_API_URL } from "./map/constants";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);

    let defaultLat = 23.21632;
    let defaultLng = 23.21632;

    this.state = {
      defaultZoom: 12,
      map: null,
      center: {
        lat: props.lat || defaultLat,
        lng: props.lng || defaultLng  
      }
    };
  }

  componentDidMount(){
    console.log(this.props)
  }


  fitBounds = () => {
    // const bounds = new window.google.maps.LatLngBounds();
    // this.state.locations.map((place, index) => {
    //   bounds.extend(place)
    //   return index;
    // })
    // this.mapRef.fitBounds(bounds)
  }

  render() {
    const defaultMapOptions = {
      fullscreenControl: false,
      mapTypeControl: false
    };

    return (
      <div>
      
        <GoogleMap
          ref={ref => this.mapRef = ref}
          onTilesLoaded={this.fitBounds}
          defaultZoom={this.state.defaultZoom}
          center={this.state.center} 
          defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
          defaultOptions={defaultMapOptions}
          disableDefaultUI={true}
        >
            <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
        
        </GoogleMap>  
      
      </div>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, marginRight: -8 }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Map);