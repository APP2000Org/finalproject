/*Laget av Patrick S. Lorentzen - 151685
og Sondre Reinholdtsen StudNr:225274 
Sørger for at profil Vinduet er ett vinduet der man kan velge mellom flere sider. */ 

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

//If setninger som skriver ut relevant info basert på brukerKlikk.
export default function MenuTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 0){
      props.skiftTilProfil(); 
    }
    if(newValue === 1){
    props.skiftTilLagde(); 
    }
    if(newValue === 2){
      props.skiftTilPåmeldt(); 
    }
    if (newValue === 3) {
     props.skiftTilVenner();
    }
  };
  
//Skriver ut brukerSiden og legger det inn på riktig sidevalg. 
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Generell Info" {...a11yProps(0)} />
          <Tab label="Lagde events" {...a11yProps(1)} />
          <Tab label="Påmeldt" {...a11yProps(2)} />
          <Tab label="Venner" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {props.brukerInfo}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.lagdeEvents}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.påmeldteEvents}
      </TabPanel>
      <TabPanel value={value} index={3}>
      {props.venner}
      </TabPanel>
    </div>
  );
}
