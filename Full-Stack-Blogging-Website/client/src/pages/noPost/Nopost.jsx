import React from 'react'
import './nopost.css'

export default function Nopost() {
  return (
    <div className='noPostWrapper'>
        <div className="noPosts">
            <div className="headingNoPost">
                No Post To Show :(
            </div>
            
            <img src={require('./noPost.png')} alt="some" className='imageNoPost'/>
            
        </div>
    </div>
  )
}