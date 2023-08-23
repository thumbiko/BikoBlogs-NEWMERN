import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    console.log("pressed")
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post("http://localhost:4000/server/auth/register", {
        username,
        email,
        password,
      })
      res.data && window.location.replace("/login"); 
    } catch(err) {
      
      alert("username or email already exists | kindly enter a new one")
    }
  };

  return (
    <div className="containerRegister">
      <div style={{ height: "100%", width: "100%", display: "inline-block" }}>

        <div className="splitdivRegister" id="leftdivRegister">
        <div id="rightdivcard">
            <h1 style={{ textAlign: "center", color: "white" }}>Already a User?</h1>
            <div style={{ textAlign: "center", paddingTop: '2%', paddingBottom: '2%' }}>
              <Link className="link" to="/login">
                <button id="rightbutton" className="ripple">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="splitdivRegister" id="rightdivRegister">
          
          <div id="leftdivcard">
            <h1 style={{ paddingTop: "3%", paddingBottom: '3%', textAlign: "center" }}>Sign Up</h1>
            <form className="registerForm" onSubmit={handleSubmit}>
              <label style={{marginLeft: '2%'}}>Username :</label>
              <input
                className="formInput" 
                type="text" 
                placeholder="Enter your username..." 
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label style={{marginLeft: '2%'}}>Email :</label>
              <input
                className="formInput" 
                type="email" 
                placeholder="Enter your email..." 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label style={{marginLeft: '2%'}}>Password :</label>
              <input 
                className="formInput" 
                type="password" 
                placeholder="Enter your password..." 
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div style={{ textAlign: "center" }}>
                <button id="leftbutton" className="ripple2" type="submit" >Register</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
    
  );
}
