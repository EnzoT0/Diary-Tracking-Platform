import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './pages/Menu.jsx';
import Calendar from './pages/Calendar.jsx'
import Diary from './pages/Diary.jsx';
import Goallist from './pages/Goallist.jsx';

const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<Menu />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/goallist" element={<Goallist />} />
        </Routes>
    </Router>
)


export default App
