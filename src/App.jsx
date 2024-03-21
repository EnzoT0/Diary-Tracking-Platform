import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './pages/Menu.jsx';
import Calendar from './pages/Calendar.jsx'
import Diary from './pages/Diary.jsx';
import Goallist from './pages/Goallist.jsx';
import CalendarNew from './pages/CalendarNew.jsx';

const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<Menu />} />
            <Route path="/calendar" element={<CalendarNew />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/goallist" element={<Goallist />} />
        </Routes>
    </Router>
)


export default App
