import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import LoginPage from "./Component/LoginPage/LoginPage";
import Navbar from "./Component/NavBar/NavBar";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import SignupPage from "./Component/SignupPage/SignupPage";
import Panel from "./Component/Admin/Panel";
import Dashboard from "./Component/Admin/Dashboard";
import Employee from "./Component/Admin/Pages/Employee";
import Hero from "./Component/Hero";
import Attendance from "./Component/Admin/Pages/Attendance";
import LeaveRequest from "./Component/Admin/Pages/LeaveRequest";
import Payroll from "./Component/Admin/Pages/Payroll";
import Reports from "./Component/Admin/Pages/Reports";
import Settings from "./Component/Admin/Pages/Settings";
import Performance from "./Component/Admin/Pages/Performance";
import RequireAuth from "./Component/RequireAuth";
import EmployeePanel from "./Component/Employee_Panel/EmployeePanel";
import EmployeeDashboard from "./Component/Employee_Panel/Pages/EmployeeDashboard";
import EmployeeProfile from "./Component/Employee_Panel/Pages/EmployeeProfile";
import EmployeeAttendance from "./Component/Employee_Panel/Pages/EmployeeAttendance";


function App() {
  return (
    <>
      {/* <Navbar/>
     <LoginPage/> */}

      <BrowserRouter>
        {/* <Navbar/> */}

        <Routes>
          {/* <Route path="/" element={<Hero />} /> */}
          <Route path="/" element={<Navigate to="/login" replace/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<RequireAuth/>}>
          <Route path="/panel" element={<Panel />}>
            {/* index use karne se ye bydefault yhi page open hoga */}
            <Route index element={<Dashboard />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employee" element={<Employee />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave-requests" element={<LeaveRequest />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="performance" element={<Performance />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings/>} />
            </Route>
          </Route>


          <Route path="employeePanel" element={<EmployeePanel/>}>
          <Route index element={<EmployeeDashboard />} />

            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="attendance" element={<EmployeeAttendance />} />
            


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
