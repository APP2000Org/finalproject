import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class NyttEvent extends Component {
state = {
sted: "",
profil_nr: "",
tittel: "",
fraDato: "", 
tilDato:"",
beskrivelse: "",
kategori: "",
adresse: "",
klokkeslett:"",
respons:""
}

registrerEvent = (e) => {
  e.preventDefault();
    var params = new URLSearchParams();
params.append('sted', this.state.sted);
params.append('Profil_PNr', this.state.profil_nr);
params.append('Tittel', this.state.tittel);
params.append('FraDato', this.state.fraDato); 
params.append('Beskrivelse', this.state.beskrivelse);
params.append('Kategori', this.state.kategori);
params.append('TilDato', this.state.tilDato);
params.append('Adresse', this.state.adresse);
params.append('Klokkeslett', this.state.klokkeslett);
    axios.post('https://boeventsphp.000webhostapp.com/nyEvent.php', params) 
    .then(res =>{
      if(this.state.respons===""){
      this.setState({respons:"Event har blitt registrert!"}); 
      }else this.setState({respons: "Feil informasjon fylt ut!"}); 
      console.log(res); 
  })
    .catch(err => {
        this.setState({respons:"Noe gikk feil! Kontakt administrator!" })
        console.error(err)})
  };

  handleFormChange = e => {
    this.setState({
    [e.target.name]: e.target.value,
    });
  }

  render(){
return(
    <form onSubmit={this.registrerEvent}>
<br/>
<TextField label ="Tittel" name="tittel"  onChange={this.handleFormChange} required/> <br/>
<TextField InputLabelProps={{
            shrink: true,
          }} label ="Fra Dato å/d/m" name="fraDato" onChange={this.handleFormChange}/><br/> 
          <TextField InputLabelProps={{
            shrink: true,
          }} label ="Til dato å/d/m" name="tilDato" onChange={this.handleFormChange}/><br/> 
          <TextField label ="Klokkeslett" name = "klokkeslett"  onChange={this.handleFormChange} /><br/>
<TextField label ="Beskrivelse" name="beskrivelse"onChange={this.handleFormChange}/><br/>
<TextField label ="Kategori" name= "kategori" onChange={this.handleFormChange} required/><br/>
<TextField label ="By" name = "sted"  onChange={this.handleFormChange} /><br/>
<TextField label ="Adresse" name = "adresse"  onChange={this.handleFormChange} /><br/>
<Button type="submit" value="Submit" variant="contained" 
      color="primary">Submit </Button> 
      <p>{this.state.respons}</p>
</form>
)
  }
}