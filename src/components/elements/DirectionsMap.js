import React, { Component } from "react";
import { compose, withProps } from "recompose";
import DirectionsRenderComponent from "./map/DirectionsRenderComponent";
import { G_API_URL } from "./map/constants";
import DummyLocations from "./map/dummyLocations";
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");

class DirectionsMap extends Component {
  constructor(props) {
    super(props);

    let defaultLat = 23.21632;
    let defaultLng = 23.21632;

    this.state = {
      defaultZoom: 12,
      map: null,
      start: props.startCoords,
      end: props.endCoords,
      locations: [props.startCoords, props.endCoords],
      center: {
        lat: ((props.startCoords.lat != null) ? props.startCoords.lat : defaultLat),
        lng: ((props.startCoords.lng != null) ? props.startCoords.lng : defaultLng),  
      }
    };
  }

  componentDidMount(){
    console.log(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    this.fitBounds()
  }


  fitBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    [this.props.startCoords, this.props.endCoords].map((place, index) => {
        bounds.extend(place)
        return index;
      })
    // this.state.locations.map((place, index) => {
    //   bounds.extend(place)
    //   return index;
    // })
    this.mapRef.fitBounds(bounds)
  }

  render() {
    const defaultMapOptions = {
      fullscreenControl: false,
      mapTypeControl: false
    };

    let Directions = DummyLocations.map((elem, index) => {
          return (
            <DirectionsRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={this.props.startCoords}
              to={this.props.endCoords} 
            />
          );
        });

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

        <div>{Directions}</div>
        
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
)(DirectionsMap);