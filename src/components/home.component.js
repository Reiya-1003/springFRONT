import React, { useState ,useEffect} from "react";


import UserService from "../services/user.service";


const YOUTUBE_SERACH_API_URI = "https://www.googleapis.com/youtube/v3/search?";
const API_KEY = "AIzaSyCZTDjHOg2RP2v6UPSmdYsZ5pOb41SS7HU";

const Home =()=>{
  const [content,setContent]=useState("")
  const [videoId, setVideoId] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [searchword, setSearchword] = useState("")

   // // クエリ文字列を定義する
   const [params,setParams] = useState({})

   
  
 

  const  onChangeWord=(e)=> {
    
    setSearchword(e.target.value);
    setParams({
    key: process.env.API_KEY,
    q: `${e.target.value}`, // 検索キーワード
    type: "video", // video,channel,playlistから選択できる
    maxResults: "10", // 結果の最大数 50が限界ぽい
    order: "relevance", // 関連じゅん
    })
    
     
    
    
  }




  const serchVideo = ()=>{
    console.log(params)
    const queryParams = new URLSearchParams(params)
      
     
　　

      // APIをコールする
     fetch(process.env.YOUTUBE_SERACH_API_URI + queryParams)
     .then((res) => res.json())
     .then(
       (result) => {
         console.log("API success:", result);
         let dougaid = []
         if (result.items && result.items.length !== 0) {
           for(let i=0; i <result.items.length; i++){
               let Id ={"id":result.items[i].id.videoId}
             
               dougaid.push(Id)
              
           }
           
           const firstItem = result.items[0];
           setVideoId(firstItem.id.videoId);
           setPlaylist(dougaid)
         }
       },
       (error) => {
         console.error(error);
       }
     );
      
  }

  useEffect(()=>{
    const queryParams = new URLSearchParams(params)
    UserService.getPublicContent().then(
      response => {
        setContent(response.data);
      },
      error => {
        setContent(
          
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );

  
},[])

const movieCon = playlist.map((movie,i)=>(
  <div key={i} className="moviehako">

<iframe
  id="player"
  
 
  src={"https://www.youtube.com/embed/" + movie.id}
  frameBorder="0"
  allowFullScreen
/>
</div>

))

return (
  <div className="container">
　　　　　
      
          
            <div className="input-group search">
                  <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search video in Youtube" 
                  aria-label="Recipient's serchword" 
                  aria-describedby="button-addon2"
                 value={searchword}
                 onChange={onChangeWord}
                  ></input>
                   <button className="btn btn-dark " type="button" id="button-addon2" onClick={serchVideo}>Search</button>
             </div>
        
              
    
                  {movieCon}
    
      
       
       

      
  </div>
)
}
export default  Home;