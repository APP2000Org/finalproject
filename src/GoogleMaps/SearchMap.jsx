import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const _ = require("lodash");
var lat = 0;
var lng = 0;
var adresse = "";

function handleClick(event) { lat = event.latLng.lat(), lng = event.latLng.lng()}

function handleChange(){
  alert("Dette er en test"); 
  console.log("Dette er inni bli med click");
}

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD0LKJzpEieP6N_k9SlZzIjzApLu5wKk84",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentDidUpdate() {
      console.log(this.state.center.lat(),this.state.center.lng());
      console.log(adresse);
    },
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>


  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
        onChange={(e) => {
        adresse = e.target.value;
        console.log(adresse);
        
      }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} 
      position={marker.position} 
     
      onClick={(e) => {
        handleClick(e)
        console.log(lat, lng)
        
      }}/>
    )}
  </GoogleMap>
);

<MapWithASearchBox />

export default function MapSearch(props) {
  //Her hentes tabellen fra App og skrives ut her inne i maps. Du kan bruke denne tabellen som du vil.
  //Dersom eventer-tabellen i App endres, så vil eventer tabellen oppdateres automatisk her inne i maps.

  console.log(adresse);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWithASearchBox
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD0LKJzpEieP6N_k9SlZzIjzApLu5wKk84"
        }
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}