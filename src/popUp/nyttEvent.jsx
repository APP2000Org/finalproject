import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default class NyttEvent extends Component {
state = {
sted: "",
profil_nr: this.props.brukerInfo[2],
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
params.append('bnr', this.state.profil_nr);
params.append('Tittel', this.state.tittel);
params.append('FraDato', this.state.fraDato); 
params.append('Beskrivelse', this.state.beskrivelse);
params.append('Kategori', this.state.kategori);
params.append('TilDato', this.state.tilDato);
params.append('Adresse', this.state.adresse);
params.append('Klokkeslett', this.state.klokkeslett);
    axios.post('https://boeventsphp.000webhostapp.com/nyEvent.php', params) 
    .then(res =>{
      if(res.data===""){
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
    const kategori = [
      'Natur',
      'Miljø',
      'Underholdning',
      'Sport',
      'Musikk',
      'Dugnad',
      'Samfunn',
      'Kultur',
      'Handel',
      'Media'
    ]; 
return(
    <form onSubmit={this.registrerEvent} style={{ margin:"20px"}}>
<br/>
<h2>Fyll ut Event skjema</h2>
<TextField InputLabelProps={{
            shrink: true,
          }} label ="Tittel" name="tittel"  onChange={this.handleFormChange} required/> <br/><br/>
<TextField InputLabelProps={{
            shrink: true,
          }} label ="Fra Dato å/d/m" name="fraDato" onChange={this.handleFormChange} required/><br/> <br/>
          <TextField InputLabelProps={{
            shrink: true,
          }} label ="Til dato å/d/m" name="tilDato" onChange={this.handleFormChange}/><br/> <br/>
          <TextField InputLabelProps={{
            shrink: true,
          }}label ="Klokkeslett" type="time" name="klokkeslett"  onChange={this.handleFormChange} /><br/><br/>
<label value="Beskrivelse" >Beskrivelse<br/><TextareaAutosize name="beskrivelse" value={this.state.beskrivelse} rowsMin={4} onChange={this.handleFormChange}/></label><br/>
<label value="Beskrivelse" >Kategori <br/><select label="Kategori" name="kategori" onChange={this.handleFormChange}>
            <option value="">
             
            </option>
            {kategori.map((kategorinavn) => (
            <option key={kategorinavn} value={kategorinavn}>
            {kategorinavn}
           </option>
          ))}
          </select></label><br/><br/>
<TextField InputLabelProps={{
            shrink: true,
          }} label ="By" name = "sted"  onChange={this.handleFormChange} required/><br/><br/>
<TextField InputLabelProps={{
            shrink: true,
          }} label ="Adresse" name = "adresse"  onChange={this.handleFormChange} /><br/><br/>
<Button type="submit" value="Submit" variant="contained" 
      color="primary">Submit </Button> 
      <p>{this.state.respons}</p>
</form>
)
  }
}