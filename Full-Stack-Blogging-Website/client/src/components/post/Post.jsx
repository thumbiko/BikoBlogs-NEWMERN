import "./post.css"
import {Link} from "react-router-dom"

export default function Post({post}) {
    const defaultImg = "https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"

    const PF = "http://localhost:5000/images/"
  return (
    <div className="post">
        <img 
            className="postImg" 
            src={post.photo ? (PF + post.photo ): defaultImg} 
            alt="postimage" 
        />
        <div className="postInfo">
            <div className="postCats">
                {
                    // post.categories.map((c) => {return 
                    <span className="postCat">{post.categories}</span>
                    // })
                }
            </div>
            <Link to={`/post/${post._id}`} className="link" style={{marginTop: 15}}>
                <span className="postTitle">
                    {post.title}
                </span>
            </Link>
            
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc"> 
            {post.desc}
        </p>
    </div>
  )
}
