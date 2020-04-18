import React, { Component } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';
import RedigerKomponent from './ProfilSide.jsx';
import MenuTabs from './MenuTabs.jsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class ProfilSide extends Component {
  state = {
    text: "",
    respons: "",
    navneListe: [],
    eventer: [],
    påmeldte: [],
    venner: [],
    innloggetBrukerInfo:this.props.innloggetBrukerInfo
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
        console.log("SKriv ut profil"); 
        console.log( res.data);
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
       console.log(res.data);
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
        console.log("Event slettet" + res.data);
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = (e) => {
    this.skrivUtProfil();
  };

  renderProfilInfo = () => {
   //this.skrivUtProfil(); 
    if (this.state.navneListe.length > 0) {
      return (
      <Grid container alignContent="center" justify="flex-start">
     { this.state.navneListe.map((item) => {
        return (
          <Grid
            key={
              item.Bnr /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
            }
          >
            <Grid item>
            <Typography><AccountCircleIcon/> {item.Brukernavn} <Button onClick={this.loggUt}>Logg ut</Button></Typography>
            </Grid>
            <Grid item>
            <Typography>Epost: {item.Email}</Typography>
            </Grid>
            <Grid item>
            <Typography> Biografi: {item.Biografi}</Typography>
            </Grid>
          </Grid>
        );
       
      })}
       </Grid>
    )} else return "Ingen treff!";
  };

  renderPåmeldte = () => {
    if (this.state.påmeldte.length > 0) {
      return (
        <Grid container  spacing={2} direction="column" alignItems="stretch" justify="flex-start">
        {this.state.påmeldte.map((item) => {
        return (
          <Grid item
            key={
              item.Arrangement_ENr  /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
            }
          >
            
            <Paper elevation={2}>
             
            <Typography><Button>{item.Tittel} </Button>
           
            </Typography>
            </Paper>
          </Grid>
        );
       
      })}
       </Grid>
    )} else return "Tomt foreløbig!";
  };

  renderEgeneEvents = () => {
    //this.lagdeEvents();
    if (this.state.eventer.length > 0) {
      return (
        <Grid container  spacing={2} direction="column" alignItems="stretch" justify="flex-start">
        {this.state.eventer.map((item) => {
          const enr = item.ENr; 
        return (
          <Grid item
            key={
              item.ENr /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
            }
          >
            
            <Paper elevation={2}>
             
            <Typography><Button>{item.Tittel} </Button>
            <Button><EditIcon/></Button>
            <Button color="secondary" onClick={() => {this.slettEvent("slettFra","arrangement","ENr",enr,"")}}><DeleteForeverIcon/></Button>
            </Typography>
            </Paper>
          </Grid>
        );
       
      })}
       </Grid>
    )} else return "Tomt foreløbig!";
  };

  render() {
    const styles = {
      color: "black",
      border: "1px solid",
      padding: "10px",
      boxShadow: "5px 10px #888888",
    };
                                    // PÅMELDT OG EGNE EVENTS SKRIVER UT DEN SAMME TABELLEN!!!!!!!
    return (
     <div>
       <MenuTabs
       brukerInfo =  {
       <div>
    {this.renderProfilInfo()}
       </div>}
       lagdeEvents = {
         <div>
            Dine Events: 
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
       skiftTilPåmeldt = {this.påmeldteEvents}
       skiftTilLagde = {this.lagdeEvents}
       skiftTilProfil = {this.skrivUtProfil}
       />
      
       
     </div>
    );
  }
}
