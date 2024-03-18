import { useState } from 'react'
import "../styles/Menu.css"
import Calendar from './Calendar.jsx'

import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function Menu() {
    const [count, setCount] = useState(0)
    const navigate = useNavigate();

return (
    <>
        <h1>Hello User!</h1>
        <div className="menubtns">
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { navigate("/calendar");}}>Calendar</button>
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { navigate("/diary"); }}>Diary</button>
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { navigate("/goallist"); }}>GoalList</button>
        </div>
    </>
)
}

export default Menu
