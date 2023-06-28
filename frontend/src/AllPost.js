import * as React from "react"
import { Card, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
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
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FlagIcon from '@mui/icons-material/Flag';
// import { styled } from '@mui/system';
import { Icon } from '@mui/material';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CommentIcon from '@mui/icons-material/Comment';
import { styled, alpha } from '@mui/material/styles';

const StyledIcon = styled(Icon)(({ theme }) => ({
color: theme.palette.primary.main,
transition: 'color .3s, filter .3s',

'&:hover': {
  color: theme.palette.secondary.main,
  filter: 'brightness(80%)',
},
}));

// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   }));

export default  function AllPost(){
    const [postdata,setpostdata] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [com, setcom] = React.useState(false);
    const [postcontent, setpostcontent] = React.useState('');
    const [inn, setinn] = React.useState(true);
    const [comcontent,setcomcontent] =  React.useState('')
    const [comtemp,setcomtemp] = React.useState('')

  const handleClickkk = () => {
    setinn(!inn);
  };

  function handleClickcom (props){
    setcom(!com);
    setcomtemp(props)
    console.log(com)
  };

  function handleClosecom(){
    setcom(false);
  }

    const imageUrl = 'https://img.freepik.com/free-vector/cute-bad-cat-wearing-suit-sunglasses-with-baseball-bat-cartoon-icon-illustration-animal-fashion-icon-concept-isolated-flat-cartoon-style_138676-2170.jpg?w=2000';
    var x = window.localStorage.getItem('allpost')

          React.useEffect(() => {
            async function getData() {
                console.log(x)
              const res = await axios.post('/api/allgredditpostpage', {name : x})
              console.log(res.data.y[0])
              setpostdata(res.data.y[0])
              console.log('done requesting')
            }
            getData()
          }, [])

    const handleClosee = () => {
    setOpen(false);
    };

    function postsubgre(){
        setOpen(true);
    }

    var emailx = window.localStorage.getItem('email')

    async function handleCreatePost(){
        const response = await fetch('/api/allgredditaddpost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailx,
                postcontent,
                x
            }),
          })   
          console.log('yess') 
          const data = await response.json() 
          setOpen(false);

          const res = await axios.post('/api/allgredditpostlist', {name: x})             
                console.log(res.data)

                setpostsin(res.data);
                console.log(postsin)
    }

    const [postsin,setpostsin] = React.useState([])
    React.useEffect(() => {
        async function getData() {
                const res = await axios.post('/api/allgredditpostlist', {name: x})             
                console.log(res.data)

                setpostsin(res.data);
                console.log(postsin)
                
                }
                getData()
    }, [])

    // window.localStorage.setItem('emailofuserwhoopenedpost',)


    async function handleUpvote(props){

        var postnamee = props
        console.log(postnamee)

        const response = await fetch('/api/allgredditupVote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailx,
                postnamee,
            }),
          })   
          console.log('yess') 
          const data = await response.json()   
          
          const res = await axios.post('/api/allgredditpostlist', {name: x})             
                console.log(res.data)
                setpostsin(res.data);
                console.log(postsin)
    }

    async function handleDownvote(props){
            var postnamee = props
            console.log(postnamee)

            const response = await fetch('/api/allgredditdownVote', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailx,
                    postnamee,
                }),
            })   
            console.log('yess') 
            const data = await response.json()              
            const res = await axios.post('/api/allgredditpostlist', {name: x})             
                    console.log(res.data)
                    setpostsin(res.data);
                    console.log(postsin)
    }
    async function handleSavepost(props){
        var postnamee = props
        console.log(postnamee)
        const response = await fetch('/api/allgredditsaveposts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailx,
                postnamee,
            }),
        })   
        console.log('yess') 
        const data = await response.json() }

    async function handlePostCom(props){
        var postnamee = props
        console.log(postnamee)
        const response = await fetch('/api/allgredditaddcomment', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comcontent,
                comtemp,
            }),
        })   
        console.log('yess') 
        const data = await response.json()
        const res = await axios.post('/api/allgredditpostlist', {name: x})             
                    console.log(res.data)
                    setpostsin(res.data);
                    console.log(postsin)
                    {}
    }
    return(
        <>
        <h3>'{window.localStorage.getItem('allpost')}' Greddit</h3>
        <Card variant="outlined">
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <CardMedia
                component="img"
                height="400"
                image={imageUrl}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                alt="Example image"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {/* be{bull}nev{bull}o{bull}lent */}
                    {window.localStorage.getItem('allpost')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    "{postdata.content}"
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <PeopleIcon />
                        {postdata && <Typography >{postdata.followers.length} ppl</Typography>}
                    </Grid>
                    <Grid item xs={3}>
                        <ChatBubbleIcon />
                        <Typography >Posts</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <AccessTimeFilledIcon />
                        <Typography >{postdata.date}</Typography>
                    </Grid>
                </Grid>
                <Typography>
                        Ban words:
                    {postdata && postdata.bans.map((banItem,index) => {
                        return (
                            <Chip label={banItem} variant="outlined" />
                            )
                        })}
                    </Typography>
            </CardContent>
        </Grid>
        </Grid>
        </Card>
        <div style={{ paddingRight: 16 ,paddingTop: 15}}>
        {postsin && postsin.map((post) => (
            <Card sx={{ maxWidth: 755,marginLeft: 'auto' ,marginTop: 5 ,border: '1px solid black'}}>
                {                   
                <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                by {post.user}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                               {post.content}
                            </Typography>
                        </CardContent>
                        <Box sx={{paddingTop : 0.2}}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <FavoriteIcon
                                    onClick = {() => handleSavepost(post.content)}/>    
                                </Grid>
                                <Grid item xs={4}>
                                    <ArrowCircleUpIcon 
                                    onClick = {() => handleUpvote(post.content)}/>
                                    <Typography >{post.upvotes.length}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <ArrowCircleDownIcon
                                    onClick = {() => handleDownvote(post.content)}/>
                                    <Typography >{post.downvotes.length}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <PersonAddIcon/>
                                </Grid>
                                <Grid item xs={4}>
                                    <AddCommentIcon
                                    onClick={() => handleClickcom(post.content)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FlagIcon/>
                                </Grid>
                            </Grid>
                            </Box>
                        </Box>   
                        <div style={{border: '1px solid gray', padding: '0.2px'}}>
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

        <Dialog open={com} onClose={handleClosecom} width='100%'>
                <DialogTitle>Add Post....</DialogTitle>
                <DialogContent>
               
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Post Content*"
                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(event)=> setcomcontent(event.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClosecom}>Cancel</Button>
                <Button 
                    disabled = {!comcontent}
                    onClick={handlePostCom}
                    >Post</Button>
                </DialogActions>
            </Dialog>       
        <Dialog open={open} onClose={handleClosee} width='100%'>
                <DialogTitle>Add Post....</DialogTitle>
                <DialogContent>             
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Post Content*"
                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(event)=> setpostcontent(event.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClosee}>Cancel</Button>
                <Button 
                    disabled = {!postcontent}
                    onClick={handleCreatePost}
                    >Post</Button>
                </DialogActions>
            </Dialog>
            <Fab color="primary" aria-label="add" 
            onClick={postsubgre}
            sx={{position: "fixed",bottom: 20, right: 20}}>
                <AddIcon />
            </Fab>

        </>
    )
}