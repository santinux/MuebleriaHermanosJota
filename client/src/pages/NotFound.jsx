import React from 'react'
import Error from '../components/Error.jsx'
export const NotFound = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Error message="La página que buscas no existe." />
    </div>
  )
}
