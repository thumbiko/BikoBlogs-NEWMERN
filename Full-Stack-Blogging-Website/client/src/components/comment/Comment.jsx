import './comment.css'

export default function Comment() {
  return (
    <div>
        <div className="commentWrapper">
            <div className="commentUname">
                <span className='cUname'>peter</span>
            </div>
            <div className="commentBody">
                Nice Blog
            </div>
            <span className='cUdate'>7th May 2023</span>   
        </div>

        <div className="commentWrapper">
            <div className="commentUname">
                <span className='cUname'>kevin</span>
            </div>
            <div className="commentBody">
                I loved it.
            </div>
            <span className='cUdate'>2nd June 2023</span>  
        </div>

        <div className="commentWrapper">
            <div className="commentUname">
                <span className='cUname'>alex</span>
            </div>
            <div className="commentBody">
                Wow well written.
            </div>
            <span className='cUdate'>24th June 2023</span> 
        </div>

        <div className="commentWrapper">
            <div className="commentUname">
                <span className='cUname'>john</span>
            </div>
            <div className="commentBody">
                That was informative
            </div>
            <span className='cUdate'>28th May 2023</span> 
        </div>
    </div>
  )
}


            
            
            
            
            