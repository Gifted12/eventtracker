import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./eventdashboard.css";
import imagejeremy from "../../Component/images/image-jeremy.png";
import iconellipsis from "../../Component/images/icon-ellipsis.svg";
import iconexercise from "../../Component/images/icon-exercise.svg";
import iconplay from "../../Component/images/icon-play.svg";
import iconselfcare from "../../Component/images/icon-self-care.svg";
import iconsocial from "../../Component/images/icon-social.svg";
import iconstudy from "../../Component/images/icon-study.svg";
import iconwork from "../../Component/images/icon-work.svg";
import Addbtn from "./Addbtn";

const EventDashboard = (props) => {
  const data = props.data || [];
  const [localFilter, setLocalFilter] = useState(props.filtertime || "weekly");
  const setFilter = props.setFiltertime || setLocalFilter;
  if (props.loading) {
    return (
      <main style={{ padding: '3rem' }}>
        <div className="loading-wrapper">
          <div className="spinner" />
          <p>Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  function formatDuration(mins) {
    if (!mins || isNaN(mins)) return "0m";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  function rangeBounds(filter) {
    const now = Date.now();
    if (filter === "daily") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = start.getTime() + 24 * 60 * 60 * 1000;
      return { start: start.getTime(), end };
    }
    if (filter === "weekly") {
      const end = now;
      const start = now - 7 * 24 * 60 * 60 * 1000;
      return { start, end };
    }
    return { start: now - 30 * 24 * 60 * 60 * 1000, end: now };
  }

  function totalsFor(category, filter) {
    const { start, end } = rangeBounds(filter);
    const durationNow = data
      .filter((d) => d.category === category && d.timestamp >= start && d.timestamp < end)
      .reduce((s, it) => s + (Number(it.duration) || 0), 0);
    const periodLength = end - start;
    const prevStart = start - periodLength;
    const prevEnd = start;
    const prevItems = data
      .filter((d) => d.category === category && d.timestamp >= prevStart && d.timestamp < prevEnd)
      .sort((a, b) => b.timestamp - a.timestamp);
    const durationPrev = prevItems.length > 0 ? Number(prevItems[0].duration || 0) : 0;

    return { now: durationNow, prev: durationPrev };
  }
  const active = (k) => (k === (props.filtertime || localFilter) ? "active" : "");
  return (
    <>
      <main>
        <div className="namediv">
          <div className="name">
            <img src={props.userAvatar || imagejeremy} alt="user" className="userimg" />
            <p className="Report">Report for</p>
            <p className="jeremy">{props.userName || 'Your Name'}</p>
          </div>
          <div className="selectiondiv">
            <button className={`selections sel1 ${active("daily")}`} onClick={() => setFilter("daily")}>Daily</button>
            <button className={`selections sel2 ${active("weekly")}`} onClick={() => setFilter("weekly")}>Weekly</button>
            <button className={`selections sel3 ${active("monthly")}`} onClick={() => setFilter("monthly")}>Monthly</button>
          </div>
        </div>

        <div className="firstdiv">
          <div className="backimg">
            <img src={iconwork} alt="" className="background" />
          </div>
          <div className="content">
            <Link to="/works" >
              <div className="ellipsdiv">
                <p className="con">Work</p>
                <img src={iconellipsis} alt="dots" className="ellipsimg" />
              </div>
              <div className="timediv">
                {(() => {
                  const t = totalsFor("Work", props.filtertime || localFilter);
                  return (
                    <>
                      <p className="maintime mt1">{formatDuration(t.now)}</p>
                      <p className="time t1">Previous - {formatDuration(t.prev)}</p>
                    </>
                  );
                })()}
              </div>
            </Link>
          </div>
        </div>

        <div className="seconddiv">
          <div className="backimg">
            <img src={iconplay} alt="" className="background" />
          </div>
          <div className="content one">
            <Link to="/play">
              <div className="ellipsdiv">
                <p className="con">Play</p>
                <img src={iconellipsis} alt="dots" className="ellipsimg" />
              </div>
              <div className="timediv">
                {(() => {
                  const t = totalsFor("Play", props.filtertime || localFilter);
                  return (
                    <>
                      <p className="maintime mt2">{formatDuration(t.now)}</p>
                      <p className="time t2">Previous - {formatDuration(t.prev)}</p>
                    </>
                  );
                })()}
              </div>
            </Link>
          </div>
        </div>

        <div className="thirddiv">
          <div className="backimg">
            <img src={iconstudy} alt="" className="background" />
          </div>
          <div className="content two">
            <Link to="/study">
              <div className="ellipsdiv">
                <p className="con">Study</p>
                <img src={iconellipsis} alt="dots" className="ellipsimg" />
              </div>
              <div className="timediv">
                {(() => {
                  const t = totalsFor("Study", props.filtertime || localFilter);
                  return (
                    <>
                      <p className="maintime mt3">{formatDuration(t.now)}</p>
                      <p className="time t3">Previous - {formatDuration(t.prev)}</p>
                    </>
                  );
                })()}
              </div>
            </Link>
          </div>
        </div>

        <div className="forthdiv">
          <div className="backimg">
            <img src={iconexercise} alt="" className="background" />
          </div>
          <div className="content">
            <Link to="/exercise">
              <div className="ellipsdiv">
                <p className="con">Exercise</p>
                <img src={iconellipsis} alt="dots" className="ellipsimg" />
              </div>
              <div className="timediv">
                {(() => {
                  const t = totalsFor("Exercise", props.filtertime || localFilter);
                  return (
                    <>
                      <p className="maintime mt4">{formatDuration(t.now)}</p>
                      <p className="time t4">Previous - {formatDuration(t.prev)}</p>
                    </>
                  );
                })()}
              </div>
            </Link>
          </div>
        </div>

        <div className="fifthdiv">
          <div className="backimg">
            <img src={iconsocial} alt="" className="background" />
          </div>
          <div className="content">
            <Link to="/social">
              <div className="ellipsdiv">
                <p className="con">Social</p>
                <img src={iconellipsis} alt="dots" className="ellipsimg" />
              </div>
              <div className="timediv">
                {(() => {
                  const t = totalsFor("Social", props.filtertime || localFilter);
                  return (
                    <>
                      <p className="maintime mt5">{formatDuration(t.now)}</p>
                      <p className="time t5">Previous - {formatDuration(t.prev)}</p>
                    </>
                  );
                })()}
              </div>
            </Link>
          </div>
        </div>

        <div className="sixthdiv">
          <div className="backimg">
            <img src={iconselfcare} alt="" className="background" />
          </div>
          <div className="content">
            <Link to="/self-care">
              <div className="ellipsdiv">
                <p className="con">Self-Care</p>
                <img src={iconellipsis} alt="dots" className="ellipsimg" />
              </div>
              <div className="timediv">
                {(() => {
                  const t = totalsFor("Self-Care", props.filtertime || localFilter);
                  return (
                    <>
                      <p className="maintime mt6">{formatDuration(t.now)}</p>
                      <p className="time t6">Previous - {formatDuration(t.prev)}</p>
                    </>
                  );
                })()}
              </div>
            </Link>
          </div>
        </div>
        <Link to="/add content" ><Addbtn>Add</Addbtn></Link>
      </main>
    </>
  );
};

export default EventDashboard;
