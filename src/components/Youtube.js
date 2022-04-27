import {React,useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Youtube = () => {

    const [name, setName]=useState("")
    const [address, setAddress]=useState("")
    const [datas,setDatas] =useState([])



    useEffect(()=>{
        fetch("http://localhost:8080/app/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setDatas(result);
        }
        )

    },[])





    const handleClick=(e)=>{
        e.preventDefault();
        const youtube = {name,address}
        console.log(youtube)
        fetch("http://localhost:8080/app/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(youtube)
        }).then(()=>{
            console.log("new add")
        })
        
    }


    return (
        <Container>
        <Paper elevation={3}>
            <h1>Add student</h1>
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Name" variant="outlined" 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <TextField id="outlined-basic" label="Adress" variant="outlined" 
         value={address}
         onChange={(e)=>setAddress(e.target.value)}
         />
         <Button variant="contained" onClick={handleClick}>submit</Button>
    
      
        
      </Box>
      </Paper>
      <h1>MySQLdatas</h1>
      <Paper elevation={3}>
        {datas.map(data=>(
            <Paper elevation={6} key={data.id}>
                ID:{data.id}<br/>
                Name:{data.name}<br/>
                Address:{data.address}<br/>

            </Paper>
        ))}

      </Paper>
      </Container>
    )
}

export default Youtube
