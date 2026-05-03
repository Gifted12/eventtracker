import React from 'react'

const Addbtn = (props) => {
  console.log(props)
  return(
      <button type="button" className="float" onClick={props.myaddbtn}>  {props.children} </button>
  )
}

export default Addbtn
