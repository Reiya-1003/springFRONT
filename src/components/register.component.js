import React, { useState ,useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


import AuthService from "../services/auth.service";


//バリデーション
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        入力してください
      </div>
    );
  }
};

const vemail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        『@◯◯.com』の形式で入力してくださいs
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        ユーザーネームは3-20字で入力してください。
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
       　パスワードは6から40字で入力してください。
      </div>
    );
  }
};

const vyoutubeid = value => {
  if (value.length < 6 || value.length > 26) {
    return (
      <div className="alert alert-danger" role="alert">
        YoutubeIdを正しく入力してください
      </div>
    );
  }
};




const Register=()=>{

  
  

  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [youtubeid,setYoutubeid]=useState("")
  const [password,setPassword]=useState("")
  const [successfull,setSuccessful]=useState(false)
  const [message,setMessage]=useState("")
  const [checkBtn,setCheckBtn]=useState("")
  const [form,setForm]=useState("")

  const onChangeUsername=(e) =>{
    
    setUsername(e.target.value);
  }

  const onChangeEmail=(e) =>{
    setEmail(e.target.value);
  }

  const onChangeYoutubeid=(e) =>{
    setYoutubeid(e.target.value);
  }

  const onChangePassword=(e) =>{
    setPassword(e.target.value);
  }

  const handleRegister =(e)=> {
    e.preventDefault();

    setMessage("")
    setSuccessful(false)

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      AuthService.register(
        username,
        email,
        password,
        youtubeid
      ).then(
        response => {
          
          setMessage(response.data.message)
          setSuccessful(true)
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

         
          setSuccessful(false)
          setMessage(resMessage)
        }
      );
    }
  }

  return (
    <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={handleRegister}
            ref={c => {
              setForm(c);
            }}
          >
            {!successfull && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                    
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, vemail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="youtubeid">YoutubeId</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="youtubeid"
                    value={youtubeid}
                    onChange={onChangeYoutubeid}
                    validations={[required, vyoutubeid]}
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
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successfull
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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
　　　　<div>
  <div className="idcontent">
<h3 >YoutubeIdは以下の下線部分を入力してください</h3>
<img src={`${process.env.PUBLIC_URL}/youtubeid.png`} className="idimg"></img>
</div>


      </div>
        
      </div>
  )
}

export default Register