import { useLocation } from "react-router-dom"
import "./singlePost.css"
import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"
import Comment from "../comment/Comment"

export default function  SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const [post, setPost] = useState({})
    const { user } = useContext(Context)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    console.log('h')
    const defaultImg = "https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"

    const PF = "http://localhost:5000/images/"

    useEffect(() => {
        console.log(path)
        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {
                data : {username: user.username}})
            window.location.replace("/")
        } catch (error) {
            
        }
    }

    const handleUpdate = async () => { 
        try {
            await axios.put("/posts/" + path, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false)
        } catch (error) {
            
        }
    }
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
            <img 
                src= {post.photo ? PF + post.photo : defaultImg}
                className="singlePostImg" 
                alt="singlepostimg" 
            />
            {
                updateMode ? 
                <div style={{width: '100%', display: "flex", flexDirection: 'row'}}>
                    <input 
                        type="text" 
                        value={title} 
                        style={{flex: 1}}
                        className="singlePostTitleInput" 
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    /> 
                    <button 
                        className="singlePostButton"
                        onClick={handleUpdate}
                    >
                            Update
                    </button>
                </div>
                : 
                (
                    <h1 className="singlePostTitle">
                        {title}
                        <div className="singlePostEdit">
                        {
                            post.username === user?.username 
                            &&
                            <>
                                <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                            </>
                        }
                        </div> 
                    </h1>
                )
            }
            
            <div className="singlePostInfo">
                <span className="singlePostAuthor">
                    Author: 
                    <Link 
                        to={`/?user=${post.username}`}
                        className="link"
                    >
                        <b> {post.username}</b>
                    </Link>
                </span>
                <span className="singlePostDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            {
            updateMode ? 
                <textarea 
                    className="singlePostDescInput" 
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                /> 
                : 
                <p className="singlePostDesc">
                    {desc}
                </p>
            }
            {
                updateMode && 
                <button
                    onClick={() => {
                        window.location.reload();
                        setUpdateMode(!updateMode)
                        
                    }}
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '18px',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        cursor: 'pointer',
                        width: '6rem',
                    }}
                >
                    Cancel
                </button>
            }
            
            { 
                user ?
                <div className="commentInput">
                    <div className="commentInputTitle">
                        Enter Your Comment: 
                    </div>
                    <textarea name="" id="" cols="80" rows="6" className="commentInputarea"></textarea>
                    <div className="postCommentButtonWrapper">
                        <button className="postCommentButton">Post</button>
                    </div>
                    
                </div>
                : 
                <></>
            }

            <div className="allCommentsTitle">
                Previous Comments
            </div>

            <div className="lineComment"></div>

            <Comment />
        </div>
    </div>
  )
}
