import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';

class RedigerKomponent extends Component {
    state = { 
        eventer:this.props.tabell,
        respons:"",
        sted: "",
        tittel: "",
        fraDato: "", 
        tilDato:"",
        beskrivelse: "",
        kategori: this.props.kategori,
        adresse: "",
        klokkeslett:"",
     
     }

     //[6,"Langesund",5,"S\u00f8ppelplukking p\u00e5 stranda","2020-04-15","Det har samlet seg s\u00e5 mye s\u00f8ppel her. La oss rydde opp sammen!","Dugnad","https:\/\/github.com\/APP2000Org\/ShinobiSondre\/blob\/master\/src\/ArrangementBilder\/s%C3%B8ppelplukking.jpg",2,"2020-04-15","Stranda","16:00:00"],

     componentDidMount() { 
      this.setState({kategori: this.state.eventer[6],
                   sted:this.state.eventer[1],
                   tittel:this.state.eventer[3],
                   fraDato:this.state.eventer[4],
                   tilDato: this.state.eventer[9],
                   beskrivelse: this.state.eventer[5],
                   adresse:this.state.eventer[10],
                   klokkeslett: this.state.eventer[11]
                  });
                 
      
     }

    registrerEvent = (e) => {
      e.preventDefault();
          var params = new URLSearchParams();
          params.append('sted', this.state.sted);
          params.append('ENr', this.state.eventer[0]);
          params.append('Tittel', this.state.tittel);
          params.append('FraDato', this.state.fraDato); 
          params.append('Beskrivelse', this.state.beskrivelse);
          params.append('Kategori', this.state.kategori);
          params.append('TilDato', this.state.tilDato);
          params.append('Adresse', this.state.adresse);
          params.append('Klokkeslett', this.state.klokkeslett);
          axios.post('http://localhost/oppdaterEvent.php', params) 
          .then(res =>{
            if(this.state.respons===""){
            this.setState({respons:"Event har blitt oppdatert!"}); 
            }else this.setState({respons: "Feil informasjon fylt ut!"}); 
            console.log(res.data); 
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

    render() { 
   
        return (  <form onSubmit={this.registrerEvent} style={{ margin:"20px"}}>
            <br/>
            <TextField InputLabelProps={{
                        shrink: true,
                      }} label ="Tittel" name="tittel"  value={this.state.tittel}onChange={this.handleFormChange} /> <br/>
            <TextField InputLabelProps={{
                        shrink: true,
                      }} label ="Fra Dato å/d/m" name="fraDato" value={this.state.fraDato} onChange={this.handleFormChange}/><br/> 
             <TextField InputLabelProps={{
                        shrink: true,
                      }} label ="Til dato å/d/m" name="tilDato" value={this.state.tilDato} onChange={this.handleFormChange}/><br/> 
            <TextField InputLabelProps={{
                        shrink: true,
                      }}label ="Klokkeslett" name = "klokkeslett"  value={this.state.klokkeslett} onChange={this.handleFormChange} /><br/>
            <label value="Beskrivelse" >Beskrivelse<br/><TextareaAutosize name="beskrivelse" value={this.state.beskrivelse} rowsMin={4} onChange={this.handleFormChange}/></label><br/>
            <label value="Kategori">Kategori<br/><select label="Kategori" name="kategori" defaultValue={this.state.kategori} onChange={this.handleFormChange}>
            <option key="Natur"value="Natur">
             Natur
            </option>
            <option key="Underholdning"value="Underholdning">
             Underholdning
             </option>
             <option key="Miljø"value="Miljø">
             Miljø
             </option>
             <option key="Sport"value="Sport">
             Sport
             </option>
             <option key="Musikk"value="Musikk">
             Musikk
             </option>
             <option key="Dugnad"value="Dugnad">
             Dugnad
             </option>
             <option key="Samfunn"value="Samfunn">
             Samfunn
             </option>
             <option key="Kultur"value="Kultur">
             Kultur
             </option>
             <option key="Handel"value="Handel">
             Handel
             </option>
             <option key="Media"value="Media">
             Media
             </option>
          </select></label><br/><br/>
            <TextField InputLabelProps={{
                        shrink: true,
                      }}label ="By" name = "sted"  value={this.state.sted} onChange={this.handleFormChange} /><br/>
            <TextField InputLabelProps={{
                        shrink: true,
                      }}label ="Adresse" name = "adresse" value={this.state.adresse} onChange={this.handleFormChange} /><br/><br/>
            <Button type="submit" value="Submit" variant="contained" 
                  color="primary">Submit </Button> 
                  <p>{this.state.respons}</p>
            </form> );
       
    }
}
 
export default RedigerKomponent;