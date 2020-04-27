import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import EventListe from './eventListe.jsx';
import axios from 'axios';
import ButtonAppBar from './NavigasjonBar.jsx'
import Grid from '@material-ui/core/Grid';
import Maps from './GoogleMaps/Maps.jsx';
import MenuTabs from './popUp/MenuTabs.jsx';
import ProfilSide from './popUp/ProfilSide.jsx';

class App extends Component{

state = {
  innloggetBrukerInfo: [true,"Chris",5], //Infoen som lagres om en innlogget bruker. Er false dersom ikke innlogget. 
text: "",
respons: "",
eventer: [],
kriterieListe: ['','',''], //Søkekriterie liste. index 0=Dato, index 1=by, index 2 = kategori
søkeTeksten: "",
påmeldtListe: [],
}

settKriterieListe (liste) {
    this.setState({kriterieListe:liste}); // !!!!!!!!!!!!!!!!! FJERN FUNKER IKKE MED EN GANG PGA setState ER FORSINKET!!!!!!!!!!!!!!!!

let alleKriterier = this.omgjørTilSql(); 

//console.log("Søkekriteriene: " + this.state.søkeTeksten + " og " + alleKriterier);
this.søkeFeltSøk('søkFeltSkriv','','',this.state.søkeTeksten,alleKriterier);
  }

testKlikk = () =>{
  //this.hentPåmeldtListe('søkEtter','påmeldte','Brukere_Bnr',this.state.innloggetBrukerInfo[2],''); 
  console.log(this.state.eventer);
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.kriterieListe !== this.state.kriterieListe) {
    let alleKriterier = this.omgjørTilSql(); 
    this.søkeFeltSøk('søkFeltSkriv','','',this.state.søkeTeksten,alleKriterier);
  }

  if (prevState.innloggetBrukerInfo !== this.state.innloggetBrukerInfo) {
  //NOE KAN SKJER HER ETTER AT BRUKER HAR LOGGET INN
  }
}

hentPåmeldtListe = (funksjonsnavn, tabell, kollonen, verdien, where) => {
  axios({
    method: 'get',
    url: 'https://boeventsphp.000webhostapp.com/index.php', 
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
console.log(res.data);
})
  .catch(err => console.error(err))
};

omgjørTilSql = () =>{
  let alleKriterier = ''; 

if(this.state.kriterieListe[0] != '')
  alleKriterier += " AND FraDato='" + this.state.kriterieListe[0] + "'";  
  if(this.state.kriterieListe[1] != '')
  alleKriterier += " AND ByNavn = '" + this.state.kriterieListe[1] + "'";  
  if(this.state.kriterieListe[2] != '')
  alleKriterier += " AND Kategori = '" + this.state.kriterieListe[2] + "'"; 

  return alleKriterier; 
}

søkeFeltSøk = (funksjonsnavn, tabell, kollonen, verdien, where) => {
  axios({
    method: 'get',
    url: 'https://boeventsphp.000webhostapp.com/index.php', 
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
    url: 'https://boeventsphp.000webhostapp.com/index.php',  
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
console.log(res.data);
})
  .catch(err => console.error(err))
};

/*
sjekkOmInnlogget = ()=> {
  axios({
    method: 'get',
    url: 'http://localhost/sessionSjekk.php', 
 timeout: 5000
})
  .then(res =>{
this.setState({innloggetBrukerInfo: res.data}); 
console.log("Dette er sjekk innlogging: " + res.data);
console.log(res);
})
  .catch(err => console.error(err))
};
*/
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
  //this.sjekkOmInnlogget(); 
  this.skrivUtAlt('skrivUtAlt','arrangement','','',''); 
  //LEGG INN EN AXIOS SJEKK PÅ OM EN BRUKER ER LOGGET INN OG FÅR INNLOGGINGSVARIABLENE
  //EVENTUELT LEGGE TIL forceUpdate()? Etter at innlogging er godkjent?
}

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
/>

  <Button onClick={this.testKlikk.bind(this)}>TestKnapp</Button>
     <h1 style={{textAlign:"center"}}>Kommende Eventer {this.state.innlogget}</h1>
{this.renderArray2()}


      </div>
     
    );
  }
}

export default App;
