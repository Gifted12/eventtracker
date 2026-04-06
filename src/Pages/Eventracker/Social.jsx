import React from 'react'
import List from './List'
import "./works.css";
import Forminput from './Forminput'
import Addbtn from './Addbtn'

const Social = (props) => {
  const trackformprops={
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
    const myfilter = props.data.filter((e)=>e.category==="Social");
  return (
    <div className="works-container">
       {props.addbtn? <Forminput {...trackformprops} /> : ""}
       <List {...trackformprops} filtered={props.filtering("Social")}/>
     <Addbtn {...trackformprops}>{props.addbtn? "Done":  "Add"}</Addbtn>
    
    </div>
  );
}

export default Social
