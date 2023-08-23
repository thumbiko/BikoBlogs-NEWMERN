import { useContext, useState } from "react"
import "./newblog.css"
import axios from "axios"
import { Context } from "../../context/Context"

export default function NewBlog() {
    
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [categories, setCategories] = useState()
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            username: user.username,
            title,
            desc,
            categories,
        };
        const newCat = {
            name: categories,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename;
            console.log("d:", data)
            try {
                await axios.post("/upload", data);
            } catch (error) {
            }
        }
        try {
            const res = await axios.post("/posts", newPost)   
            console.log("hz", categories)
            await axios.post("/categories", newCat)
            window.location.replace("/post/"+ res.data._id)
        } catch (error) {
            
        }
    }
    return (
        <div className="write">
            { 
            file && (
                <img
                    src={URL.createObjectURL(file)}
                    alt="writeImg"
                    className="writeImg"
                />
            )}

            <form className="writeForm" onSubmit={handleSubmit}>

                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{ display: "none" }} 
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                </div>

                <div className="writeFormGroup" >
                    <div className="catInput">Category:</div> 
                    <textarea
                        placeholder="..."
                        type="text"
                        style={{alignItems: 'center', fontSize: '20px', border: 'none', padding: '20px', outline: 'none'}}
                        onChange={(e) => setCategories(e.target.value)}
                    />
                </div>

                <div className="writeFormGroup">
                    <textarea
                        placeholder="Start your blog...."
                        type="text"
                        className="writeInput writeText"
                        autoFocus={true}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>

                <button className="writeSubmit" type="submit">
                    Publish
                </button>

            </form>
        </div>
    )
}
