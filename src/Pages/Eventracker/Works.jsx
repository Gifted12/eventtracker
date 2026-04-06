import React from "react";
import "./works.css";
import Forminput from "./Forminput"
import Addbtn from "./Addbtn";
import List from "./List"

const Works = (props) => {
  const mydate = new Date();
  const full = mydate.toDateString()

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
  const myfilteredcontent = props.filtering("Work");
 
// filter/time helpers handled in EventDashboard


  return (
    <div className="works-container">
       {props.addbtn? <Forminput {...trackformprops} /> : ""}
       <List {...trackformprops} filtered={myfilteredcontent}/>
     <Addbtn {...trackformprops}>{props.addbtn? "Done":  "Add"}</Addbtn>
    
    </div>
  );
};

export default Works;
