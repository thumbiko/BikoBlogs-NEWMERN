import { useRef, useContext } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/server/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err)
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }


  return (
    <div className="containerLogin">
      <div style={{ height: "100%", width: "100%", display: "inline-block" }}>

        <div className="splitdiv" id="leftdiv">
          <div id="leftdivcard">
            <h1 className="signInHeading">Sign In</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
              <label style={{marginLeft: '2%'}}>Username :</label>
              <input
                type="text"
                placeholder="Enter your username..."
                className="formInputLogin"
                required
                ref={userRef}
              />
              <label style={{marginLeft: '2%'}}>Password :</label>
              <input
                type="password"
                placeholder="Enter your password..."
                className="formInputLogin"
                required
                ref={passwordRef}
              />
              <div style={{ textAlign: "center" }}>
                <button id="leftbutton" className="ripple2" type="submit" disabled={isFetching}>Login</button>
              </div>

            </form>
          </div>
        </div>

        <div className="splitdiv" id="rightdiv">
          <div id="rightdivcard">
            <h1 style={{ textAlign: "center", color: "white", fontSize: '2.4rem' }}>New here ?</h1>
            <p style={{ color: "white", textAlign: "center", paddingTop: '2%', paddingBottom: '2%', fontSize: '1.2rem' }}>Do you want to write your own story ? Just Register !</p>
            <div style={{ textAlign: "center", paddingTop: '2%', paddingBottom: '2%' }}>
              <Link className="link" to="/register">
                <button id="rightbutton" className="ripple">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

