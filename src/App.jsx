import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import EventDashboard from "./Pages/Eventracker/EventDashboard";
import Works from "./Pages/Eventracker/Works";
import Study from "./Pages/Eventracker/Study";
import Play from "./Pages/Eventracker/Play";
import Exercise from "./Pages/Eventracker/Exercise";
import Social from "./Pages/Eventracker/Social";
import Selfcare from "./Pages/Eventracker/Selfcare";
import Add from "./Pages/Eventracker/Add";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";

const App = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "User";
  const userAvatar = currentUser?.photoURL || null;
  const [category, setCategory] = useState("Work");
  const [content, setContent] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addbtn, setAddbtn] = useState(false);
  const [filtertime, setfiltertime] = useState("");
  const [editId, setEditId] = useState(null);

  const mydate = new Date();
  const full = mydate.toDateString();

  const filtering = (item) => {
    const updated = data.filter((e) => e.category === item);
    return updated;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load data from Firestore when user changes
  useEffect(() => {
    if (currentUser) {
      setDataLoading(true);
      const unsubscribe = db.collection('users').doc(currentUser.uid).collection('events')
        .onSnapshot((snapshot) => {
          const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setData(events);
          setDataLoading(false);
        }, (error) => {
          toast.error("Failed to load events: " + error.message);
          setDataLoading(false);
        });
      return unsubscribe;
    } else {
      setData([]);
      setDataLoading(false);
    }
  }, [currentUser]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!category || !content || !start || !end) {
      toast.error("Please fill category, task, start and end time.")
      return;
    }
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    console.log(start, end);
    if ([sh, sm, eh, em].some((v) => isNaN(v))) {
      toast.error("Invalid time format.");
      return;
    }
    const now = new Date();
    const startTs = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      sh,
      sm,
      0,
      0,
    ).getTime();
    const endTs = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      eh,
      em,
      0,
      0,
    ).getTime();
    if (endTs <= startTs) {
      toast.error("End time must be after start time.");
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
    try {
      setSaving(true);
      if (editing) {
        await db.collection('users').doc(currentUser.uid).collection('events').doc(editId).update(arr);
        toast.success("Event updated successfully! ");
      } else {
        await db.collection('users').doc(currentUser.uid).collection('events').add(arr);
        toast.success("Event added successfully! ");
      }
      setCategory("Work");
      setContent("");
      setStart("");
      setEnd("");
      setEditing(false);
      setEditId(null);
      setAddbtn(false);
    } catch (error) {
      toast.error("Failed to save event: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const editbtn = (item) => {
    if (!item) return;
    setCategory(item.category);
    setContent(item.content);
    setStart(item.start ?? "");
    setEnd(item.end ?? "");
    setEditing(true);
    setEditId(item.id);
    setAddbtn(true);
  };
  const myaddbtn = () => {
    setAddbtn((prev) => {
      const next = !prev;
      if (!next) {
        setEditing(false);
        setEditId(null);
        setCategory("Work");
        setContent("");
        setStart("");
        setEnd("");
      }
      return next;
    });
  };
  const handleDelete = async (item) => {
    const id = item?.id || item;
    if (!id) return;
    try {
      await db.collection('users').doc(currentUser.uid).collection('events').doc(id).delete();
      toast.success("Event deleted successfully! 🗑️");
    } catch (error) {
      toast.error("Failed to delete event: " + error.message);
    }
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
    editbtn,
    myaddbtn,
    addbtn,
    handleDelete,
    setfiltertime,
    filtertime,
    filtering,
    loading: dataLoading,
    saving,
    userName,
    userAvatar,
  };

  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand"> Event Tracker</div>
          <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            {currentUser ? (
              <>
                <span className="navbar-user">
                  {userAvatar ? (
                    <img src={userAvatar} alt={`${userName} avatar`} className="user-avatar" />
                  ) : null}
                  Hi, {userName}
                </span>
                <Link to="/eventtracker" onClick={closeMenu}>Dashboard</Link>
                <Link to="/admin" onClick={closeMenu}>Admin</Link>
                <button className="navbar-logout" onClick={() => { logout(); closeMenu(); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>Login</Link>
                <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to={currentUser ? "/eventtracker" : "/login"} />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/eventtracker" element={<ProtectedRoute><EventDashboard {...trackprops} /></ProtectedRoute>}/>
        <Route path="/add content" element={<ProtectedRoute><Add {...trackprops} /></ProtectedRoute>} />
        <Route path="/works" element={<ProtectedRoute><Works {...trackprops} /></ProtectedRoute>} />
        <Route path="/study" element={<ProtectedRoute><Study {...trackprops} /></ProtectedRoute>} />
        <Route path="/play" element={<ProtectedRoute><Play {...trackprops} /></ProtectedRoute>} />
        <Route path="/exercise" element={<ProtectedRoute><Exercise {...trackprops} /></ProtectedRoute>} />
        <Route path="/social" element={<ProtectedRoute><Social {...trackprops} /></ProtectedRoute>} />
        <Route path="/self-care" element={<ProtectedRoute><Selfcare {...trackprops} /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
