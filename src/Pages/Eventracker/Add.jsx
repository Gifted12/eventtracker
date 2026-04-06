import  React,{ useState }  from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Addbtn from './Addbtn';
import Forminput from "./Forminput"
import List from "./List";
import "./works.css";


const Add = (props) => {
    const trackformprops = {
    submitt : props.submit,
    editing : props.editing,
    category : props.category,
      content : props.content,
      start: props.start,
      end: props.end,
      selectstate : props.selectstate,
      textareastate : props.textareastate,
      startstate: props.startstate,
      endstate: props.endstate,
    editbtn : props.editbtn,
    handleDelete : props.handleDelete,
    data : props.data,
    myaddbtn : props.myaddbtn,
    addbtn:props.addbtn,
  }
  return (
<div className="works-container">
      <Forminput {...trackformprops} />
    <List {...trackformprops} />
      <Link to="/eventtracker"><Addbtn>Done</Addbtn></Link>
    </div>
  
  )
}

export default Add
