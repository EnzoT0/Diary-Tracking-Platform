// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Menu from './pages/Menu.jsx';
// // import CalendarNew from './pages/CalendarNew.jsx'
// import Diary from './pages/Diary.jsx';
// import Goallist from './pages/Goallist.jsx';
// import CalendarNew from './pages/CalendarNew.jsx';
// import EmotionBoard from './pages/EmotionBoard.jsx';
// import IssueBoard from './pages/IssueBoard.jsx';
// import DiaryEntry from './pages/DiaryEntry.jsx';
// import StartPage from './pages/StartPage.jsx';

// const App = () => (
//     <Router>
//         <Routes>
//             <Route exact path="/" element={<StartPage />} />
//             <Route path="/calendar" element={<CalendarNew />} />
//             <Route path="/diary" element={<Diary />} />
//             <Route path="/goallist" element={<Goallist />} />
//             <Route path="/emotionBoard" element={<EmotionBoard />} />
//             <Route path="/issueBoard" element={<IssueBoard />} />
//             <Route path="/diaryEntry" element={<DiaryEntry />} />
//             <Route path="/menu" element={<Menu />} />

//         </Routes>
//     </Router>
// )

// export default App

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Menu from "./pages/Menu.jsx";
import Calendar from "./pages/Calendar.jsx";
import Diary from "./pages/Diary.jsx";
import Goallist from "./pages/Goallist.jsx";
import CalendarNew from "./pages/CalendarNew.jsx";
import EmotionBoard from "./pages/EmotionBoard.jsx";
import IssueBoard from "./pages/IssueBoard.jsx";
import DiaryEntry from "./pages/DiaryEntry.jsx";
import StartPage from "./pages/StartPage.jsx";
import DiaryList from "./pages/DiaryList.jsx";
import Profile from "./pages/Profile.jsx";
import Friends from "./pages/Friends.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<StartPage />} />
      <Route path="/calendar" element={<CalendarNew />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/goallist" element={<Goallist />} />
      <Route path="/emotionBoard" element={<EmotionBoard />} />
      <Route path="/issueBoard" element={<IssueBoard />} />
      <Route path="/diaryEntry" element={<DiaryEntry />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/diarylist" element={<DiaryList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/friends" element={<Friends />} />
    </Routes>
  </Router>
);

export default App;
