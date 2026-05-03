import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
import './Signup.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Enter your email address.');
      return;
    }

    try {
      await resetPassword(email);
      toast.success('Password reset email sent. Check your inbox.');
      setEmail('');
    } catch (err) {
      console.error('Password reset error:', err);
      toast.error(err?.message || 'Could not send reset email. Please verify your email and try again.');
    }
  };

  return (
    <div className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Reset Password</p>

        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" className="submit">
          Send Reset Email
        </button>

        <p className="signup-link">
          Remembered your password?
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
