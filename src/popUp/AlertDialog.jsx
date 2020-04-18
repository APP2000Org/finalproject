import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant={props.enVariant} color="inherit" onClick={handleClickOpen} style={{margin:10}}>
       {props.beskrivelse}
      </Button>

      {/*denne dialogboksen blir vist når knapp er trykket på*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.innhold}
      </Dialog>
    </div>
  );
}