import React, { Component } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";

export default class ProfilSide extends Component {
  state = {
    text: "",
    respons: "",
    navneListe: [],
    eventer: [],
  };

  skrivUtProfilInfo = (funksjonsnavn, tabell, kollonen, verdien, where) => {
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
        this.setState({ navneListe: res.data });
        console.log(res);
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
        this.setState({ eventer: res.data });
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = (e) => {
    var BrukerNummer = "'" + "5" + "'";

    /*Bytter Var Brukernummer med en funksjon som henter ditt brukernummer*/
    this.skrivUtProfilInfo("søkEtter", "brukere", "Bnr", BrukerNummer, "");
    this.skrivUtPåmeldteEvents(
      "søkEtter",
      "arrangement",
      "Brukere_Bnr",
      BrukerNummer,
      ""
    );
  };

  renderProfilInfo = () => {
    if (this.state.navneListe.length > 0) {
      return this.state.navneListe.map((item) => {
        return (
          <p
            key={
              item.Bnr /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
            }
          >
            Brukernavn: {item.Brukernavn}
            <br></br>
            Epost: {item.Email}
            <br></br>
            Biografi: {item.Biografi}
            <br></br>
          </p>
        );
      });
    } else return "Ingen treff!";
  };

  renderPåmeldteEvents = () => {
    if (this.state.eventer.length > 0) {
      return this.state.eventer.map((item) => {
        return (
          <list
            key={
              item.Bnr /*Bytter ut item.Bnr med en funksjon som henter BNummeret*/
            }
          >
            <Typography>{item.Tittel}</Typography>
          </list>
        );
      });
    } else return "Ingen treff!";
  };

  render() {
    const styles = {
      color: "black",
      border: "1px solid",
      padding: "10px",
      boxShadow: "5px 10px #888888",
    };

    return (
     <div>
        <Typography style={styles}>
          Info: 
          {this.renderProfilInfo()}
          Påmeldte Events: 
          {this.renderPåmeldteEvents()}
        </Typography>
     </div>
    );
  }
}
