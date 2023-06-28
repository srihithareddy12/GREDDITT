import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate} from 'react-router-dom';
// import { LocalGasStationRounded, ReportGmailerrorred } from '@mui/icons-material';
// import { useHistory } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        GREDDIIT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignUp() {

  const [signstate, setsignstate] = React.useState(1)
  const [email,setemail] = React.useState('')
  const [password,setpass] = React.useState('')
  const [fname,setfname] = React.useState('')
  const [lname,setlname] = React.useState('')
  const [uname,setuname] = React.useState('')
  const [contact,setcontact] = React.useState('')
  const [age,setage] = React.useState('')
  // const history = useHistory()


  const navigate = useNavigate()
  // window.localStorage.setItem('loginstatus',true);

  function signinhandle() {
    setsignstate(2);
  }
  function signuphandle() {
    setsignstate(3);
  }


  async function handleSubmit(event) {
		event.preventDefault()

    if(signstate === 2){

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
      // email: email,
      // password: password,
			body: JSON.stringify({
				email,
				password
			}),
		}) 

		const data = await response.json() 

    if (data.user) {
			// localStorage.setItem('token', data.user)
			// alert('Login successful')
			// window.location.href = '/dashboard'
      window.localStorage.setItem('loginstatus', "true")
      window.localStorage.setItem('email',email)
      
			navigate('/profile')
		} else {
			alert('Please check your username and password')
		}
  
  
  }

    if(signstate === 3){

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          lname,
          uname,
          contact,
          age,
          email,
          password
        }),
      }) 
  
      const data = await response.json() 
    
      // if(data.user){
      //   alert('Login Succesful')
      //   navigate("/profile")
      // }
      if (data.status === 'ok') {
        window.localStorage.setItem('loginstatus', "true")
      window.localStorage.setItem('email',email)
			navigate('/profile')
		}

    }
	}
  
  if(window.localStorage.getItem("loginstatus") === 'true') return <Navigate to="/profile"/>
  else return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            GREDDIIT LOGIN/REGISTER
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={signuphandle}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={signinhandle}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {signstate === 3 &&
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(event)=> setfname(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={(event)=> setlname(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      name="userName"
                      autoComplete="family-name"
                      onChange={(event)=> setuname(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="age"
                      autoComplete="family-name"
                      onChange={(event)=> setage(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="contact"
                      label="Contact"
                      name="contact"
                      autoComplete="family-name"
                      onChange={(event)=> setcontact(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      onChange={(event)=> setemail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(event)=> setpass(event.target.value)}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </>
              }
{/* {console.log(typeof window.localStorage.getItem("loginstatus"))} */}
              {signstate === 2 &&
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(event)=> setemail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(event)=> setpass(event.target.value)}
                    />
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!(email) || !(password)}
                    // onClick={checkcred}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </>
              }

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>

            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}