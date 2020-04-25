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
import RedigerKomponent from './RedigerKomponent.jsx';
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

  };

  loggUt = () =>{
 this.props.loggUt();
 this.props.close();
  }

  lagdeEvents = () =>{ //EVENT TABELLEN
    this.skrivUtPåmeldteEvents(
      "søkEtter",
      "arrangement",
      "Brukere_Bnr",
      this.state.innloggetBrukerInfo[2],
      ""
    );
  }

  påmeldteEvents = () =>{ //PÅMELDT TABELLEN
    this.skrivUtPåmeldteEvents(
      "påmeldteSinArrangement",
      this.state.innloggetBrukerInfo[2],
      "",
      "",
      ""
    );
 
  }

  egneVenner = () =>{
this.skrivUtVenner("vennOgBruker",this.state.innloggetBrukerInfo[2],
  "",
  "",
  ""
  );
  }

  skrivUtProfil = () => {

    this.skrivUtProfilInfo("søkEtter", "brukere", "Bnr", this.state.innloggetBrukerInfo[2], "");
  }

  skrivUtProfilInfo = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventsphp.000webhostapp.com/index.php",
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
      url: "https://boeventsphp.000webhostapp.com/",
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
        if(funksjonsnavn == "påmeldteSinArrangement")
        this.setState({ påmeldte: res.data });
        if(tabell == "arrangement")
        this.setState({ eventer: res.data });
      
      })
      .catch((err) => console.error(err));
  };

  skrivUtVenner = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventsphp.000webhostapp.com/index.php",
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
        this.setState({ venner: res.data });
      })
      .catch((err) => console.error(err));
  };


  slettEvent = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventsphp.000webhostapp.com/",
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
    this.skrivUtVenner("vennOgBruker",this.state.innloggetBrukerInfo[2],"","","");
    this.skrivUtPåmeldteEvents(
      "påmeldteSinArrangement",
      this.state.innloggetBrukerInfo[2],
      "",
      "",
      ""
    );
    this.skrivUtPåmeldteEvents(
      "søkEtter",
      "arrangement",
      "Brukere_Bnr",
      this.state.innloggetBrukerInfo[2],
      ""
    );
  };

  renderProfilInfo = () => {
   //this.skrivUtProfil(); 
    if (this.state.navneListe.length > 0) {
      return (
      <Grid container>
     { this.state.navneListe.map((item) => {
        return (
          <Grid
            key={
              item.Bnr /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
            }
          >
            <Grid item>
            <Grid container justify="space-between" alignItems="flex-start" >
                <Grid item>
                  <Typography variant="h6"><AccountCircleIcon/> {item.Brukernavn} </Typography>
                </Grid>
                <Grid item>
                 <Button onClick={this.loggUt} style={{position:"relative",left:"10%"}}>Logg ut</Button>
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
                innloggetBruker={this.state.innloggetBrukerInfo}/>}
       />
           
           
            </Paper>
          </Grid>
        );
       
      })}
       </Grid>
    )} else return "Er ikke meldt på noen events enda!";
  };

  renderEgeneEvents = () => {
    //this.lagdeEvents();
    if (this.state.eventer.length > 0) {
      return (
        <Grid container  spacing={3} direction="column" alignItems="stretch" justify="flex-start">
        {this.state.eventer.map((item) => {
          const eventInfo = [item.ENr,item.ByNavn,item.Brukere_Bnr, item.Tittel, item.FraDato, item.Beskrivelse,item.Kategori,item.frontBildeAdresse,
            item.antallPåmeldte,item.TilDato,item.Adresse,item.Klokkeslett
           ];
        return (
          <Grid item
            key={
              eventInfo[0] /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
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
                              innloggetBruker={this.state.innloggetBrukerInfo}/>}
               />
                </Grid>
                <Grid item>
                  <AlertDialog
                  enVariant="text"
                  beskrivelse={<EditIcon/>}
                     innhold={<RedigerKomponent
                      tabell = {eventInfo}
                      kategori={eventInfo[6]}/>}
                     
                  />
                </Grid>
                <Grid item>
                 <Button color="secondary" onClick={() => {this.slettEvent("slettFra","arrangement","ENr",eventInfo[0],"")}}><DeleteForeverIcon/></Button>
                </Grid>
             </Grid> 
            </Paper>
          </Grid>
        );
       
      })}
       </Grid>
    )} else return "Har ikke laget noen events enda!";
  };

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
                  <Typography>
                    <Button><AccountCircleIcon/>  {item.Fornavn} </Button>
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      );
    } else return "Har ikke lagt til noen venner enda!";
  };

  render() {                         
    return (
     <div>
       <MenuTabs
       brukerInfo =  {
       <div>
    {this.renderProfilInfo()}
       </div>}
       lagdeEvents = {
         <div>
           <Grid container justify="space-between" alignItems="flex-start" >
            <Grid item><h2>Dine Events</h2></Grid>
            <Grid item> <AlertDialog
                        enVariant="text"
                        beskrivelse={<div>Nytt event <AddCircleIcon/></div>}
                        innhold={<NyttEvent
                        brukerInfo = {this.state.innloggetBrukerInfo}/>}
                        />
            </Grid> 
            </Grid>
            <br/>
            <br/>
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
  }
}
