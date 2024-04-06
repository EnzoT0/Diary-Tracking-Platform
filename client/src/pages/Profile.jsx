import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [showNameForm, setShowNameForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/userupdate", {
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handleNameUpdate = () => {
    setShowNameForm(true);
    setShowEmailForm(false);
    setShowPasswordForm(false);
  };

  const handleEmailUpdate = () => {
    setShowNameForm(false);
    setShowEmailForm(true);
    setShowPasswordForm(false);
  };

  const handlePasswordUpdate = () => {
    setShowNameForm(false);
    setShowEmailForm(false);
    setShowPasswordForm(true);
  };

  const handleNameChange = (newName) => {
    setUser({ ...user, name: newName });
  };

  const handleEmailChange = (newEmail) => {
    setUser({ ...user, email: newEmail });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/userupdate", {
        data: { status: "delete" },
        withCredentials: true,
      });
      alert("user deleted");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function NameForm() {
    const [newName, setNewName] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.put(
          "http://localhost:8080/userupdate",
          { status: "nameChange", name: newName },
          { withCredentials: true }
        );
        setNewName("");
        setError("");
        handleNameChange(newName);
        alert("Name changed!");
        setTimeout(() => {
          setShowNameForm(false);
        }, 3000);
      } catch (error) {
        alert("Error updating name:", error);
      }
    };

    return (
      <div>
        <h2>Update Name</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              New Name:
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                pattern="[A-Za-z\s]+"
                title="Name must only contain alphabetic characters"
                required
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  function EmailForm() {
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.put(
          "http://localhost:8080/userupdate",
          {
            status: "emailChange",
            email: newEmail,
          },
          { withCredentials: true }
        );
        handleEmailChange(newEmail);
        setNewEmail("");
        setError("");
        alert("Email changed!");
        setTimeout(() => {
          setShowEmailForm(false);
        }, 3000);
      } catch (error) {
        setError("An error occurred. Please try again later.");
      }
    };

    return (
      <div>
        <h2>Update Email</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              New Email:
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  function PasswordForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        // Send a request to verify old password and update it
        const response = await axios.put(
          "http://localhost:8080/userupdate",
          {
            status: "passwordChange",
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          { withCredentials: true }
        );
        setSuccessMessage(response.data.message);
        setOldPassword("");
        setNewPassword("");
        setError("");
        alert(`Old Password: ${oldPassword}\nNew Password: ${newPassword}`);
        setTimeout(() => {
          setSuccessMessage("");
          setShowPasswordForm(false);
        }, 3000);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Old password is incorrect.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    };

    return (
      <div>
        <h2>Update Password</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Old Password:
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          fontSize: "18px",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <Link to="/menu">Back to Menu</Link>
      </div>
      {user && (
        <div>
          <h2>Profile</h2>
          <p>
            Name: {user.name}{" "}
            <button onClick={handleNameUpdate}>Update Name</button>
          </p>
          <p>
            Email: {user.email}{" "}
            <button onClick={handleEmailUpdate}>Update Email</button>
          </p>
          <button onClick={handlePasswordUpdate}>Update Password</button>
          <br />
          {/* Render forms based on user actions */}
          {showNameForm && <NameForm onNameChange={handleNameChange} />}
          {showEmailForm && <EmailForm onEmailChange={handleEmailChange} />}
          {showPasswordForm && <PasswordForm />}
          <button onClick={handleDelete}>Delete Account</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
