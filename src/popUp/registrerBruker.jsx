import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class RegistrerBruker extends Component {
state = {
sted: "",
fornavn: "",
fodselsdato: "", 
email: "",
passord: "",
respons: ""
}

/*
handleSubmitForm =e =>{
 this.setState({   respons:""})
    e.preventDefault(); 
    axios({
      method: 'get',
      url: 'http://localhost/omFinnes.php',
      params: {
        tabell: 'brukere',
        kollonen: 'Passord',
        verdien: this.state.passord
      },
   timeout: 5000
  })
    .then(res =>{
  this.setState({respons: res.data}); 
  if(this.state.respons === ""){
    this.registrerBruker();
  }
  else this.setState({respons: "Ugyldig passord"})
      console.log(res); 
  })
    .catch(err => console.error(err))

  };
  */

registrerBruker = (e) => {
  e.preventDefault(); 
    var params = new URLSearchParams();
params.append('sted', this.state.sted);
params.append('fornavn', this.state.fornavn);
params.append('fodselsdato', this.state.fodselsdato);
params.append('email', this.state.email); // PROBLEM LIGGER I DATO SOM IKKE FORMATERT RIKTIG I FORHOLD TIL DATABASEN!!!!!!!!!!!!!
params.append('passord', this.state.passord);
    axios.post('https://boeventsphp.000webhostapp.com/nyBruker.php', params) 
    .then(res =>{
      this.setState({respons:res.data})
      if(this.state.respons===""){
      this.setState({respons:"Du har blitt registrert. Velkommen til Eventer"}); 
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
  <div>
    <form style={{padding:50}}>
<br/>
<TextField label ="Fornavn" name="fornavn"  onChange={this.handleFormChange}  style={{margin:10}} required/> <br/>
<TextField InputLabelProps={{
            shrink: true,
          }} label ="Fødselsdato å/d/m" name="fodselsdato"style={{margin:10}} onChange={this.handleFormChange}/><br/> 
<TextField label ="Email" name="email" style={{margin:10}} onChange={this.handleFormChange}/><br/>
<TextField label ="Passord" name= "passord" type="password"style={{margin:10}} onChange={this.handleFormChange} required/><br/>
<TextField label ="Bosted" name = "sted"  style={{margin:10}} onChange={this.handleFormChange} /><br/>
</form>
<p>{this.state.respons}</p>
<Button type="submit" value="Submit" variant="contained" 
      color="primary" onClick={this.registrerBruker} style={{margin:10}}>Registrer </Button> 
</div>
)
  }
}