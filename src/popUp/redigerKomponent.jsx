import React, { Component } from 'react';

class redigerKomponent extends Component {
    state = { 
        eventer:[6,"Langesund",5,"S\u00f8ppelplukking p\u00e5 stranda","2020-04-15","Det har samlet seg s\u00e5 mye s\u00f8ppel her. La oss rydde opp sammen!","Dugnad","https:\/\/github.com\/APP2000Org\/ShinobiSondre\/blob\/master\/src\/ArrangementBilder\/s%C3%B8ppelplukking.jpg",2,"2020-04-15","Stranda","16:00:00"],
        respons:""
     }

     lagSql = () =>{
        const bynavn = eventer[1];
        const tittel = eventer[3];
        const fraDato  = eventer[4];
        const Beskrivelse  = eventer[5];
        const Kategori  = eventer[6];
        const tilDato  = eventer[9];
        const Adresse  = eventer[10];
        const klokkeslett = eventer[11]; 
        console.log(bynavn + tittel + fraDato + Beskrivelse + Kategori + tilDato + Adresse + klokkeslett)
     }

    registrerEvent = (e) => {
        e.preventDefault();
          var params = new URLSearchParams();
      params.append('ByNavn', this.state.sted);
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

    render() { 
        return (  <form onSubmit={this.lagSql}>
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
            </form> );
    }
}
 
export default redigerKomponent;