import { useContext, useEffect, useState } from "react"
import "./sidebar.css"
import axios from 'axios'
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Sidebar() {
    const [cats, setCats] = useState([]);
    const { user } = useContext(Context)

    const PF = "http://localhost:5000/images/"

    let initial = user ? (user.username[0]) : ""
    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("http://localhost:5000/server/categories");
            setCats(res.data);
        }
        getCats();
    })
    // console.log(cats)
  return (
    <div className="sidebar">
        {
            user ?
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                {/* <img src={PF + user.profilePic} alt="myimage" /> */}
                {   
                    user.profilePic ?
                        <img src={PF + user.profilePic} alt="profile-pic" />
                        :
                        <div 
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
                                width: '50%',
                                height: '16rem',
                                borderRadius: '20px',
                            }}>
                            {initial}
                        </div>
                    }
               
            </div>
            :
            <></>
        }
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {
                    cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem" style={{marginRight: 2}}>
                                <i className="fa-solid fa-angle-right" style={{marginRight: 2}}></i>{c.name}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}
