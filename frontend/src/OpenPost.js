import * as React from "react"
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ReportIcon from '@mui/icons-material/Report';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Listt from "./List";


const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};


export default function OpenPost(){

    const [value, setValue] = React.useState('recents');
    const [flag,setflag] = React.useState('');
    const [uflag,setuflag] = React.useState(false);
    const [sflag,setsflag] = React.useState(false);
    const [rtflag,setrtflag] = React.useState(false);
    const [data,setdata] = React.useState('');
    const [users,setusers] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  async function handleusers(){

    setflag('1')
    console.log('requestpage')
    var postname = window.localStorage.getItem('postname')

    const response = await fetch('/api/subgredditusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postname,    
        }),
      })   
      console.log('handledusers') 
      const users2 = await response.json() 
      console.log(users2[0])
      setusers(users2[0])
      // setdata(data2[0])
}

    async function handlerequests(){

        setflag('2')
        console.log('requestpage')
        var postname = window.localStorage.getItem('postname')

        const response = await fetch('/api/subgredditrequests', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              postname,    
            }),
          })   

          console.log('handledrequest') 
          const data2 = await response.json() 
          setdata(data2[0])
          setdata(data2[0])
    }

    async function handleAcceptReq(value){

        var postname2 = window.localStorage.getItem('postname')
        var requester = value
        console.log(requester)
            const response = await fetch('/api/subgredditaccrequests', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  postname2,  
                  requester , 
                }),
              })   
              console.log('handledrppppest') 

              const data2 = await response.json() 
              setdata(data2)
    }

    async function handleDelReq(){


      var postname2 = window.localStorage.getItem('postname')
      var requester = value
      console.log(requester)
          const response = await fetch('/api/subgredditdelrequests', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                postname2,  
                requester , 
              }),
            })   
            console.log('handleddellppppest') 

            const data2 = await response.json() 
            console.log(data2)
            setdata(data2)
    }

    return (
        <>
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Users"
        value="recents"
        onClick={handleusers}
        icon={<PeopleAltIcon />}
      />
      <BottomNavigationAction
        label="Requests"
        value="favorites"
        onClick={handlerequests}
        icon={<AddToHomeScreenIcon />}
      />
      <BottomNavigationAction
        label="stats"
        value="nearby"
        onClick={(event)=> setflag('3')}
        icon={<EqualizerIcon />}
      />
      <BottomNavigationAction
        label="Reported"
        value="nearbp"
        onClick={(event)=> setflag('4')}
        icon={<ReportIcon />}
      />
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
    { 
      flag === '1' && <> 
       { users.followers && users.followers.map((ff) => {
          <h3>{ff}</h3>
       })}
       { users.banned && users.banned.map((ff) => {
          <h3>{ff}</h3>
       })}
         <Listt
         name = {users} />
      </>
    }
    { 
      flag === '2'  && data && <> 
<Box sx={{ display: 'flex', justifyContent: 'center' }}>    
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      {data.requests.map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <>          
               <IconButton aria-label="comment"
                 onClick={() => handleAcceptReq(value)}
               name = {value}
               >
               <CheckIcon 
              
              />
            </IconButton>
 
            <IconButton aria-label="comment">
            <ClearIcon
              onClick = {handleDelReq}/>
            </IconButton> 
              </>
            
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
    </Box>
      </>
    }
    { 
      flag === '3' && <> 
      Blah 
      </>
    }
    { 
      flag === '4' && <> 
      Blah 
      </>
    }
    </>
      );
}