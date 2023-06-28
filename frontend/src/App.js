import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from "./NavBar"
import Profile from "./Profile"
import Home from "./Home"
import Subgreddit from './subgreddit';
import Allgreddit from './allgreddit';
import OpenPost from './OpenPost'
import AllPost from './AllPost';
import Savedpage from './Savedpage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  if(!window.localStorage.getItem("loginstatus")) window.localStorage.setItem("loginstatus", "false")

  let defaultPath = "/"
  if(window.localStorage.getItem("loginstatus") === "true") defaultPath = "/profile"

  return (
    <>
    <NavBar />
      <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to={defaultPath}/>} />
            <Route path="/profile/subgreddit" element={<Subgreddit/>} />
            <Route path="/profile/allgreddit" element={<Allgreddit/>} />
            <Route path="/profile/saved" element={<Savedpage/>} />
            <Route path="/profile/subgreddit/openpost" element={<OpenPost/>} />
            <Route path="/profile/allgreddit/post" element={<AllPost/>} />
            

      </Routes>
  </>
  );
}

export default App;
