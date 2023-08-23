import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import { Context } from '../../context/Context'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/Posts'
import Nopost from '../noPost/Nopost'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user, dispatch } = useContext(Context)

  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/server/posts")
      setPosts(res.data)
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const selectedItems = posts.filter((post) => post.username === user.username);
    
    setUserPosts(selectedItems);
  }, [posts])

  // console.log(userPosts, posts)

  return (
    <div className='profileWrapper'>
        <div className="profile">
            <div className="profileDetails">
                <div className="headingProfile">
                    Your Details!!!!
                </div>
                <div className="lineProfile"></div>
                <div className="userDetailsProfile">
                  <i className="fa-solid fa-angle-right" style={{marginRight: '0.5rem', fontSize: '16px', color: 'rgb(22, 97, 126)'}}/>
                  <span className="userDetailTag">Username: </span>
                  {user.username}
                </div>
                <div className="userDetailsProfile">
                  <i className="fa-solid fa-angle-right" style={{marginRight: '0.5rem', fontSize: '16px', color: 'rgb(22, 97, 126)'}}/>
                  <span className="userDetailTag">Email: </span>
                  {user.email}
                </div>
            </div>

            <div className='buttonContainerProfile'>
            <Link className="link" to="/settings">
              <button className='buttonUpdateProfile'>Update Account</button>
            </Link>
            </div>

            <div className="postProfileDetails">
                <div className="headingProfile">
                    Your Posts
                </div>
                <div className="lineProfile" ></div>
            </div>

            <div className="postsProfile">
              {
                userPosts.length > 0
                ?
                <Posts posts={userPosts}/>
                :
                <div className='noPostProfile'>
                  You haven't posted anything yet
                </div>
              }
            </div>
        </div>

        <Sidebar />
    </div>
  )
}
