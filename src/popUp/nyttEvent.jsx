/*Av Magnus Anfinnsen - 225259
Og Patrick S. Lorentzen - 151685
Bilde opplastnings mulighet Laget av Sondre Reinholdtsen StudNr:225274
Her kan man lage ett helt nytt event og poste den ut på siden. 
Vi bruker Google maps API for å la bruker velge addresse. Denne adressens kordinater blir lagret*/ 


import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { compose, withProps, lifecycle } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from "react-google-maps/lib/components/places/SearchBox";



export default class NyttEvent extends Component {
  state = {
    sted: "",
    profil_nr: this.props.brukerInfo[2],
    tittel: "",
    fraDato: "",
    tilDato: "",
    beskrivelse: "",
    kategori: "",
    klokkeslett: "",
    respons: "",

    lat: 0,
    lng: 0,
  };

//GOOGLE API
 MapWithASearchBox = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD0LKJzpEieP6N_k9SlZzIjzApLu5wKk84",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
      componentDidUpdate(prevProps, prevState) {
        var sted = "";

        if (this.state.adresse != null) {
          this.state.adresse.map((item) => {
            return(sted = item.formatted_address )
            }
          )}

          var enLat = this.state.center.lat();
          var enLng = this.state.center.lng();
        if (sted !== this.props.nåSted) {
          this.props.hentData(sted, enLat,enLng );
        }       
        
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
            this.state.adresse = refs.searchBox.getPlaces();
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
            const nextCenter =  require("lodash").get(nextMarkers, '0.position', this.state.center);
  
            this.setState({
              center: nextCenter,
              markers: nextMarkers,
            });
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
      defaultOptions={{
       // these following 7 options turn certain controls off see link below
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false
      }}
      
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Adresse"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `11px`,
            marginLeft: '8px',
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
          onChange={(e) => {
  
          
        }}
        />
      </SearchBox>
      {props.markers.map((marker, index) =>
        <Marker key={index} 
        position={marker.position} 
       />
      )}
    </GoogleMap>
  );

//Registreringskjema  blir sendt til php via AXIOS
  registrerEvent = (e) => {
    e.preventDefault();
    
    const params = new FormData();
    params.append("sted", this.state.sted);
    params.append("bnr", this.state.profil_nr);
    params.append("Tittel", this.state.tittel);
    params.append("FraDato", this.state.fraDato);
    params.append("Beskrivelse", this.state.beskrivelse);
    params.append("Kategori", this.state.kategori);
    //params.append(
   //   "frontBildeAdresse",
   //   this.state.selectedFile,
   // );
    params.append("TilDato", this.state.tilDato);
    params.append("Klokkeslett", this.state.klokkeslett);
    params.append("lat", this.state.lat);
    params.append("lng", this.state.lng);
    axios
      .post("https://boeventsphp.000webhostapp.com/nyEvent.php", params)
      .then((res) => {
        //console.log(this.state.selectedFile);
        if (res.data === "") {
          this.setState({ respons: "Event har blitt registrert!" });
        } else this.setState({ respons: "Feil informasjon fylt ut!" });
        
      })
      .catch((err) => {
        this.setState({ respons: "Noe gikk feil! Kontakt administrator!" });
        console.error(err);
      });

  };

  //Håndterer endringer i form
  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Henter kordinater og addresse fra google API koden.
  handlePosisjonData = (søkAddresse, søkLng, søkLat) => {
      this.setState({sted:søkAddresse,lat:søkLat, lng:søkLng});
  }

  //skriver ut skjemaet
  render() {
    const kategori = [
      "Natur",
      "Miljø",
      "Underholdning",
      "Sport",
      "Musikk",
      "Dugnad",
      "Samfunn",
      "Kultur",
      "Handel",
      "Media",
    ];
    return (
      <form style={{ margin: "20px" }}>
        <br />
        <h2>Fyll ut Event skjema</h2>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Tittel"
          name="tittel"
          onChange={this.handleFormChange}
          required
        />{" "}
        <br />
        <br />
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Fra Dato d/m/å"
          name="fraDato"
          type="date"
          onChange={this.handleFormChange}
          required
        />
        <br /> <br />
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Til dato d/m/å"
          name="tilDato"
          type="date"
          onChange={this.handleFormChange}
        />
        <br /> <br />
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Klokkeslett"
          type="time"
          name="klokkeslett"
          onChange={this.handleFormChange}
        />
        <br />
        <br />
        <label value="Beskrivelse">
          Beskrivelse
          <br />
          <TextareaAutosize
            name="beskrivelse"
            value={this.state.beskrivelse}
            rowsMin={4}
            onChange={this.handleFormChange}
          />
        </label>
        <br />
        <label value="Beskrivelse">
          Kategori <br />
          <select
            label="Kategori"
            name="kategori"
            onChange={this.handleFormChange}
          >
            <option value=""></option>
            {kategori.map((kategorinavn) => (
              <option key={kategorinavn} value={kategorinavn}>
                {kategorinavn}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <div style={{ width: "40vw", height: "60vh", margin:0}}>
      <this.MapWithASearchBox
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD0LKJzpEieP6N_k9SlZzIjzApLu5wKk84"
        }
        
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
       hentData = {this.handlePosisjonData}
       nåSted = {this.state.sted}
      />
       </div>
    
        <Button
         onClick={this.registrerEvent}
          value="Submit"
          variant="contained"
          color="primary"
        >
          Post Event{" "}
        </Button>
        <p>{this.state.respons}</p>
      </form>
    );
  }
}