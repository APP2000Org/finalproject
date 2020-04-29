/*Laget Av Patrick S. Lorentzen
Dette er hvor all søkefunksjonalitet skjer. Når bruker skriver i søkefeltet eller trykker på kriterielisten. 
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  typography: {
    paddingBottom: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  kriterieStyling: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
}));

const byNavn = [
    'Herre',
    'Langesund',
    'Porsgrunn',
    'Haugesund',
    'Bø',
    'Notodden',
    'Gvarv',
    'Skien',
  ];

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

export default function Søkevalg(props) {

  let kriterieListe = props.kriterieListe;  

    function handleButtonClick(navn) {
  if(navn === 'fjern'){
  
    kriterieListe = ['','',''];
         
  } 
  
  props.søkeListe(kriterieListe,'');
  handleClose();
  }

  const handleChange = (e) => {

var index =-1; 

  if(e.target.name === 'dato')
    index = 0;
  else if(e.target.name === 'by')
  index = 1;
  else index = 2;

  kriterieListe[index] = e.target.value; 
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <MenuOpenIcon aria-describedby={id} variant="contained"  onClick={handleClick}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
    <Grid container className={classes.kriterieStyling} direction="column" justify="center"
          alignItems="flex-start" spacing={0}>
        <Grid item>
           <Typography className={classes.typography}>Velg søkekriterier</Typography>
           </Grid>
           <Grid item>
        <label>
            Fra Dato
            <br/>
        <TextField name="dato" placeholder={kriterieListe[0]} onChange={handleChange} id="demo-customized-textbox" />
        </label>
        </Grid>
        <br/>
        <Grid item>
        <label>
          By
          <br/>
          <select name="by" defaultValue={ kriterieListe[1] } onChange={handleChange}>
            <option value="">
             
            </option>
            {byNavn.map((byNavn) => (
            <option key={byNavn} value={byNavn}>
            {byNavn}
           </option>
          ))}
          </select>
        </label>
        </Grid>
        <br/>
        <Grid item>
        <label>
          Kategori
          <br/>
          <select name="kategori"  defaultValue={ kriterieListe[2] } onChange={handleChange}>
          <option value="">
             
            </option>
            {kategori.map((kategorinavn) => (
            <option key={kategorinavn} value={kategorinavn}>
            {kategorinavn}
           </option>
          ))}
            </select>
        </label></Grid>   <br/>

      <Grid item>
      <Button variant="contained" onClose={handleClose} name ="ferdig" color="primary" onClick={ () => handleButtonClick('ferdig')}>Ferdig</Button>
      <Button  name="fjern" color="primary" onClick={ () => handleButtonClick('fjern')}>Fjern</Button>
      </Grid>
    </Grid>
  </Popover>
</div>
  );
}