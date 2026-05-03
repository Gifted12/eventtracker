import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success('Account created successfully! ');
      setTimeout(() => navigate('/eventtracker'), 500);
    } catch (err) {
      toast.error(err.message || 'Sign-up failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Google sign-up successful! ');
      setTimeout(() => navigate('/eventtracker'), 500);
    } catch (err) {
      toast.error(err.message || 'Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign up to your account</p>
        <div className="input-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Usrname"
            required
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="submit">
          Sign Up
        </button>
        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          Sign up with Google
        </button>
        <p className="signup-link">
          Already have an account?
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
