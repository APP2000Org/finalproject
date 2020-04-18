import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlertDialog from './AlertDialog.jsx';
import RegistrerBruker from './registrerBruker.jsx';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export default class LogIn extends Component {
state = {
fornavn: "",
passord: "",
brukerInfo: [],
respons: "",
}
/*
sjekkOmInnlogget = ()=> {
  axios.defaults.withCredentials = true;
  axios({
    method:'get',
    url: 'http://localhost/sessionSjekk.php', 
 timeout: 5000
})
  .then(res =>{
this.setState({innloggetBrukerInfo: res.data}); 
console.log("Dette er sjekk innlogging: " + res.data);
})
  .catch(err => console.error(err))
};
  */

  sendTilApp = (tabell) =>{
   this.props.loggInnFunksjon(tabell); 
  }

loggInn = (e) => {
  e.preventDefault(); 
  
      axios({
        method: 'get',
        url:"https://boeventsphp.000webhostapp.com/loggInn.php",
        params: {
          brukernavn:"'" + this.state.fornavn + "'",
          passord: this.state.passord
        }
      }) 
    .then(res =>{
      this.setState({brukerInfo:res.data});
      if(this.state.brukerInfo[0]==true){
      this.setState({respons:"Du har blitt logget inn"}); 
      console.log(res); 
      this.sendTilApp(this.state.brukerInfo);
     // this.sjekkOmInnlogget();
      //window.location.reload(false);

      }else {
        this.setState({respons: "Brukernavn eller passord er feil!"})
      console.log(this.state.brukerInfo);
    }; 
     
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
    <form onSubmit={this.loggInn} style={{padding:50}}>
<br/>
<TextField label ="Fornavn" name="fornavn"  onChange={this.handleFormChange} style={{margin:10}} required/> <br/>
<TextField label ="Passord" name= "passord" type="password" onChange={this.handleFormChange}  style={{margin:10}} required/><br/>
<Grid container >
<Button type="submit" value="Submit" variant="contained" 
      color="primary"  size="medium" style={{margin:10}}>Logg Inn </Button> 
<AlertDialog
enVariant='text'
beskrivelse="Ny bruker?"
     innhold = {<RegistrerBruker/>}
     /> 
      </Grid>
      <p>{this.state.respons}</p>
</form>
)
  }
}