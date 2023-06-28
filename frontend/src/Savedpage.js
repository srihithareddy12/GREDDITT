import * as React from "react"
import axios from 'axios';
import Box from '@mui/material/Box';
import { Card, CardMedia } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CommentIcon from '@mui/icons-material/Comment';

import { styled } from '@mui/system';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';


export default function Savedpage(){

    const [posts,setposts] = React.useState([])
    const [inn, setinn] = React.useState(true);

        const handleClickkk = () => {
            setinn(!inn);
        };

    var email = window.localStorage.getItem('email')

    React.useEffect(() => {
        async function getData() {
            console.log('ffffffffff')
          const res = await axios.post('/api/showsaveposts', {email : email})

          console.log(res.data)
          setposts(res.data)
          console.log('done requesting')
        }
        getData()
      }, [])


      async function handleunsavepost(props){
        var postcontent = props
        console.log(postcontent)
        const response = await fetch('/api/unsavepost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postcontent,
                email,
            }),
          })   
          console.log('yess') 
          const data = await response.json() 

      }

    return(
        <>
        
        <h1>---Saved Posts</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        {posts && posts.map((post) => (
            <Card sx={{ width: 755 ,marginTop: 3}}>
                {  <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                by {post.user}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                               {post.content}
                            </Typography>
                        </CardContent>
                        <Box sx={{paddingTop : 1,paddingRight: 3}}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <BookmarkRemoveIcon
                                    onClick = {() => handleunsavepost(post.content)}/>    
                                </Grid>
                            </Grid>
                            </Box>
                        </Box>  
                        <div style={{border: '1px solid black', padding: '10px'}}>
                        <List   sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                component="nav"
                                aria-labelledby="nested-list-subheader">
                                <ListItemButton onClick={handleClickkk}>
                                <ListItemIcon>
                                    <CommentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Comments" />
                                {inn ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={inn} timeout="auto" unmountOnExit>
                                <List component="div">
                                    {post.comments.map((comm)=> (

                                            <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary={comm} />
                                            </ListItemButton>
                                    ))}
                                </List>
                                </Collapse>
                        </List>
                        </div>
                    </>                                  
                }           
            </Card> 
        ))}       
        </div> 
        </>
    )
}