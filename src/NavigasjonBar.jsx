import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AlertDialog from './popUp/AlertDialog.jsx';
import InputBase from "@material-ui/core/InputBase";
import LogIn from './popUp/LogIn.jsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Søkevalg from './popUp/Søkevalg.jsx';
import ProfilSide from './popUp/ProfilSide.jsx';
import MenuTabs from './popUp/MenuTabs.jsx';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  brukerBlokk: {
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25) //Får den til å endre farge ved hover
    }
  },
}));


export default function ButtonAppBar(props) {

  function HandleSkrivSøkefelt(e){
    var søkeTekst = e.target.value;
    props.søkeFunksjon(søkeTekst);
     }
     
    // function søkeKriterier2(enTekst){
       //props.søkeListe(enTekst)
     //  props.søkeListe(enTekst)
    // }

     const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loggin = <LogIn 
  loggInnFunksjon = {props.loggInnFunksjon}/>;

  function UserField(props) {
    const erInnlogget = props.erInnlogget;
  
    if (erInnlogget) {
    return <Grid className={classes.brukerBlokk}
     container
    direction="row"
    justify="flex-end"
    alignItems="center"
    spacing={5}
    style={{margin:10}}
    onClick={handleClickOpen}
    ><p style={{margin:10}}>{props.navn}</p><AccountCircleIcon/></Grid>;
    }
    return <AlertDialog
    beskrivelse="Logg inn"
    enVariant='text'
  innhold = {loggin}
  />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            Eventer
          </Typography>
         <Søkevalg
         søkeListe = {props.søkeListe}
         kriterieListe = {props.kriterieListe}
          />
          <div className={classes.search}>
          <InputBase 
              placeholder="Søk eventer"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={HandleSkrivSøkefelt}
            />
            </div>
           
        <UserField
        erInnlogget = {props.innlogget}
        navn = {props.BrukerNavn}
        />
        </Toolbar>
      </AppBar>

      {/*denne dialogboksen blir vist når event er trykket på*/}
      <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <ProfilSide
innloggetBrukerInfo = {[props.innlogget,props.BrukerNavn,props.Bnr]}
  loggUt = {props.loggUt}
  close = {handleClose}
  />
  </Dialog>
    </div>
  );
}
/*
<ProfilSide 
   loggUt = {props.loggUt}
   close = {handleClose}
   innlogget = {props.innlogget}
BrukerNavn= {props.BrukerNavn}
Bnr = {props.Bnr}
/>
*/