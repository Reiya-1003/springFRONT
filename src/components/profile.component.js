import React, { useState ,useEffect} from "react";

import AuthService from "../services/auth.service";




const Profile=()=>{
   const [redirect,setRedirect]= useState(null)
    const [userReady,setUserReady]=useState(false)
    const [currentUser,setCurrentUser]=useState({ username: "" })

    useEffect(()=>{
        const currentUser = AuthService.getCurrentUser();

     if (!currentUser) setRedirect({ redirect: "/home" });
        
        setCurrentUser(currentUser)
        setUserReady(true)
        
         
    },[])

    return(
        <div className="container">
        {(userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.token.substring(0, 20)} ...{" "}
          {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>YoutubeChannelID:</strong>{" "}
          {currentUser.youtubeid}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
      </div>
    )
}
export default Profile
