import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ListItemButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function Listt(props) {
    console.log(props.name)
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItemButton divider>
        <ListItemText primary={props.name.email} />
        <VerifiedUserIcon/>
      </ListItemButton>
      <Divider />
      { props.name.followers && props.name.followers.map((ff) => {
          <ListItemButton divider>
        <ListItemText primary={ff} />
        <PersonIcon/>
      </ListItemButton>
       })}
       { props.name.banned && props.name.banned.map((ff) => {
          <ListItemButton divider>
        <ListItemText primary={ff} />
        <BlockIcon/>
      </ListItemButton>
       })}
    </List>
  );
}