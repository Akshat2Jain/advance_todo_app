import React, { useState } from "react";
import { Link } from "react-router-dom";
import {auth,db} from "../config/config"

const Signup = (props) => {
  const [FullName, setfullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const handleRegister=(e)=>{
    e.preventDefault();
    // console.log(FullName,Email,Password)
    auth.createUserWithEmailAndPassword(Email,Password).then((cred)=>{
        db.collection('users').doc(cred.user.uid).set({
            email:Email,
            fullname:FullName,
            password:Password
        }).then(()=>{
            setEmail('');
            setPassword('');
            setfullName('');
            setError('');
            props.history.push('/loginup');
        }).catch(err=>setError(err.message))
    }).catch(err=>setError(err.message))
  }
  return (
    <div className="container">
      <br></br>
      <br></br>
      <h2>REGISTER HERE</h2>
      <br></br>
      <form autoComplete="off" className="form-group" onSubmit={handleRegister}>
        <label>Enter Full Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setfullName(e.target.value)}
          value={FullName}
        />
        <br></br>
        <label>Enter Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
        />
        <br></br>
        <label>Enter Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={Password}
        />
        <br></br>
        <button type="submit" className="btn btn-success mybtn2">
          REGISTER
        </button>
      </form>
      {Error && <div className="error-msg">{Error}</div>}

      <span>
        Already have an account? Login
        <Link to="loginup"> here</Link>
      </span>
    </div>
  );
};

export default Signup;
