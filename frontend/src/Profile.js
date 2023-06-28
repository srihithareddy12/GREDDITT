import * as React from "react"
import "./Blah.css"
import { useNavigate, Navigate } from 'react-router-dom';
import Follow from "./follow"
import Formedit from "./formedit"
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Blah() {
  const navigate = useNavigate()

  

  const [open, setOpen] = React.useState(false);


  const [email,setemail] = React.useState('')
  // const [password,setpass] = React.useState('')
  const [fname,setfname] = React.useState('')
  const [lname,setlname] = React.useState('')
  // const [uname,setuname] = React.useState('')
  const [contact,setcontact] = React.useState('')
  const [age,setage] = React.useState('')
  const [followers,setfollowers] = React.useState([])
  const [following,setfollowing] = React.useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function HandleClose(event){

    

    const response = await fetch('/api/editprofile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
      // email: email,
      // lname : lname,
      //  fname: fname,
      //  age: age,
      //  contact: contact,
     
			 body: JSON.stringify({
				email,
        lname,
        fname,
        age,
        contact,
			}),
		}) 
    console.log('appple')

		const editteddata = await response.json()
    console.log(editteddata) 
    setOpen(false);

  };

 

  console.log('apppp')

  const [data, setData] = React.useState({});

  console.log(window.localStorage.getItem("email"))

  const blah = { email: window.localStorage.getItem("email") }
  React.useEffect(() => {
    async function getData() {
      const res = await axios.post('/api/profile', blah)
      console.log('allll')
      setData(res.data.userinfo);
      console.log(res.data.userinfo)
      setfname(res.data.userinfo.fname)
      setlname(res.data.userinfo.lname)
      setemail(res.data.userinfo.email)
      setcontact(res.data.userinfo.contact)
      setage(res.data.userinfo.age)
      setfollowers(res.data.userinfo.followers)
      setfollowing(res.data.userinfo.following)
    }
    getData()
  }, [])

  if (window.localStorage.getItem("loginstatus") === 'false') return <Navigate to="/" />

  else return (
    <div className="container">
      <div className="main-body">

        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdncKcSzUugXXfW3MYhG2JoMmN4xo6z35u1w&usqp=CAU" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>{fname}  {lname} </h4>
                    <p className="text-secondary mb-1">@{data.uname}</p>
                    <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                    <div className="row">
                      <div className="col"><Follow name="Followers" data = {data.followers}/></div>
                      <div className="col"><Follow name="Following" data = {data.following}/></div>
                    </div>
                    {/* <button className="btn btn-outline-primary">Message</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                  <span className="text-secondary">https://srihtha.com</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                  <span className="text-secondary">Baekhyun</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                  <span className="text-secondary">@Srihitha_mallepalli</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                  <span className="text-secondary">Srihitha</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                  <span className="text-secondary">Srihitha</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {fname}  {lname}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {data.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {contact}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {age}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">USERNAME</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    @{data.uname}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    {/* <a className="btn btn-info " target="__blank" onClick={Formedit}>Edit</a> */}
                    <Button variant="outlined" onClick={handleClickOpen}>
                      Edit
                    </Button>
                    <Dialog open={open} onClose={HandleClose}>
                      <DialogTitle>Subscribe</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To subscribe to this website, please enter your email address here. We
                          will send updates occasionally.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="email"
                          label="Email Address"
                          type="email"
                          fullWidth
                          variant="standard"
                          onChange={(event)=> setemail(event.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="fname"
                          label="First Name"
                          type="string"
                          fullWidth
                          variant="standard"
                          onChange={(event)=> setfname(event.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="lname"
                          label="Last Name"
                          type="string"
                          fullWidth
                          variant="standard"
                          onChange={(event)=> setlname(event.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="contact"
                          label="Contact Number"
                          type="number"
                          fullWidth
                          variant="standard"
                          onChange={(event)=> setcontact(event.target.value)}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="age"
                          label="Age"
                          type="number"
                          fullWidth
                          variant="standard"
                          onChange={(event)=> setage(event.target.value)}
                        />
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={HandleClose}>Save</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}