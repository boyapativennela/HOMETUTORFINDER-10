import { Routes, Route, useLocation } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashBoard from "./components/StudentDashBoard";
import TutorDashBoard from "./components/TutorDashBoard";
import AdminDashBoard from "./components/AdminDashBoard";
import FindTutors from "./components/FindTutor";
import Navbar from "./components/Navbar";
import StudentProfile from "./components/StudentProfile";
import StudentBookingCheck from "./components/StudentBookingCheck";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/student-dashboard",
    "/tutor-dashboard",
    "/admin-dashboard",
  ];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashBoard />} />
        <Route path="/tutor-dashboard" element={<TutorDashBoard />} />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="/find-tutors" element={<FindTutors />} />
        <Route path="/my-profile" element={<StudentProfile />} />
        <Route path="/my-bookings" element={<StudentBookingCheck />} />
      </Routes>
    </>
  );
}

export default App;