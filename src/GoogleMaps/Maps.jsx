/* Av Magnus Anfinnsen - 225259 
Dette er Google maps API'n som rendres ut i App.
*/

import React, { useState } from "react";
import EventSide from '../popUp/EventSide.jsx';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";



export default function Maps(props) {


  function Map() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [hoveredEvent, setHoveredEvent] = useState(null);
  
 const setNull = () =>{
    setSelectedEvent(null)
  }
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{
          lat: 59.415326,
          lng: 9.0672
        }}
      >
        {props.tabell.map(event => (

          <Marker
            key={event.ENr}
            position={{
              lat: parseFloat(event.lat),
              lng: parseFloat(event.lng)
            }}
            onClick={() => {
              setSelectedEvent(event);
            }}

            onMouseOver={() => {
              if (setHoveredEvent != null)
              setHoveredEvent(event)}}
  
            onMouseOut={() =>  {

              setHoveredEvent(null)}}
  

            icon={{
              url: "/iconer/" + event.Kategori + ".png",
              scaledSize: new window.google.maps.Size(25,25)
            }}
          />
        ))}


        {hoveredEvent && (
          
          
          <InfoWindow
            
            position={{
              lat: parseFloat(hoveredEvent.lat)+ 0.007,
              lng: parseFloat(hoveredEvent.lng)
            }}

  

          >
            <div>
              <h2> {hoveredEvent.Tittel} </h2>
            </div>
          </InfoWindow>
        )}
  
        {selectedEvent && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedEvent(null);
            }}
            position={{
              lat: parseFloat(selectedEvent.lat),
              lng: parseFloat(selectedEvent.lng)
            }}
          >
            <div>
              <EventSide
              info = {[selectedEvent.ENr,selectedEvent.ByNavn,selectedEvent.Brukere_Bnr,selectedEvent.Tittel,
                      selectedEvent.FraDato,selectedEvent.Beskrivelse,selectedEvent.Kategori,selectedEvent.frontBildeAdresse,
                      selectedEvent.antallPåmeldte,selectedEvent.TilDato,selectedEvent.Adresse, selectedEvent.Klokkeslett,
                      ]}
              innloggetBruker = {props.innloggetBruker}
             lukkKart = {setNull}
             loggUt = {props.loggUt}
                      />
             
            </div>
          </InfoWindow>

          
        )}
        

      </GoogleMap>
    );
  }
  
  const MapWrapped = withScriptjs(withGoogleMap(Map));
  //Her hentes tabellen fra App og skrives ut her inne i maps. Du kan bruke denne tabellen som du vil.
  //Dersom eventer-tabellen i App endres, så vil eventer tabellen oppdateres automatisk her inne i maps.

  return (
    
    <div style={{ width: "97vw", height: "70vh", margin:" 0 auto"}}>
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
