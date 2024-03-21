import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import users from '../users.json'
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const navigate = useNavigate();
  
    const handleStart = () => {
      setShowLoginForm(true);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      console.log('Form Data:', formData);

      const email = formData.get('email');
      const password = formData.get('password');
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        console.log('Login successful:', user.email);
        console.log('Password: ', user.password)
        navigate("/menu")
        
    } else {
        console.log('Login unsuccessful:', user.email);
        console.log('Password: ', user.password)
        console.log('Invalid email or password');
      }
    }

    const handleRegister = () => {
        console.log('Register button clicked');
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
            <button type="button" onClick={handleRegister}>Register</button>
          </form>
        )}
      </div>
    );
  }
  

  export default StartPage