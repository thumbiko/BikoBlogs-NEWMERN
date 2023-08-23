import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

export default function TopBar(props) {
    const {user, dispatch} = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    let initial = user ? (user.username[0]) : ""
    const PF = "http://localhost:5000/images/"
    console.log(props)
  return (
    <div className="top">
        
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                    <Link to="/" className="link">HOME</Link>    
                </li>
    
                <li className="topListItem">
                    <Link to="/newblog" className="link">NEW-BLOG</Link>    
                </li>
                <li className="topListItem" onClick={handleLogout}>
                    {user && "LOGOUT"}  
                </li>
            </ul>
        </div>
        <div className="topRight">
            {
                user ? 
                (
                    <Link to="/profile" className="link">
                    {   user.profilePic ?
                        <img className="topImg" src={PF + user.profilePic} alt="profile-pic" />
                        :
                        <div className="topImg" 
                            style={{
                                backgroundColor:"#176B87", 
                                display:"flex",
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                color: 'white', 
                                fontSize: "18px", 
                                textTransform: 'uppercase', 
                                textAlign: 'center',
                                paddingTop: '2px',
                            }}>
                            {initial}
                        </div>
                    }
                    </Link>
                )
                :
                (
                    <ul className="topList">
                        {/* <li className="topListItem">
                            <Link className="link" to="/login">LOGIN</Link>   
                        </li> */}
                        <li className="topListItem">
                            <Link className="link" to="/register">REGISTER</Link>  
                        </li>
                    </ul>
                )
            }
            
            <div className="searchBar">
                <input 
                    type="text" 
                    placeholder="Search...."
                    value={props.q}
                    onChange={(e) => props.setQ(e.target.value)}
                />
            </div>
        </div>
    </div>
  )
}
