
import React from 'react'



const Loading = ({message}) => {
    return (
        <div className="loading" id="loading">
            <div className="loading-spinner"></div>
            <p>{message}</p>
        </div>
    )
}

export default Loading