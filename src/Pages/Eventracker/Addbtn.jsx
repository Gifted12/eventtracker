import React from 'react'

const Addbtn = (props) => {
  return(
      <button type="button" className="float" onClick={props.myaddbtn}>  {props.children} </button>
  )
}

export default Addbtn
