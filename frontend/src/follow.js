import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

// const emails = ['Baekhyun', 'Chanyeol' , 'suho' , 'sehun' , 'kyungsoo'];

function SimpleDialog(props) {

  console.log(props.Data)
  var ff = props.Nname
  var email = window.localStorage.getItem('email')

  const { onClose, selectedValue, open, Nname,data } = props;
  console.log(data)

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };


  async function handlefollow(prop){

    console.log('aaaa1')

    var specificp = prop
    const response = await fetch('/api/removefollow', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ff,
                specificp,
                email,
            }),
          })   
          console.log('yess') 
          const data = await response.json() 
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.Nname}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.Data && props.Data.map((email) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <DeleteIcon  
                  onClick={() => handlefollow(email)} 

                  />
                </Avatar>
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Add " + Nname} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  Nname: PropTypes.string.isRequired,
  Data: PropTypes.string.isRequired
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.name}
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        Nname={props.name}
        Data={props.data}
      />
    </div>
  );
}
