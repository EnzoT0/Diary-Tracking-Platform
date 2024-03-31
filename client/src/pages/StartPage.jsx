import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import users from "../users.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StartPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    console.log(response.data.users);
  }

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleStart = () => {
    setShowLoginForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("Form Data:", formData);

    const email = formData.get("email");
    const password = formData.get("password");
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      navigate("/menu");
    } else {
      console.log("Invalid email or password");
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    const form = event.target.closest("form");
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      console.log("email exists nerd");
    } else {
      // console.log("registered succesfully");
      // console.log(users);
      const newUser = { email, password };
      users.push(newUser);
    }
  };

  return (
    <div className="start-page">
      <h1>Welcome</h1>
      {!showLoginForm ? (
        <button onClick={handleStart}>Register/Login</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      )}
    </div>
  );
}

export default StartPage;