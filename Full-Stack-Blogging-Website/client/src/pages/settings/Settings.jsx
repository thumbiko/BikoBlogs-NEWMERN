import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext, useState } from "react"
import { Context } from "../../context/Context"
import axios from "axios"

export default function Settings() {
  const { user, dispatch } = useContext(Context)
  let initial = user ? (user.username[0]) : ""

  const [file, setFile] = useState(null)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  
  const PF = "http://localhost:5000/images/"
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})

    console.log(username, email, password) 
    const updatedUser = {
        userId: user._id,
        username,
        email,
        password
    };
    if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename)
        data.append("file", file)
        updatedUser.profilePic = filename;
        try {
            await axios.post("/upload", data);
        } catch (error) {
        }
    }
    try {
        const res = await axios.put("/users/" + user._id, updatedUser)  
        dispatch({type: "UPDATE_SUCCESS", payload: res.data}) 
        window.location.reload()
        setUpdateSuccess(true)
    } catch (error) {    
      dispatch({type: "UPDATE_FAILURE"})
    }
}

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {
              user.profilePic 
              ?
                <img className="ProfPic" src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="profile-pic" />
                :
                <div className="ProfPic"
                  style={{
                    backgroundColor: "#176B87",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: "28px",
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}>
                  {initial}
                </div>
            }
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input 
              type="file" 
              id="fileInput" 
              style={{ display: "none" }} 
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password"  onChange={(e) => setPassword(e.target.value)} required/>

          <button className="settingsSubmit" type="submit">Update</button>
        </form>
        {updateSuccess && <span style={{color: 'green', marginTop: '10px', textAlign: 'center'}}>Profile Updated Successfully!!</span>}
      </div>
      <Sidebar />
    </div>
  )
}
