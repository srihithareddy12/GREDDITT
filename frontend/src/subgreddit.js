import * as React from "react"
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import { SettingsBackupRestoreRounded } from "@mui/icons-material";
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Subgreddit(){

   const navigate = useNavigate()

    const [name,setname] = React.useState('')
    const [content,setcontent] = React.useState('')
    const [tag,settag] = React.useState('')
    const [tags,settags] = React.useState([])
    const [ban,setban] = React.useState('')
    const [bans,setbans] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [delname,setdelname] = React.useState('')
    // const [email,setemail] = React.useState('')

    // setemail(window.localStorage.getItem('email'))

    const email = window.localStorage.getItem('email')
   

const theme = createTheme();

    const handleClose = () => {
      setOpen(false);
    };

    function postsubgre(){
        setOpen(true);
    }
    function addtags(){
        settags(prevtags => {
            return[...prevtags,tag]
        })
        settag('')
    }
    function addbans(){
        setbans(prevbans => {
            return[...prevbans,ban]
        })
        setban('')
    }
    async function handleCreate(){
        const response = await fetch('/api/subgreddit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              name,
              content,
              tags,
              bans,
            }),
          })   
          console.log('yess') 
          const data = await response.json() 

          console.log(email)


          setOpen(false);
          async function getData() {
            console.log(email)
            const res = await axios.post('/api/subgredditlist', {email: email})
            setData(res.data);
          }
          getData()
    }
    async function handledel(event){
        setdelname(event.target.name)
        console.log(delname)

        const tagg = event.target.name
        console.log(tagg)

        const response = await fetch('/api/subgredditdel', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              tagg,
            }),
          })   
          console.log('deleted') 
          const data = await response.json() 

          async function getData() {
            const res = await axios.post('/api/subgredditlist', {email: email})
            setData(res.data);
          }
          getData()
    }

    function handleOpenPost(event){
      console.log('apppl')
      window.localStorage.setItem('postname',event.target.name)
      navigate('/profile/subgreddit/openpost')
    
    }


    const [data, setData] = React.useState([]);
    React.useEffect(() => {
      async function getData() {
        const res = await axios.post('/api/subgredditlist', {email: email})
        setData(res.data);
        
        // console.log(res.data[1].name)
        // setfname(res.data.userinfo.fname)
        // console.log(fname)
        // console.log(data)
      }
      getData()
    }, [])


    return(
        <div>

<ThemeProvider theme={theme}>
      <CssBaseline />
      <main>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  {/* <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.content}
                    </Typography>
                    <Typography>
                        Tags:
                    {card.tags.map((tagItem,index) => {
                        return (
                            <Chip label={tagItem} variant="outlined" />
                            )
                        })}
                    </Typography>
                    <Typography>
                        Ban words:
                    {card.bans.map((banItem,index) => {
                        return (
                            <Chip label={banItem} variant="outlined" />
                            )
                        })}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                        size="small"
                        onClick={handleOpenPost}
                        name = {card.name}
                        >Open</Button>
                    {/* {setdelname(card.name)} */}
                    <Button size="small" 
                            onClick={handledel}
                            name={card.name}
      
                    >Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box> */}
      {/* End footer */}
    </ThemeProvider>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
               
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Subgreddit name*"
                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(event)=> setname(event.target.value)}
                />
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Description*"
                    type="string"
                    fullWidth
                    variant="standard"
                    onChange={(event)=> setcontent(event.target.value)}
                />
                

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Tags"
                    type="string"
                    // fullWidth
                    style = {{width: 450}}
                    variant="standard"
                    value={tag}
                    onChange={(event)=> settag(event.target.value)}
                />
                <Fab color="primary" aria-label="add" size="small"
                    onClick={addtags}>
                    <AddIcon />
                </Fab>
                <Stack direction="row" spacing={1}>
                {tags.map((tagItem,index) => {
                    return (
                        <Chip label={tagItem} variant="outlined" />
                    )
                }
                )}
                </Stack>

                
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Banned words"
                    type="string"
                    style = {{width: 450}}
                    // fullWidth
                    variant="standard"
                    value={ban}
                    onChange={(event)=> setban(event.target.value)}
                />
                <Fab color="primary" aria-label="add" size="small"
                    onClick={addbans}>
                    <AddIcon />
                </Fab>
                <Stack direction="row" spacing={1}>
                {bans.map((banItem,index) => {
                    return (
                        <Chip label={banItem} variant="outlined" />
                    )
                }
                )}
                </Stack>


                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button 
                    disabled = {!content || !name}
                    onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
            <Fab color="primary" aria-label="add" 
            onClick={postsubgre}
            sx={{position: "fixed",bottom: 20, right: 20}}>
                <AddIcon />
            </Fab>
        </div>
    )
}