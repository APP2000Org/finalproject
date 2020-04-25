import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Badge from "@material-ui/core/Badge";
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import GroupIcon from '@material-ui/icons/Group';
import EventSide from './popUp/EventSide.jsx';


/*
const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});
*/
function påmeldtKnapp(){

  //if()
}

function handleChange(){
  alert("Dette er en test"); 
  console.log("Dette er inni bli med click");
}

export default function EventListe(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const eventInfo = [props.Enr,props.lagetAv, props.sted,props.tittel,props.dato,props.tilDato,props.adresse,props.klokkeslett,props.beskrivelse,
  props.frontBilde,props.antPåmeldte];


  return (
    <div>
    <Card style={{maxWidth:345, padding:10, maxHeight:345, minWidth:350,minHeight:350}} onClick={handleClickOpen}>    
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image = "/iconer/fest.png"//{props.frontBilde}
          title="Contemplative Reptile"
        />
        <CardContent>
        <Typography gutterBottom variant="overline" component="h2">
          {props.dato}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          {props.tittel}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.beskrivelse}
     
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
      
        <Button size="small" color="primary">
          Se mer
        </Button>
        <Badge badgeContent={props.antPåmeldte} color="primary" style={{marginLeft:150}}>
        <GroupIcon/>
        </Badge>
      </CardActions>
    </Card>

    {/*denne dialogboksen blir vist når event er trykket på*/}
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
   <EventSide
   innloggetBruker={props.innloggetBruker}
   info = {eventInfo}/>
  </Dialog>
  </div>
  );
}