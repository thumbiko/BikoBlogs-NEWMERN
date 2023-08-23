import { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import axios from 'axios'
import { useLocation } from "react-router-dom"
import Nopost from "../noPost/Nopost"

export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();


  const [filteredPost, setFilteredPost] = useState([]);


  
  var subSearch = search.substring(
    search.indexOf("?") + 1, 
    search.lastIndexOf("=")
  );
  // console.log("shome", search, subSearch)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/server/posts" + search)
      setPosts(res.data)
      setFilteredPost(res.data)
    }

    fetchPosts();
  }, [search]);

  useEffect(() => {
    props.q.length > 0 ? setFilteredPost(posts.filter(
      post => {
        return (
          post
          .title
          .toLowerCase()
          .includes(props.q.toLowerCase()) 
        );
      }
    ))
    :
    setFilteredPost(posts)
  }, [props.q]);
  console.log("p", props.q.length)
  return (
    <>
        <Header/>
        <div className="home">
            <Sidebar/>
            {
              filteredPost.length > 0
              ?
              <Posts posts={filteredPost}/>
              :
              <Nopost /> 
            }
        </div>
    </>
  )
}