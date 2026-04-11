import React, { useEffect, useMemo } from 'react'
import List from './List'
import "./works.css";
import Forminput from './Forminput'
import Addbtn from './Addbtn'

const Social = (props) => {
  useEffect(() => {
    props.selectstate("Social");
  }, [props.selectstate]);

  const trackformprops = useMemo(() => ({
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
  }), [props.submit, props.editing, props.category, props.content, props.start, props.end, props.selectstate, props.textareastate, props.startstate, props.endstate, props.editbtn, props.handleDelete, props.data, props.myaddbtn, props.addbtn]);
  return (
    <div className="works-container">
       {props.addbtn? <Forminput {...trackformprops} /> : ""}
       <List {...trackformprops} filtered={props.filtering("Social")}/>
     <Addbtn {...trackformprops}>{props.addbtn? "Done":  "Add"}</Addbtn>
    
    </div>
  );
}

export default Social
