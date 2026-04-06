import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import EventDashboard from "./Pages/Eventracker/EventDashboard";
import Works from "./Pages/Eventracker/Works";
import Study from "./Pages/Eventracker/Study";
import Play from "./Pages/Eventracker/Play";
import Exercise from "./Pages/Eventracker/Exercise";
import Social from "./Pages/Eventracker/Social";
import Selfcare from "./Pages/Eventracker/Selfcare";
import Add from "./Pages/Eventracker/Add";

const App = () => {
  const [category, setCategory] = useState("Work");
  const [content, setContent] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem("events");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [editing, setEditing] = useState(false);
  const [addbtn, setAddbtn] = useState(false);
  const [filtertime, setfiltertime] = useState("");
  const [editindex, seteditindex] = useState(null);
  const [error, setError] = useState("");

  const mydate = new Date();
  const full = mydate.toDateString();

const filtering = (item) => {
 const updated = data.filter((e) => e.category === item)
    return updated
}
useEffect(() => {
  try {
    localStorage.setItem("events", JSON.stringify(data));
  } catch (e) {
    console.error("failed to save events", e);
  }
}, [data]);

  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!category || !content || !start || !end) {
      setError("Please fill category, task, start and end time.");
      return;
    }
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    if ([sh, sm, eh, em].some(v => isNaN(v))) {
      setError("Invalid time format.");
      return;
    }
    const now = new Date();
    const startTs = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sh, sm, 0, 0).getTime();
    const endTs = new Date(now.getFullYear(), now.getMonth(), now.getDate(), eh, em, 0, 0).getTime();
    if (endTs <= startTs) {
      setError("End time must be after start time.");
      return;
    }
    const durationMinutes = Math.round((endTs - startTs) / 60000);
    const arr = {
      category,
      content,
      duration: durationMinutes,
      start,
      end,
      timestamp: Date.now(),
    };
    if (editing) {
      const update = [...data];
      update[editindex] = arr;
      setData(update);
      setEditing(false);
      seteditindex(null);
    } else {
      setData([...data, arr]);
    }
    setCategory("Work");
    setContent("");
    setStart("");
    setEnd("");
    setError("");
  };

  const editbtn = (index) => {
    const mydta = data[index];
    setCategory(mydta.category);
    setContent(mydta.content);
    setStart(mydta.start ?? "");
    setEnd(mydta.end ?? "");
    setEditing(true);
    seteditindex(index);
  };
  const myaddbtn = (e) => {
    setAddbtn((prev) => !prev);
    return;
  };
  const handleDelete = (num) => {
    setData((prev) => {
      const updatedval = [...prev];
      updatedval.splice(num, 1);
      return updatedval;
    });
  };
  const trackprops = {
    data,
    content,
    category,
    start,
    end,
    editing,
    submit: submitHandler,
    selectstate: setCategory,
    textareastate: setContent,
    startstate: setStart,
    endstate: setEnd,
    error,
    clearError: setError,
    editbtn,
    myaddbtn,
    addbtn,
    handleDelete,
    myfiltertime:setfiltertime,
    filtering
  };

  return (
    <>
      <nav style={{ padding: "1rem", background: "#dddbdb" }}>
        <Link style={{ color: "black" }} to="/">
          Signup
        </Link>{" "}
        |
        <Link style={{ color: "black" }} to="/admin">
          Admin
        </Link>{" "}
        |
        <Link style={{ color: "black" }} to="/eventtracker">
          Event tracker
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/eventtracker" element={<EventDashboard data={data} filtertime={filtertime} setFiltertime={setfiltertime} />} />
        <Route path="/add content" element={<Add {...trackprops} />} />
        <Route path="/works" element={<Works {...trackprops} />} />
        <Route path="/study" element={<Study {...trackprops} />} />
        <Route path="/play" element={<Play {...trackprops} />} />
        <Route path="/exercise" element={<Exercise {...trackprops} />} />
        <Route path="/social" element={<Social {...trackprops} />} />
        <Route path="/self-care" element={<Selfcare {...trackprops} />} />
      </Routes>
    </>
  );
};

export default App;
