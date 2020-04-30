/*Laget av Fredrik Drøpping Skaug - 225243
Dette er eventsiden som rendrer eventet og all dens informasjon.
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Popup from "reactjs-popup";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import AlertDialog from './AlertDialog.jsx';
import ProfilSide from './ProfilSide.jsx';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 984
  },
  bilde: {
    width: "100%",
    borderRadius: "25px"
  },
  eventsInfo: {
    width: "100%",
    maxWidth: 984
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  rootTextField: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
      maxWidth: "75ch"
    }
  },
  button: {
    margin: theme.spacing(1)
  },
  rootKommnetar: {
    width: "100%",
    maxWidth: "100ch",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  scrollList: {
    width: "100%",
    height: 400,
    maxWidth: 100
  }
}));



class SingleLineGridList extends React.Component {
  state = {
    påmeldtListe: this.props.påmeldtListe,
}
  
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden"
        }}
      >
        <GridList
          cellHeight={180}
          cellwidth={280}
          style={{ width: 300, height: 400 }}
          cols={1}
        >
          {this.state.påmeldtListe.map(tile => (
          
            <GridListTile key={tile.Bnr}>
              <img src="https://image.shutterstock.com/image-illustration/male-default-placeholder-avatar-profile-260nw-582509551.jpg" alt={tile.Fornavn} />
              <GridListTileBar title={<AlertDialog
                      enVariant="text"
                     beskrivelse={<div>{tile.Fornavn}</div>}
                     innhold={<ProfilSide
                             loggUt = {this.props.loggUt}
                             close = {this.props.onClose}
                              eierInfo={tile.Bnr} 
                              innloggetBrukerInfo={this.props.innloggetBruker}/>}
               />} />

            </GridListTile>
          ))}
        </GridList>

       
      </div>
    );
  }
}

//Classen skriver ut all informasjonen om eventet. Bilde, Tittel, Beskrivelse og info om hvor og når

class RenderText extends React.Component {
  state = {
    info: [],
    påmeldtListe: [],
    innloggetBruker : this.props.innloggetBruker,
    eierInfo: [],
    hallo: ""
  };

  skrivUt = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventer.no/main.php",
      params: {
        funksjonsnavn,
        tabell,
        kollonen,
        verdien,
        where
      },
      timeout: 5000
    })
      .then(res => {
        if(where === 0)
        this.setState({ info: res.data });
        if(where === 1)
        this.setState({eierInfo:res.data});
        
      })
      .catch(err => console.error(err));
  };

  hentPåmeldtListe = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: 'get',
      url: "https://boeventer.no/main.php", 
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
        if(where===0){
        this.setState({påmeldtListe: res.data}); 
        }
        if(where===1){

        }
  })
    .catch(err => console.error(err))
  };

  meldPå = () =>{
    if(this.state.innloggetBruker[0] ===true){
  var puttSammen = "'" + this.props.Enr+ "'";
    var verdien =  this.state.innloggetBruker[2]+ "," + this.props.Enr; 
    this.hentPåmeldtListe('settInnRad','påmeldte','Brukere_Bnr,Arrangement_ENr',verdien,1);
    this.hentPåmeldtListe('påmeldteSinBruker',puttSammen,'','',0);
    this.setState({hallo:"du er påmeldt"});
    }
}

meldAv = () =>{
  var puttSammen = "'" + this.props.Enr+ "'";
  var verdien =  this.state.innloggetBruker[2] + " AND Arrangement_ENr = " + this.props.Enr; 
  this.hentPåmeldtListe('slettFra','påmeldte','Brukere_Bnr',verdien,1);
  this.hentPåmeldtListe('påmeldteSinBruker',puttSammen,'','',0);
  this.setState({hallo:"du er meldt av"});
}

ConditionalButton = () =>{
  var output = <Button  variant="contained" color="primary" onClick={this.meldPå}>Bli med</Button>

  this.state.påmeldtListe.map((item) => {
      if(item.Bnr == this.state.innloggetBruker[2])
      output = <Button variant="outlined" onClick={this.meldAv}>Meld deg av</Button>
 })
 if(this.state.innloggetBruker[0] === false){
   output = "";
 }
     return output
 }

  componentDidMount = e => {
    var EventNummer = this.props.Enr;
    this.skrivUt("søkEtter", "arrangement", "ENr", EventNummer, 0);
    this.hentPåmeldtListe('påmeldteSinBruker',EventNummer,'','',0);
    this.skrivUt("arrangementSinBruker",EventNummer,'','',1);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.påmeldtListe !== this.state.påmeldtListe) {
 
    }
  }

  render() {
    return this.state.info.map(info => {
      return (
        <div key={info.ENr}>
          <img src={this.props.bilde} />;
          <Typography variant="h5" component="h4" gutterBottom>
            {info.Tittel}
          </Typography>
          <Grid container spacing={1} direction="row" alignItems="baseline" justify="space-between" >
          <Grid item>
          {this.state.eierInfo.map((tile) => (
          
          <AlertDialog
          key={tile.Bnr}
          enVariant="text"
         beskrivelse={<div><Typography variant="h6"><AccountCircleIcon/>  {tile.Fornavn}</Typography></div>}
         innhold={<ProfilSide
                 loggUt = {this.props.loggUt}
                 close = {this.props.onClose}
                  eierInfo={tile.Bnr} 
                  innloggetBrukerInfo={this.state.innloggetBruker}/>
                } />
          ))} 
      
          </Grid>
            <Grid item >
          <this.ConditionalButton/>
          {this.state.hallo}
          </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom>
            {info.Beskrivelse}
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small" style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Kategori: </TableCell>
                  <TableCell align="left">Dato: </TableCell>
                  <TableCell align="left">Tid: </TableCell>
                  <TableCell align="left">Sted: </TableCell>
                  <TableCell align="left">
                    <Popup
                      size="small"
                      color="primary"
                      trigger={
                        <Button size="small" color="primary">
                          Påmeldte
                        </Button>
                      }
                      position="left center"
                    >
                      <SingleLineGridList 
                      Enr = {this.props.Enr}
                      innloggetBruker = {this.props.innloggetBruker}
                      påmeldtListe = {this.state.påmeldtListe}
                      loggUt = {this.props.loggUt}
                      onClose={this.props.onClose}/>
                    </Popup>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">{info.Kategori}</TableCell>
                  <TableCell align="left">
                    {info.FraDato} til {info.TilDato}
                  </TableCell>
                  <TableCell align="left">{info.Klokkeslett}</TableCell>
                  <TableCell align="left">{info.Adresse}</TableCell>
                  <TableCell align="left">{info.antallPåmeldte}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    });
  }
}

//Classe for å poste en kommentar på eventet du ser på

class PostKommentar extends React.Component {
  state = {
    tekst: "",
    kommentar: [],
    brukere: []
  };

  handleChange = event => {
    this.setState({ tekst: event.target.value });
  };

  handleSubmit = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventer.no/main.php",
      params: {
        funksjonsnavn,
        tabell,
        kollonen,
        verdien,
        where
      },
      timeout: 5000
    })
      .then(res => {
        this.skrivUtKommentar("kommentarSinBruker", this.props.Enr, "", "", "");
      })
      .catch(err => console.error(err));
  };

  lagSql = e => {
    var ENr = this.props.Enr;
    var BNr = this.props.Bnr;
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var sqlVerdiene =
      ENr + "," + BNr + ",'" + this.state.tekst + "','" + time + "'";

    this.handleSubmit(
      "settInnRad",
      "kommentar",
      "Arrangement_ENr, Brukere_Bnr,Tekst,KL",
      sqlVerdiene,
      ""
    );
  };

  skrivUtKommentar = (funksjonsnavn, tabell, kollonen, verdien, where) => {
    axios({
      method: "get",
      url: "https://boeventer.no/main.php",
      params: {
        funksjonsnavn,
        tabell,
        kollonen,
        verdien,
        where
      },
      timeout: 5000
    }).then(res => {
      this.setState({ kommentar: res.data });
    });
  };

  componentDidMount() {
    //Her er eventnummeret som bestemmer hvilke kommentarer som skal vises

    var ENr = this.props.Enr;
    this.skrivUtKommentar("kommentarSinBruker", ENr, "", "", "");
  }

  render() {
    return (
      <div>
        <form
          style={{
            "& .MuiTextFieldRoot": {
              margin: "8",
              width: "100%",
              maxWidth: "75ch"
            }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-textarea"
            label="Skriv en kommentar"
            multiline
            onChange={this.handleChange}
            required
            fullWidth
            margin="normal"
          />
        </form>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={this.lagSql}
        >
          Post
        </Button>

               <List>
        {this.state.kommentar.map(kommentar => (
          <div key={kommentar.KNr}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" src={kommentar.Avatar} />
              </ListItemAvatar>
              <ListItemText
                primary=  {<AlertDialog
                            enVariant="text"
                            beskrivelse={<div>{kommentar.Fornavn}</div>}
                            innhold={<ProfilSide
                            lukkKart = {this.props.lukkKart}
                            loggUt = {this.props.loggUt}
                            close = {this.props.onClose}
                            eierInfo={kommentar.Brukere_Bnr} 
                            innloggetBrukerInfo={this.props.innloggetBrukerInfo}/>}
                         />}
                secondary={kommentar.Tekst}
              />
            </ListItem>
            <Divider variant="inset" />
          </div>
        ))}
      </List>
              
             
            
      </div>
    );
  }
}

function SimpleExpansionPanel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.eventsInfo}>
        <RenderText 
        Enr = {props.Enr}
        innloggetBruker = {props.innloggetBruker}
        loggUt = {props.loggUt}
        onClose={props.onClose}
        bilde = {props.bilde}/>
      </div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography /*classes={classes.heading}*/>Kommentarer</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List className={classes.root}>
            <PostKommentar 
            Enr = {props.Enr}
            Bnr = {props.innloggetBruker[2]}
            innloggetBrukerInfo = {props.innloggetBruker}
            loggUt = {props.loggUt}
            onClose={props.onClose}
            />

          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

const useStylesModal = makeStyles(theme => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    minWidth: 700,
    minHeight: 500,
    maxHeight: "90%",
    overflow: "auto",
    backgroundColor: "White",
    borderRadius: "25px",
    boxShadow: theme.shadows[5],
    marginRight: "50%",
    padding: theme.spacing(2, 2, 2)
  }
}));

export default function SimpleModal(props) {
  const classes = useStylesModal();
  const [open, setOpen] = React.useState(true);



  const handleClose = () => {
    setOpen(false);
    if(props.onClose != null){
    props.onClose(); 
    }else{
      props.lukkKart(); 
    }
  };

  const body = (
    <div className={classes.paper}>
      <SimpleExpansionPanel 
      Enr = {props.Enr}
      innloggetBruker = {props.innloggetBruker}
      loggUt = {props.loggUt}
      onClose={props.onClose}
      bilde = {props.bilde}
      />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
