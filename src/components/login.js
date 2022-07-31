import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {auth} from "../config/config"

const Login = (props) => {
  const [Password, setPassword] = useState("");
  const [loginError, setloginError] = useState("");
  const [Email, setEmail] = useState("");

  const handlelogin=(e)=>{
    e.preventDefault();
    // console.log(Email,Password)
    auth.signInWithEmailAndPassword(Email, Password).then(()=>{
        setEmail('');
        setPassword('');
        setloginError('');
        props.history.push('/');
    }).catch(err=>setloginError(err.message))

  }
  return (
    <div className='container'>
    <br></br>
    <br></br>
    <h2>LOGIN HERE</h2>
    <br></br>
    <form autoComplete="off" className='form-group' onSubmit={handlelogin}> 
        
        <label>Enter Email</label>
        <input type="email" className='form-control'
        onChange={(e)=>setEmail(e.target.value)}
        value={Email}

        />
        <br></br>
        <label>Enter Password</label>
        <input type="password" className='form-control'
            required
            onChange={(e)=>setPassword(e.target.value)}
        value={Password}
        />
        <br></br>
        <button type="submit" className='btn btn-success mybtn2'>
           LOGIN
        </button>
    </form>
    {loginError&&<div className='error-msg'>
        {loginError}
        </div>}
   
    
    <span>Don't have an account? Create One
    <Link to="signup"> here</Link></span>
</div>
  )
}

export default Login