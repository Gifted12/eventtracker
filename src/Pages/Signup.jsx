import React, { useState } from 'react';
import "./Signup.css";

const Signup = () => {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [allUSers, setAllusers] = useState([]);

  const submit = () => {
    console.log(Firstname, Lastname, Email, Password);
    let user = {
      Firstname,
      Lastname,
      Email,
      Password,
    };
    const newUSers = [...allUSers, user];
    setAllusers(newUSers);
    console.log(allUSers);
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <p className="form-title">Sign up to your account</p>
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder="First Name"
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            placeholder="Last Name"
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" onSubmit={submit} className="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <a href="">Sign up</a>
        </p>
      </form>
      <div className="cards-container">
        {allUSers.map((user, index) => (
          <div key={index} className="user-card">
            <h3 className="card-name">
              {user.Firstname} {user.Lastname}
            </h3>
            <p className="card-info">
              <strong>Email:</strong> {user.Email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Signup;
