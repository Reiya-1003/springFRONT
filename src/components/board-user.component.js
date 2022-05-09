import React, { useState ,useEffect} from "react";

import AuthService from "../services/auth.service";
import axios from "axios"

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


const YOUTUBE_PLAYLIST ="https://www.youtube.com/playlist?list=";
// const API_KEY = "AIzaSyDr92tx4aLOH-JhFlXIeVpag8ueO7oVOi0";

const BoardUser=()=>{
    const [content,setContent]=useState("")

   

      const [playlist, setPlaylist] = useState([]);
      const [loginUser,setLoginuser] = useState({})
      console.log(playlist)

  const cardlist = playlist.map((list)=>(
        <a className="card card-style" key={list.id} href={YOUTUBE_PLAYLIST + list.id}　target="_blank" rel="noopener noreferrer">
        <img src={`${list.snippet.thumbnails.high.url}`} className="card-img-top" ></img>
         <div className="card-body">
         <p className="card-text">playlist name : {list.snippet.title}</p>
         </div>
   </a>
  ))

     
      

   useEffect(()=>{
   
    let isMounted = true

    
      //user属性の確認
      UserService.getUserBoard().then(
        response => {
          setContent(response.data);
          
        },
        error => {
          setContent(
            
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          );
  
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
      );

      const user = AuthService.getCurrentUser(); 
      if(user){
        console.log("effectのif")
          axios
          .get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${user.youtubeid}&maxResults=50&key=${process.env.API_KEY}`
          )
          .then((res) => {
            
            setPlaylist(res.data.items);
            
          })
          .catch(() => {});
  
      }
      return ()=> {isMounted = false}
    
      //login情報からチャンネルとプレイリスト取得
      
      
    },[])

    

    return (
      <div>
        <h1 className="playlist-title">Your Youtube Playlist</h1>

        
   
   <div className="flex">
    {cardlist}
  </div>

        
      </div>
    )
}

export default BoardUser;

// ${playlist[0].snippet.thumbnails.high.url}