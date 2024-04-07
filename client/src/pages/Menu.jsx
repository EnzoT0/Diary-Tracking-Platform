import { useState } from "react";
import "../styles/Menu.css";
import Calendar from "./Calendar.jsx";

import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Menu() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");

  return (
    <>
      <h1>Hello User!</h1>
      <div className="menubtns">
        <button
          style={{ fontSize: "24px", padding: "5em" }}
          onClick={() => {
            navigate("/calendar?eid=" + eid);
          }}
        >
          Calendar
        </button>
        <button
          style={{ fontSize: "24px", padding: "5em" }}
          onClick={() => {
            navigate("/diarylist?eid=" + eid);
          }}
        >
          Diary
        </button>
        <button
          style={{ fontSize: "24px", padding: "5em" }}
          onClick={() => {
            navigate("/goallist?eid=" + eid);
          }}
        >
          GoalList
        </button>
      </div>
      <div className="profile-link">
        <Link
          to={`/profile?eid=${eid}`}
          style={{
            fontSize: "18px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          Profile
        </Link>
      </div>
      <div className="friends-button">
        <button
          style={{
            fontSize: "24px",
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={() => {
            navigate("/friends?eid=" + eid);
          }}
        >
          Show Friends
        </button>
      </div>
    </>
  );
}

export default Menu;