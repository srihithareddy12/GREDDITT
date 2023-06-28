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
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function Allgreddit(){

    const [name,setname] = React.useState('')
    const [content,setcontent] = React.useState('')
    const [tag,settag] = React.useState('')
    const [tags,settags] = React.useState([])
    const [alltags,setalltags] = React.useState([])
    const [tottags,settottags] = React.useState([])
    const [ban,setban] = React.useState('')
    const [bans,setbans] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [delname,setdelname] = React.useState('')
    const [inputText, setInputText] = React.useState("");
    const [flag, setFlag] = React.useState(true);
    const [flag2, setFlag2] = React.useState(true);
    const [flag3, setFlag3] = React.useState(true);
    const [sortType, setSortType] = React.useState('');
    const [click,setclick] = React.useState([true])
    const [selectedtag,setselectedtag] = React.useState('');
    const [joindialog,setjoindialog] = React.useState(false)
    const unitags = []

    const navigate = useNavigate()

    const [data, setData] = React.useState([]);
    React.useEffect(() => {
      async function getData() {
    
        console.log(email)
        const res = await axios.post('/api/allgredditlist', {email: email})
        
      console.log(res.data)
      setData(res.data);

    console.log(alltags)
    setalltags([])
       
      res.data.map((all)=> (
          all.tags.map((tag)=> (
            setalltags((prevValue) => {
            return[...prevValue,tag]}
            )
            ))
      ))
        console.log(res.data)
            var tlist = alltags
            console.log(tlist)
  console.log(alltags)
  
      }
      getData()
    }, [])


    const [data2, setData2] = React.useState([]);
    const [alltags2,setalltags2] = React.useState([])
    React.useEffect(() => {
      async function getData2() {
    
        console.log(email)
        const res = await axios.post('/api/allgredditlist2', {email: email})
        
      console.log(res.data)
      setData2(res.data);

    console.log(alltags2)
    setalltags2([])
       
      res.data.map((all)=> (
          all.tags.map((tag)=> (
            setalltags2((prevValue) => {
            return[...prevValue,tag]}
            )
            ))
      ))
        console.log(res.data)

            var tlist = alltags2
            console.log(tlist)
  console.log(alltags2)
      }
      getData2()
    }, [])

    const [data3, setData3] = React.useState([]);
    const [alltags3,setalltags3] = React.useState([])
    React.useEffect(() => {
      async function getData3() {
    
        console.log(email)
        const res = await axios.post('/api/allgredditlist3', {email: email})
        
      console.log(res.data)
      setData3(res.data);

    console.log(alltags3)
    setalltags3([])
       
      res.data.map((all)=> (
          all.tags.map((tag)=> (
            setalltags3((prevValue) => {
            return[...prevValue,tag]}
            )
            ))
      ))
        console.log(res.data)

            var tlist = alltags3
            console.log(tlist)
  console.log(alltags3)
      }
      getData3()
    }, [])
    
    console.log(click)
    const chiphandleClick = () => {
      console.info('You clicked the Chip.');
      setclick(!click)
    };

    const email = window.localStorage.getItem('email')

    const [state, setState] = React.useState({
      openn: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, openn } = state;
  
    const handleClick = (newState) => () => {
      setFlag2(!flag)
      const sorted = [...data].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setData(sorted);
    };

    const handleClick2 = (newState) => () => {
      setFlag2(!flag2)
      const sorted = [...data].sort((a, b) => (a.name > b.name) ? -1 : 1);
        setData(sorted);
    };

    const handleClick3 = (newState) => () => {
      setFlag3(!flag3)
      const sorted = [...data].sort((a, b) => (a.date2 > b.date2) ? -1 : 1);
        setData(sorted);
    };
  
    const handleClose = () => {
      setState({ ...state, openn: false });
    };

    console.log(tags)
  
    const buttons = (
      <React.Fragment>
       
       <Button
          onClick={handleClick({
            vertical: 'top',
            horizontal: 'right',
          })}
          color={flag ? "primary" : "secondary"}
        >
          Ascending
        </Button>

        <Button
          onClick={handleClick2({
            vertical: 'top',
            horizontal: 'right',
          })}
          color={flag2 ? "primary" : "secondary"}
        >
          Descending
        </Button>
        <Button
          onClick={handleClick3({
            vertical: 'top',
            horizontal: 'right',
          })}
          color={flag2 ? "primary" : "secondary"}
        >
          Recent
        </Button>
     
      </React.Fragment>
    );
   

const theme = createTheme();

    const handleClosee = () => {
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

    
    async function handledel(event){
      alert('Deleting')
        
        setdelname(event.target.name)
        console.log(delname)

        const tagg = event.target.name
        console.log(tagg)

        const response = await fetch('/api/allgredditleave', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tagg,
            }),
          })   
          console.log('deleted') 
          const data = await response.json() 

          async function getData() {
            const res = await axios.post('/api/allgredditlist', {email:email})
            setData(res.data);
          }
          getData()
    }

    async function handleJoinRequest(event){
      setjoindialog(true)
      alert('join request is sent')
      var postname = event.target.name
      // console.log(event.target.name)
      const response = await fetch('/api/allgredditjoin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              postname,
              email,
            }),
          }) 
          console.log('done requesting')
    }

    function Tags(props) {
      const handleClick = () => {
        console.log("You clicked the Chip.");

        setType(deletable);
      };
    
      const handleDelete = () => {
        console.log("You deleted the chip");
        setType(clickable);
      };
    
      const clickable = {
        label: props.tag,
        onClick: handleClick,
        variant: "outlined"
      };
      const deletable = { label: props.tag, onDelete: handleDelete };
      const [type, setType] = React.useState(clickable);
      return (
      <>
      <Chip {...type} />
      </>)
      ;
    }

    function Openpostt(event)
    {
      window.localStorage.setItem('allpost',event.target.name)
      navigate('/profile/allgreddit/post')
    }

    function handlejoinalert()
    {

    }


    // settottags(...alltags3,...alltags2,...alltags)
    return(
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <Toolbar>

            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={event => setInputText(event.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          </Toolbar>
          </Box>

          {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openn}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />


<Stack direction="row" spacing={1}>
                { alltags && [...new Set(alltags)].map((tagItem, index) => {
                        return (
                          <Tags tag={tagItem}/> )                  
                }
                )}
                { alltags2 && [...new Set(alltags2)].map((tagItem, index) => {
                        return (
                          <Tags tag={tagItem}/> )                  
                }
                )}

            </Stack>

<ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          {/* <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {window.localStorage.getItem('fName')}  {window.localStorage.getItem('fName')}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={5}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container> */}
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            { 
            data.filter(post => {
                 

                  if (!selectedtag && inputText === '') {
                    // console.log('q')
                    // console.log(selectedtag)
                    // console.log(post.tags)
                    return post;
                  }
                  else if (post.tags.includes(selectedtag)){
                    // console.log(post.tags)
                    // console.log('p')
                    return post;
                 }
                   else if (post.name.toLowerCase().includes(inputText.toLowerCase())) {
                    return post;
                  }
                }).map((card) => (
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
                    <Typography>
                      {card.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"
                    onClick={Openpostt}
                    name={card.name}
                    >OPEN</Button>
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
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            { 
             data3 && data3.filter(post => {
                 

                  if (!selectedtag && inputText === '') {
                    // console.log('q')
                    // console.log(selectedtag)
                    // console.log(post.tags)
                    return post;
                  }
                  else if (post.tags.includes(selectedtag)){
                    // console.log(post.tags)
                    // console.log('p')
                    return post;
                 }
                   else if (post.name.toLowerCase().includes(inputText.toLowerCase())) {
                    return post;
                  }
                }).map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
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
                    <Typography>
                      {card.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"
                    onClick={Openpostt}
                    name={card.name}
                    >OPEN</Button>
                    {/* {setdelname(card.name)} */}
                    <Button size="small" 
                            onClick={handledel}
                            name={card.name}
                    >LEAVE</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            { 
            data2.filter(post => {
                 

                  if (!selectedtag && inputText === '') {
                    // console.log('q')
                    // console.log(selectedtag)
                    // console.log(post.tags)
                    return post;
                  }
                  else if (post.tags.includes(selectedtag)){
                    // console.log(post.tags)
                    // console.log('p')
                    return post;
                 }
                   else if (post.name.toLowerCase().includes(inputText.toLowerCase())) {
                    return post;
                  }
                }).map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  
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
                    <Typography>
                      {card.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                        size="small"
                        onClick={handleJoinRequest}
                        name={card.name}
                        >Join</Button>
                    {/* <Dialog open={joindialog} onClose={handlejoinalert}>
                      <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Your join request is sent to the moderator.
                      </Alert>
                    </Dialog> */}


                    {/* {setdelname(card.name)} */}
                    {/* <Button size="small" 
                            onClick={handledel}
                            name={card.name}
      
                    >Delete</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

      </main>
     
    </ThemeProvider>
   
        </div>
    )
}