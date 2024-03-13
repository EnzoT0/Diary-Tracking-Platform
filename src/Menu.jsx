import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Menu() {
  const [count, setCount] = useState(0)

return (
    <>
        <h1>Hello User!</h1>
        <div className="menubtns">
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { /* logic to navigate to Calendar */ }}>Calendar</button>
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { /* logic to navigate to Diary */ }}>Diary</button>
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { /* logic to navigate to GoalList */ }}>GoalList</button>
        </div>
    </>
)
}

export default Menu
