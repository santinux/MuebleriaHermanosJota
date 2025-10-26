
import React from 'react'

const Error = ({ message }) => {
    return (
        <div style={{ textAlign: "center", color: "var(--text-medium)" }}>
            <h2>Algo salió mal.</h2>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Error