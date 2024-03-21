import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './pages/Menu.jsx';
import Calendar from './pages/Calendar.jsx'
import Diary from './pages/Diary.jsx';
import Goallist from './pages/Goallist.jsx';
import StartPage from './pages/StartPage';


const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<StartPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/goallist" element={<Goallist />} />
            <Route path="/menu" element ={<Menu />} />
        </Routes>
    </Router>
)


export default App
