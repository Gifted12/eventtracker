import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Signup.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful! ');
      setTimeout(() => navigate('/eventtracker'), 500);
    } catch (err) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Google sign-in successful! ');
      setTimeout(() => navigate('/eventtracker'), 500);
    } catch (err) {
      toast.error('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title"> Login </p>
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
          Log In
        </button>
        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
        <p className="signup-link">
          Don't have an account? 
          <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;