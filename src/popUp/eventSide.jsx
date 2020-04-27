import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SimpleModal from './List.js';


class EventSide extends Component {
    state = {
        info: this.props.info,
        påmeldtListe: [],
        innloggetBruker: this.props.innloggetBruker
    }

    componentDidMount= e =>{
        var puttSammen = "'" + this.state.info[0]+ "'";
        this.hentPåmeldtListe('søkEtter','påmeldte','Arrangement_ENr',puttSammen,0)
    }

    try = () =>{
      console.log(this.state.info[0]);
    }

    hentPåmeldtListe = (funksjonsnavn, tabell, kollonen, verdien, where) => {
        axios({
          method: 'get',
          url: "https://boeventsphp.000webhostapp.com/index.php", 
        params: { 
          funksjonsnavn, 
          tabell,
          kollonen,
          verdien,
          where
       }, 
       timeout: 5000
      })
        .then(res =>{
            if(where===0)
            this.setState({påmeldtListe: res.data}); 

            if(where===1)
            console.log(res.data);
      })
        .catch(err => console.error(err))
      };
      

      meldPå = () =>{
          if(this.state.innloggetBruker[0] ===true){
        var puttSammen = "'" + this.state.info[0]+ "'";
          var verdien =  this.state.innloggetBruker[2]+ "," + this.state.info[0]; 
          this.hentPåmeldtListe('settInnRad','påmeldte','Brukere_Bnr,Arrangement_ENr',verdien,1);
          this.hentPåmeldtListe('søkEtter','påmeldte','Arrangement_ENr',puttSammen,0);
          }
      }

      meldAv = () =>{
        var puttSammen = "'" + this.state.info[0]+ "'";
        var verdien =  this.state.innloggetBruker[2]; 
        this.hentPåmeldtListe('slettFra','påmeldte','Brukere_Bnr',verdien,1);
        this.hentPåmeldtListe('søkEtter','påmeldte','Arrangement_ENr',puttSammen,0);
    }

      ConditionalButton = () =>{
       var output = <Button  variant="contained" color="primary" onClick={this.meldPå}>Bli med</Button>

       {this.state.påmeldtListe.map((item) => {
           if(item.Brukere_Bnr == this.state.innloggetBruker[2])
           output = <Button variant="outlined" onClick={this.meldAv}>Meld deg av</Button>
      })}
          return output
      }

      mapPåmeldtListe = () =>{
        if(this.state.påmeldtListe.length > 0){
          return (
            <Grid container alignContent="center" justify="center">
            {this.state.påmeldtListe.map((item) => {
            return (
             <p key= {item.Brukere_Bnr} style={{margin:10}}>
             {item.Brukere_Bnr}
            </p>
              )
          })} </Grid>)
        }else return (<p>Ingen er påmeldt enda!</p>); 
      };

      /*
      <p>{this.state.info[3]}</p>
            
           <Button onClick={this.try}>test</Button> 
            <this.ConditionalButton/>
            <p>Bruker-Nummer til folk som er påmeldt: </p>
            {this.mapPåmeldtListe()}
            <p>Bruker som leser: </p>
            {this.state.innloggetBruker[2]}
      */
 
    render() { 
        return ( <div>
           <SimpleModal
           Enr = {this.state.info[0]}
           innloggetBruker = {this.state.innloggetBruker}
           onClose={this.props.onClose}
           loggUt={this.props.loggUt}
           /> 
        </div> );
    }
}
 
export default EventSide;