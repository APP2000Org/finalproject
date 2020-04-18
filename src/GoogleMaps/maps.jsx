import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as eventData from "./events-places.json";

function Map() {
  const [selectedEvent, setSelectedEvent] = useState(null);

 
  
  return (
    <GoogleMap 
      defaultZoom={10} 
        defaultCenter={{ 
          lat: 59.415326, 
          lng: 9.0672 
        }}>
          
      {eventData.features.map(event => (
        
        <Marker
          key={event.eventID}
          position={{ 
            lat: event.lat, 
            lng: event.lng 
          }}
          onClick={() => {
            setSelectedEvent(event);
          }}
          icon={{
            url: "/iconer/" + event.genre + ".png",
            scaledSize: new window.google.maps.Size(25, 25)
          }}
         
        />
        
      ))}

      {selectedEvent &&(
        <InfoWindow
        onCloseClick={() => {
          setSelectedEvent(null);
        }}
          position={{ 
            lat: selectedEvent.lat, 
            lng: selectedEvent.lng 
          }}
          
        >
          <div>
            <h2> {selectedEvent.info} </h2>
            <p> {selectedEvent.txt} </p>
          </div>
        </InfoWindow>
      )}
    
    </GoogleMap>
  );
}


const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Maps(props) {
  //Her hentes tabellen fra App og skrives ut her inne i maps. Du kan bruke denne tabellen som du vil.  
  //Dersom eventer-tabellen i App endres, så vil eventer tabellen oppdateres automatisk her inne i maps. 
  return (
    <div style={{ width: "100vw", height: "100vh" }}>

      <MapWrapped
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
