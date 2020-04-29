/* Laget av Patrick S. Lorentzen
Her lager man en ny bruker. Fyller ut ett skjema som blir sendt til php */
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

  //Send skjemaet til php via AXIOS
registrerBruker = (e) => {
  e.preventDefault(); 
    var params = new URLSearchParams();
params.append('sted', this.state.sted);
params.append('fornavn', this.state.fornavn);
params.append('fodselsdato', this.state.fodselsdato);
params.append('email', this.state.email);
params.append('passord', this.state.passord);
    axios.post('https://boeventer.no/nyBruker.php', params)
    .then(res =>{
      this.setState({respons:res.data})
      if(this.state.respons===""){
      this.setState({respons:"Du har blitt registrert. Velkommen til Eventer"}); 
      }else this.setState({respons: "Feil informasjon fylt ut!"}); 
     
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

  //Utfyllingskjemaet blir skrevet ut i vinduet.
  render(){
return(
  <div>
    <form style={{padding:50}}>
<br/>
<TextField label ="Fornavn" name="fornavn"  onChange={this.handleFormChange}  style={{margin:10}} required/> <br/>
<TextField InputLabelProps={{
            shrink: true,
          }} label ="Fødselsdato å/d/m" type="date" name="fodselsdato"style={{margin:10}} onChange={this.handleFormChange}/><br/> 
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