import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import NewBlog from "./pages/newblog/NewBlog";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "./context/Context";
import Profile from "./pages/profile/Profile";

function App() {
  const {user} = useContext(Context);

  const [q, setQ] = useState("");
  console.log(q)
  console.log("user in app.js", user)
  return (
    <Router>
      <TopBar q = {q} setQ = {setQ}/>
      <Routes>
        <Route 
          exact path="/" 
          element={<Home q = {q} setQ = {setQ}/>}
        />
        <Route 
          path="/register" 
          element={user ? <Home q = {q} setQ = {setQ}/> : <Register/>}
        />
        <Route 
          path="/login" 
          element={user ? <Home q = {q} setQ = {setQ}/> : <Login/>}
        />
        <Route 
          path="/newblog" 
          element={user ? <NewBlog /> : <Register/>}
        />
        <Route 
          path="/profile" 
          element={user ? <Profile /> : <Register/>}
        />
        <Route 
          path="/settings" 
          element={user ? <Settings /> : <Register/>}
        />

       
        <Route 
          path="/post/:postId" 
          element={<Single/>}
        />
      </Routes>
    </Router>
  );
}

export default App;



//<Route path="/newblog" element={user ? <NewBlog /> : <Register/>}/>