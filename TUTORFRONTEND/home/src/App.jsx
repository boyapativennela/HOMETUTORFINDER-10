import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashBoard from "./components/StudentDashBoard";
import TutorDashBoard from "./components/TutorDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
import ProfileTutor from "./components/ProfileTutor";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/student-dashboard" element={<StudentDashBoard />} />
        <Route path="/tutor-dashboard" element={<TutorDashBoard />} />
       <Route path="/admin-dashboard" element={<AdminDashBoard />} />
       <Route path="/tutor-profile" element={<ProfileTutor />} />

      </Routes>
    </Router>
  );
}

export default App;
