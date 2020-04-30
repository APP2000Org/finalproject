/*Laget Av Sondre Reinholdtsen StudNr:225274 og
Patrick S. Lorentzen - 151685
På denne siden skriver vi ut all informasjon om en bruker. Venner, lagde events, påmeldte.
Om man er en eier av siden, altså innlogget, så vil man kunne redigere og endre på ting og logge ut */

import React, { Component } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';
import MenuTabs from './MenuTabs.jsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AlertDialog from './AlertDialog.jsx';
import EventSide from './EventSide.jsx';
import NyttEvent from "./nyttEvent.jsx";
import RedigerKomponent from './redigerKomponent.jsx';
import CircularProgress from '@material-ui/core/CircularProgress'; 

export default class ProfilSide extends Component {
  state = {
    text: "",
    respons: "",
    navneListe: [],
    eventer: [],
    påmeldte: [],
    venner: [],
    innloggetBrukerInfo:this.props.innloggetBrukerInfo,
    eierInfo:this.props.eierInfo,
    hallo: ""
  };

  loggUt = () =>{
 this.props.loggUt();

 if(this.props.onClose != null){
 this.props.close();
 }
  }

  //Aktiverer AXIOS som sender til php
  lagdeEvents = () =>{ //EVENT TABELLEN
    this.skrivUtPåmeldteEvents(
      "søkEtter",
      "arrangement",
      "Brukere_Bnr",
      this.state.eierInfo,
      ""
    );
  }

  påmeldteEvents = () =>{ //PÅMELDT TABELLEN
    this.skrivUtPåmeldteEvents(
      "påmeldteSinArrangement",
      this.state.eierInfo,
      "",
      "",
      ""
    );
 
  }

  egneVenner = () =>{
this.skrivUtVenner("vennOgBruker",this.state.eierInfo,
  "",
  "",
  0
  );
  }

  skrivUtProfil = () => {
    this.skrivUtProfilInfo("søkEtter", "brukere", "Bnr", this.state.eierInfo, "");
  }

  //AXIOS KODENE SOM SENDER TIL PHP
  skrivUtProfilInfo = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventer.no/main.php",
      params: {
        funksjonsnavn,
        tabell,
        kollonen,
        verdien,
        where,
      },
      timeout: 5000,
    })
      .then((res) => {
        this.setState({ navneListe: res.data });
      })
      .catch((err) => console.error(err));
  };

  skrivUtPåmeldteEvents = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventer.no/main.php",
      params: {
        funksjonsnavn,
        tabell,
        kollonen,
        verdien,
        where,
      },
      timeout: 5000,
    })
      .then((res) => {
        if(funksjonsnavn === "påmeldteSinArrangement")
        this.setState({ påmeldte: res.data });
        if(tabell === "arrangement")
        this.setState({ eventer: res.data });
      
      })
      .catch((err) => console.error(err));
  };

  skrivUtVenner = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventer.no/main.php",
      params: {
        funksjonsnavn,
        tabell,
        kollonen,
        verdien,
        where,
      },
      timeout: 5000,
    })
      .then((res) => {
        if(where===0)
        this.setState({ venner: res.data });
        
      })
      .catch((err) => console.error(err));
  };

//AXIOS koden som kaller på slett rad fra php
  slettEvent = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventer.no/main.php",
      params: {
        funksjonsnavn,
        tabell,
        kollonen,
        verdien,
        where,
      },
      timeout: 5000,
    })
      .then((res) => {
       this.lagdeEvents();
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = (e) => {
    this.skrivUtProfil();
    this.skrivUtVenner("vennOgBruker",this.state.eierInfo,"","",0);
    this.skrivUtPåmeldteEvents(
      "påmeldteSinArrangement",
      this.state.eierInfo,
      "",
      "",
      ""
    );
    this.skrivUtPåmeldteEvents(
      "søkEtter",
      "arrangement",
      "Brukere_Bnr",
      this.state.eierInfo,
      ""
    );
  };

  //Trigges av at en bruker har trykket på bli venn knappen.
  fåVenn = () =>{
    if(this.state.innloggetBrukerInfo[0] ===true){
    var verdien =  this.state.innloggetBrukerInfo[2]+ ", " + this.state.eierInfo; 
    this.skrivUtVenner('settInnRad','venn','Brukere_Bnr,Brukere_Bnr1',verdien,1);
    this.skrivUtVenner("vennOgBruker",this.state.eierInfo,"","",0);
    this.påLoggetRender(); 
    this.setState({hallo:"dere er nå venner"});
    }
  }

  //trigges dersom en bruker allerede er venn og han har trykket på fjern venn knappen
fjernVenn = () =>{
  var verdien =  this.state.innloggetBrukerInfo[2] + " OR Brukere_Bnr1 = " + this.state.innloggetBrukerInfo[2] +")"+ 
    " AND (Brukere_Bnr = " + this.state.eierInfo + " OR Brukere_Bnr1 = "+ this.state.eierInfo +")"; 
  this.skrivUtVenner('slettFra','venn','(Brukere_Bnr',verdien,1);
  this.skrivUtVenner("vennOgBruker",this.state.eierInfo,"","",0);
  this.setState({hallo:"dere er ikke lenger venner"});

}

//Passer på at den riktige knappen blir rendret ut. Dersom de er venner så blir den "Fjern venn", dersom ikke "Legg til"
  påLoggetRender = () => {
  var output = <Button onClick={this.loggUt} style={{position:"relative",left:"10%"}}>Logg ut</Button>
   var found =false; 
      this.state.venner.map((item) => {
        if(item.VennBnr == this.state.innloggetBrukerInfo[2]){
          found = true; 
            return output = <Button variant="outlined" onClick={this.fjernVenn}>Fjern som venn</Button>
        }else 
            if(this.state.innloggetBrukerInfo[2] != this.state.eierInfo &&!found)
              {
              output = <Button variant="contained" onClick={this.fåVenn}>Legg til som venn</Button>
              }     
      })

      if((this.state.venner.length === 0) && (this.state.innloggetBrukerInfo[2] !== this.state.eierInfo)){
        output = <Button variant="contained" onClick={this.fåVenn}>Legg til som venn</Button>
      }
    
    return output
  }

  //Skriver ut profilsiden. Biografien. Går gjennom en liste som er hentet fra bruker tabellen i databasen
  renderProfilInfo = () => {
   //this.skrivUtProfil(); 
    if (this.state.navneListe.length > 0) {
      return (
      <Grid container justify="center">
     { this.state.navneListe.map((item) => {
        return (
          <Grid
            key={
              item.Bnr 
            }
          >
            <Grid item>
            <Grid container justify="space-between" alignItems="baseline" >
                <Grid item>
                  <Typography variant="h6"><AccountCircleIcon/> {item.Fornavn} </Typography>
                </Grid>
                <Grid item>
                  {this.state.hallo}
                 <this.påLoggetRender/>
                 </Grid>
            </Grid>
            </Grid>
            <Grid item>
            <Typography>{item.Sted_ByNavn}</Typography>
            </Grid>
            <Grid item style={{border:"1px solid black", padding:"20px"}}>
            <Typography>{item.Biografi}</Typography>
            </Grid>
            <Grid item>
            <Typography>Epost: {item.Email}</Typography>
            <Typography>Født: {item.FødselsDato}</Typography>
            </Grid>
          </Grid>
        );
       
      })}
       </Grid>
    )} else return <CircularProgress/>;
  };

//skriver ut tabellen over påmeldte som er hentet fra databasen
  renderPåmeldte = () => {
    if (this.state.påmeldte.length > 0) {
      return (
        <Grid container  spacing={2} direction="column" alignItems="stretch" justify="flex-start">
        {this.state.påmeldte.map((item) => {
          var eventInfo = [item.ENr,item.ByNavn,item.Brukere_Bnr, item.Tittel, item.FraDato, item.Beskrivelse,item.Kategori,item.frontBildeAdresse,
            item.antallPåmeldte,item.tilDato,item.Adresse,item.klokkeslett
           ];
            
        return (
          <Grid item
            key={
              eventInfo[0]
            }
          >
            
            <Paper elevation={2}>

            <AlertDialog
             enVariant="text"
       beskrivelse={eventInfo[3]}
       innhold={<EventSide
                info={eventInfo} 
                innloggetBruker={this.state.innloggetBrukerInfo}
                onClose={this.props.close}/>}
       />
           
           
            </Paper>
          </Grid>
        );
       
      })}
       </Grid>
    )} else return "Er ikke meldt på noen events enda!";
  };

  //Skriver ut alle events som den brukeren har laget selv.Hentet fra databsen og puttet i denne arrayen som den går gjennom.
  renderEgeneEvents = () => {
    //this.lagdeEvents();

    var nyttEventKnapp = ""; 
    if(this.state.innloggetBrukerInfo[2] === this.state.eierInfo){
      nyttEventKnapp = <AlertDialog
                          enVariant="text"
                          beskrivelse={<div>Nytt event <AddCircleIcon/></div>}
                          innhold={<NyttEvent
                          brukerInfo = {this.state.innloggetBrukerInfo}/>}
                        />
    }

    if (this.state.eventer.length > 0) {
      return (
      <div>
        <Grid container justify="space-between" alignItems="flex-start" >
        <Grid item><h2>Dine Events</h2></Grid>
        <Grid item> 
        {nyttEventKnapp}
        </Grid> 
        </Grid>
        <br/>
        <br/>
      
        <Grid container  spacing={3} direction="column" alignItems="stretch" justify="flex-start">
        {this.state.eventer.map((item) => {
          const eventInfo = [item.ENr,item.ByNavn,item.Brukere_Bnr, item.Tittel, item.FraDato, item.Beskrivelse,item.Kategori,item.frontBildeAdresse,
            item.antallPåmeldte,item.TilDato,item.Adresse,item.Klokkeslett
           ];
           var slettKnapp = "";
          var redigerKnapp = "";
           

           if(this.state.innloggetBrukerInfo[2] === this.state.eierInfo){
             slettKnapp =  <Button color="secondary" onClick={() => {this.slettEvent("slettFra","arrangement","ENr",eventInfo[0],"")}}>
               <DeleteForeverIcon/></Button>; 
             redigerKnapp = <AlertDialog
                             enVariant="text"
                               beskrivelse={<EditIcon/>}
                                innhold={<RedigerKomponent
                            tabell = {eventInfo}
                            kategori={eventInfo[6]}/>}
                          />
           }
        return (
          <Grid item
            key={
              eventInfo[0] 
            }
          >
            
            <Paper elevation={2}>
              <Grid container direction="row" alignItems="baseline" justify="flex-start">
                <Grid item>
                <AlertDialog
                      enVariant="text"
                     beskrivelse={eventInfo[3]}
                     innhold={<EventSide
                              info={eventInfo} 
                              innloggetBruker={this.state.innloggetBrukerInfo}
                              onClose={this.props.close}/>}
               />
                </Grid>
                <Grid item>
                  {redigerKnapp}
                </Grid>
                <Grid item>
                 {slettKnapp}
                </Grid>
             </Grid> 
            </Paper>
          </Grid>
        );
       
      })}
       </Grid>
       </div>
    )} else return (<Grid container justify="space-between"><Grid item>"Har ikke laget noen events enda!"</Grid><Grid item> {nyttEventKnapp}</Grid></Grid>);
  };

  //Skriver ut alle venner som er hentet fra databasen. Gjør at man kan åpne og profilen dems.
  renderVenner = () => {
    if (this.state.venner.length > 0) {
      return (
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="stretch"
          justify="flex-start"
        >
          {this.state.venner.map((item) => {
            return (
              <Grid
                item
                key={
                  item.VennBnr /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
                }
              >
                <Paper elevation={2}>
                <AlertDialog
                      enVariant="text"
                     beskrivelse={<div><AccountCircleIcon/>  {item.Fornavn}</div>}
                     innhold={<ProfilSide
                             loggUt = {this.props.loggUt}
                             close = {this.props.close}
                              eierInfo={item.VennBnr} 
                              innloggetBrukerInfo={this.state.innloggetBrukerInfo}/>}
               />
                  
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      );
    } else return "Har ikke lagt til noen venner enda!";
  };

  //Skriver ut info basert på hva bruker trykker på.
  render() {  
    if(this.props.innloggetBrukerInfo[0] === true){                     
    return (
     <div>
       <MenuTabs
       brukerInfo =  {
       <div>
    {this.renderProfilInfo()}
       </div>}
       lagdeEvents = {
         <div>
       {this.renderEgeneEvents()}
         </div>
       }
       påmeldteEvents = {
          <div>
            Påmeldte: <br/>
            {this.renderPåmeldte()} 
          </div>
       }
       venner={
        <div>
          Venner: <br />
        {this.renderVenner()}
        </div>
      }
       skiftTilPåmeldt = {this.påmeldteEvents}
       skiftTilLagde = {this.lagdeEvents}
       skiftTilProfil = {this.skrivUtProfil}
       skiftTilVenner={this.egneVenner}
       />
     
     </div>
    );
    }else return (<p>Du må være innlogget for å se profil-Informasjon</p>)
  }
}
