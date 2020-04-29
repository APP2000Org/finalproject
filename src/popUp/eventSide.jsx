/*Laget av Patrick S. Lorentzen
 Forside for å skrive ut Event Siden */ 

import React, { Component } from 'react';
import SimpleModal from './List.js';


class EventSide extends Component {
    state = {
        info: this.props.info,
        påmeldtListe: [],
        innloggetBruker: this.props.innloggetBruker,
    }

 
    render() { 
        return ( <div>
           <SimpleModal
           Enr = {this.state.info[0]}
           innloggetBruker = {this.state.innloggetBruker}
           onClose={this.props.onClose}
           loggUt={this.props.loggUt}
           lukkKart = {this.props.lukkKart}
           bilde = {this.props.bilde}
           /> 
        </div> );
    }
}
 
export default EventSide;