/*Kodet av Patrick S. Lorentzen - 151685
og Sondre Reinholdtsen StudNr:225274 
Denne koden gjør at en bruker kan laste opp ett bilde og legge den ut på sin eventer side*/

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default class LeggInnBilde extends Component {
  state = {
      Enr: this.props.Enr,
    selectedFile: null,
  };

  registrerEvent = (e) => {
    e.preventDefault();
    const params = new FormData();
    params.append("frontBildeAdresse", this.state.selectedFile);
    params.append("Enr", this.state.Enr);
    axios
      .post("https://boeventsphp.000webhostapp.com/leggInnBilde.php", params)
      .then((res) => {
       
        if (res.data === "") {
          this.setState({ respons: "Bilde har blitt registrert!" });
        } else this.setState({ respons: "Bildet ble ikke akseptert!" });
        console.log(res);
      })
      .catch((err) => {
        this.setState({ respons: "Noe gikk feil! Kontakt administrator!" });
        console.error(err);
      });
  };

  handleFormChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


 

  render() {
    const kategori = [];
    return (
      <div style={{ margin: "20px" }}>

        <input
          type="file"
          onChange={
            /*Forandrer Innholdet fra null altså ingenting til hvilket bilde du velger*/ (
              e
            ) => this.setState({ selectedFile: e.target.files[0] })
          }
        />
        <Button
          type="submit"
          value="Submit"
          variant="contained"
          color="primary"
          onClick={this.registrerEvent}
        >
          Submit{" "}
        </Button>
        <p>{this.state.respons}</p>
      </div>
    );
  }
}
