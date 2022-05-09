import React, { useState ,useEffect} from "react";
import {Switch, Route , Link, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";
import Appbar from './components/Appbar';
import Youtube from './components/Youtube'







const App = ()=>{
  

  const [showModeratorBoard,setShowMode] = useState(false)
  const [showAdminBoard,setShowadmin]=useState(false)
  const [currentUser,setCurrentUser] = useState(undefined)
  const logOut=()=> {
    AuthService.logout();
    
    setShowMode(false)
    setShowadmin(false)
    setCurrentUser(undefined)
  }

  useEffect(()=>{
    const user = AuthService.getCurrentUser();
   
    console.log(user)
    if (user) {
     
      setCurrentUser(user)
      setShowMode(user.roles.includes("ROLE_MODERATOR"))
      setShowadmin(user.roles.includes("ROLE_ADMIN"))
      
    }
    
    EventBus.on("logout", () => {
      logOut();
    });

    return()=>{
      EventBus.remove("logout");
    }
  },[])

  
 


  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-black">
      <Link to={"/home"} className="navbar-brand">
        Youtube on Chat
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Search
          </Link>
        </li>

        {showModeratorBoard && (
          <li className="nav-item">
            <Link to={"/mod"} className="nav-link">
              Moderator Board
            </Link>
          </li>
        )}

        {showAdminBoard && (
          <li className="nav-item">
            <Link to={"/admin"} className="nav-link">
              Admin Board
            </Link>
          </li>
        )}

        {currentUser && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              Playlist
            </Link>
          </li>
        )}
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>

          </li>
          <li className="nav-item">
            
              <div className="nav-link">{currentUser.username}</div>
            
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>

    <div className="allpage">
    
    <Routes>
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route path="/user" element={<BoardUser/>} />
        <Route path="/mod" element={<BoardModerator/>} />
        <Route path="/admin" element={<BoardAdmin/>} />
      </Routes>
   
    </div>

    { /*<AuthVerify logOut={this.logOut}/> */ }
  </div>
  )
}
export default App;