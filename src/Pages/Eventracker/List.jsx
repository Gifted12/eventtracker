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
  const test = mylocate.pathname !== "/add%20content" ? myfilter : mydata;
  if (props.loading) {
    return (
      <div className="works-list loading-state">
        <div className="spinner" />
        <p>Loading your events...</p>
      </div>
    );
  }
  if (!test || test.length === 0) {
    return (
      <div className="works-list" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No tasks yet. Add one to save it to Firebase.</p>
      </div>
    );
  }
  return (
    <div className={`works-list ${props.filtered ? "grid-mode" : ""}`}>
      <div className="tastcontent">
        {test.map((e, index) => (
          <div className="listcontentt" key={e.id || index}>
            <div className="list-item-details">
              <div className="list-item-header">
                <h4>{e.category}</h4>
                <span className="duration">{formatDuration(e.duration)}</span>
              </div>
              <p>{e.content}</p>
              {e.start && e.end ? (
                <p className="time">
                  {formatTime(e.start)} — {formatTime(e.end)}
                </p>
              ) : null}
            </div>

            <div className="list-item-actions">
              <button type="button" className="edit-button" onClick={() => props.editbtn(e)}>
                Edit
              </button>
              <button type="button" className="delete-button" onClick={() => props.handleDelete(e)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
