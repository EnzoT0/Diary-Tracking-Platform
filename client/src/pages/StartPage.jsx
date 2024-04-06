import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import users from "../users.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StartPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users", {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleStart = () => {
    setShowLoginForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      navigate("/menu?eid=" + email);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target);
    const form = event.target.closest("form");
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post("http://localhost:8080/register", {
        name: name,
        email: email,
        password: password,
      });
      // console.log("Registration successful:", response.data);
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => {
        form.reset();
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
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
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
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
      {showSuccessMessage && (
        <div className="success-message">Successfully registered!</div>
      )}
      <div>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StartPage;
