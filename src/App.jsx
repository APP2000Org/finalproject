/*Laget Av: Patrick S. Lorentzen - 151685
og Mikael Wenneck Rønnevik - 226804

Dette er hovedSiden. Også kjent som MainController. Alt som skjer på siden har sin rot her. 
*/
import React, { Component } from 'react';
import EventListe from './eventListe.jsx';
import axios from 'axios';
import ButtonAppBar from './NavigasjonBar.jsx'
import Grid from '@material-ui/core/Grid';
import Maps from './GoogleMaps/Maps.jsx';

class App extends Component{

state = {
  innloggetBrukerInfo: [false,"",0], //Infoen som lagres om en innlogget bruker. Er false dersom ikke innlogget. 
text: "",
respons: "",
eventer: [],
kriterieListe: ['','',''], //Søkekriterie liste. index 0=Dato, index 1=by, index 2 = kategori
søkeTeksten: "",
påmeldtListe: [],
bilde: null
}

settKriterieListe (liste) {
    this.setState({kriterieListe:liste}); 

let alleKriterier = this.omgjørTilSql(); 
this.søkeFeltSøk('søkFeltSkriv','','',this.state.søkeTeksten,alleKriterier);
  }

componentDidUpdate(prevProps, prevState) {
  if (prevState.kriterieListe !== this.state.kriterieListe) {
    let alleKriterier = this.omgjørTilSql(); 
    this.søkeFeltSøk('søkFeltSkriv','','',this.state.søkeTeksten,alleKriterier);
  }
 

}

hentPåmeldtListe = (funksjonsnavn, tabell, kollonen, verdien, where) => {
  axios({
    method: 'get',
    url: 'https://boeventer.no/main.php',
  params: { 
    funksjonsnavn, 
    tabell,
    kollonen,
    verdien,
    where
 }, 
 timeout: 5000
})
  .then(res =>{
this.setState({påmeldtListe: res.data}); 

})
  .catch(err => console.error(err))
};

//Omgjør søkekriterier til sql kode
omgjørTilSql = () =>{
  let alleKriterier = ''; 

if(this.state.kriterieListe[0] !== '')
  alleKriterier += " AND FraDato='" + this.state.kriterieListe[0] + "'";  
  if(this.state.kriterieListe[1] !== '')
  alleKriterier += " AND ByNavn LIKE '% " + this.state.kriterieListe[1] + "%'";  
  if(this.state.kriterieListe[2] !== '')
  alleKriterier += " AND Kategori = '" + this.state.kriterieListe[2] + "'"; 

  return alleKriterier; 
}

//når bruker har valgt søkekriterier blir de sendt til php
søkeFeltSøk = (funksjonsnavn, tabell, kollonen, verdien, where) => {
  axios({
    method: 'get',
    url: 'https://boeventer.no/main.php',
  params: { 
    funksjonsnavn, 
    tabell,
    kollonen,
    verdien,
    where
 }, 
 timeout: 5000
})
  .then(res =>{
this.setState({eventer: res.data}); 
})
  .catch(err => console.error(err))
};

skrivUtAlt = (funksjonsnavn, tabell, kollonen, verdien,where) => {
  axios({
    method: 'get',
    url: 'https://boeventer.no/main.php',
  params: { 
    funksjonsnavn, 
    tabell,
    kollonen,
    verdien,
    where
 }, 
 timeout: 4000
})
  .then(res =>{
this.setState({eventer: res.data}); 
})
  .catch(err => console.error(err))
};

//Sjekker innom session variablene for å se om en bruker er pålogget eller ikke
sjekkOmInnlogget = ()=> {
  axios({
    method: 'get',
    url: 'https://boeventer.no/sessionSjekk.php',
 timeout: 5000
})
  .then(res =>{
this.setState({innloggetBrukerInfo: res.data}); 
console.log("Dette er sjekk innlogging: " + res.data);
console.log(res);
})
  .catch(err => console.error(err))
};

handleSøk = (søkeTekst) => {
  this.setState({søkeTeksten:søkeTekst});

  let alleKriterier = this.omgjørTilSql(); 

  this.søkeFeltSøk('søkFeltSkriv','','',søkeTekst,alleKriterier);
}

loggInn = (brukerTabell) =>{
  this.setState({innloggetBrukerInfo:brukerTabell})
}

loggUt = () =>{
  this.setState({innloggetBrukerInfo:[false,"",0]});
}

componentDidMount = e => {
  this.sjekkOmInnlogget(); 
  this.skrivUtAlt('skrivUtAlt','arrangement','','',''); 
  //LEGG INN EN AXIOS SJEKK PÅ OM EN BRUKER ER LOGGET INN OG FÅR INNLOGGINGSVARIABLENE
}

//Skriv ut alle eventene som er i databasen. Og display dem som boxer under google maps.
renderArray2 = () =>{
  if(this.state.eventer.length > 0){
    return (
      <Grid container alignContent="center" justify="center">
      {this.state.eventer.map((item) => {
      return (
       <Grid key= {item.ENr} style={{margin:10}}>
        <EventListe
        Enr = {item.ENr}
        lagetAv = {item.Brukere_Bnr}
        tittel={item.Tittel}
        sted= {item.ByNavn}
        dato= {item.FraDato}
        tilDato={item.TilDato}
        adresse={item.Adresse}
        klokkeslett={item.Klokkeslett}
        beskrivelse = {item.Beskrivelse}
        frontBilde = {item.frontBildeAdresse}
        antPåmeldte = {item.antallPåmeldte}
        innloggetBruker = {this.state.innloggetBrukerInfo}
        loggUt={this.loggUt}
        />
      </Grid>
        )
    })} </Grid>)
  }else return (<p>Ingen treff!</p>); 
};

//Render ut hele siden og alle dens komponenter.
  render(){
  
    return(
<div>
<ButtonAppBar
loggInnFunksjon={this.loggInn}
loggUt={this.loggUt}
innlogget = {this.state.innloggetBrukerInfo[0]}
BrukerNavn= {this.state.innloggetBrukerInfo[1]}
Bnr = {this.state.innloggetBrukerInfo[2]}
søkeFunksjon = {this.handleSøk}
søkeListe = {this.settKriterieListe.bind(this)}
kriterieListe = {this.state.kriterieListe}
/> 

<Maps
//Denne tabellen sendes fra App til maps. Og kan brukes ved å skrive props. Oppdaterer seg automatisk i forhold til hva som skjer i app.
tabell = {this.state.eventer}
innloggetBruker = {this.state.innloggetBrukerInfo}
loggUt = {this.loggUt}
/>

     <h1 style={{textAlign:"center"}}>Kommende Eventer {this.state.innlogget}</h1>
{this.renderArray2()}


      </div>
     
    );
  }
}

export default App;
