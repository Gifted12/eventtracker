import React from 'react'
import Button from '../Component/button'

const Dashbord = () => {
  return (
    <>
      <nav style={{backgroundColor:" rgb(26, 214, 73)", color:"color" }}>
        <ul style={{display:'flex', gap:"10px", listStyle:"none", justifyContent:"flex-end", alignItems:"center" }}>
            <li>Home</li>
            <li>menu</li>
            <li>contact</li>
            <Button/>
        </ul>
      </nav>
    </>
  )
}

export default Dashbord
