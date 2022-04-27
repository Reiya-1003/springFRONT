import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'



const required = value => {
    

  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const Login = ()=>{
   const [username,setUsername] = useState("")
   const [password,setPassword] = useState("")
   const [loading,setLoading] = useState(false)
   const [message,setMessage] = useState("")
   const [checkBtn,setCheckBtn]=useState("")
   const [form,setForm]=useState("")

   const navigate = useNavigate();

   const  onChangeUsername=(e)=> {
        setUsername(e.target.value);
        
      }

    const onChangePassword=(e) =>{
            setPassword(e.target.value);
            
          }
    
    const handleLogin=(e) =>{
    e.preventDefault();
    setMessage("")
    setLoading(true)

    form.validateAll();
    
    if (checkBtn.context._errors.length === 0) {
              AuthService.login(username, password).then(
                () => {
                  window.location.reload();
                  console.log("ログインボタンを押した")
                },
                error => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  setLoading(false)
                  setMessage(resMessage)
                  
                  console.log("loginでエラー")
                }
              );
            } else {
                setLoading(false)
              
              console.log("押せてません")
            }
       } 
       
    return(
        <div className="col-md-12">
        <div className="card card-container">
           <img
             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
             alt="profile-img"
             className="profile-img-card"
           />

          <Form
             onSubmit={handleLogin}
             ref={c => {
                setForm(c)
              }}
             
           >
             <div className="form-group">
             <label htmlFor="username">Username</label>
               <Input
                 type="text"
                 className="form-control"
                 name="username"
                 value={username}
                 onChange={onChangeUsername}
                 validations={[required]}
               />
             </div>

             <div className="form-group">
               <label htmlFor="password">Password</label>
               <Input
                 type="password"
                 className="form-control"
                 name="password"
                 value={password}
                 onChange={onChangePassword}
                 validations={[required]}
               />
             </div>

             <div className="form-group">
               <button
                 className="btn btn-primary btn-block"
                 disabled={loading}
               >
                 {loading && (
                   <span className="spinner-border spinner-border-sm"></span>
                 )}
                 <span>Login</span>
               </button>
             </div>

             {message && (
               <div className="form-group">
                 <div className="alert alert-danger" role="alert">
                   {message}
                 </div>
               </div>
             )}
               <CheckButton
              style={{ display: "none" }}
              ref={c => {
               setCheckBtn(c)
              }}
            />
           </Form>
         </div>
       </div>
    )
}

       


export default Login;