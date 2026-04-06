import React, {useState} from 'react'
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./works.css";

function formatDuration(mins) {
  if (mins == null || isNaN(mins)) return "0m";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatTime(timeStr) {
  // timeStr is expected as HH:MM
  return timeStr || "";
}

const List = (props) => {
  const mylocate = useLocation()
  const mydata = props.data;
  const myfilter = props.filtered;
  const test = mylocate.pathname !== "/add%20content" ? myfilter: mydata ;
  return (
    <div className="works-list">
      <div className="tastcontent">
          {test.map((e, index) => (
               <div
               className='listcontentt'
                 key={index}
               >
                 <div onClick={(e) => props.handleDelete(index)}>
                   <h4> {e.category}</h4>
              <p>{e.content}</p>
              <p>{formatDuration(e.duration)}</p>
              {e.start && e.end ? <p style={{fontSize:12, color:'#999'}}>{formatTime(e.start)} — {formatTime(e.end)}</p> : null}
            </div>

            <button
              style={{
                backgroundColor: "black",
                width: "fit-content",
                cursor: "pointer",
                padding: "3px 10px",
                marginTop: 5,
              }}
                   onClick={(e) => props.editbtn(index)}
            >
              edit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
