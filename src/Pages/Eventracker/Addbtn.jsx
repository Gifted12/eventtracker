import React from 'react'
import { Link } from 'react-router-dom'

const Addbtn = (props) => {
  
  return (
    <div>
      <p className="float" onClick={props.myaddbtn}>{props.children}</p>
    </div>
  )
}

export default Addbtn
