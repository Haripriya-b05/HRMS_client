import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
let baseUrl=import.meta.env.VITE_BASE_URL
import { useState,useEffect } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setEmployeeData } from "../../Features/Employee/EmployeeSlice";

export default function Pannel() {

  let  [employeeFormData,setEmployeeFormData]=useState([]);

  let dispatch=useDispatch();



  useEffect(()=>{
    axios.get(`${baseUrl}/get/fetchEmployee`).then((res)=>{
      let {success,message,data}=res.data;
      setEmployeeFormData(data);
      console.log(data)

      dispatch(setEmployeeData(data))

      
    }).catch((err)=>{
      let {success,message}=err.response.data;
      console.log(message)
    })
  },[])




    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 sticky top-0">
      <header className="flex flex-col gap-4 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-sky-600 px-4 py-3 text-white shadow-sm">
            <span className="text-lg font-semibold">HRMS Admin</span>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm text-slate-600">
            {/* <Link to="dashboard"> */}
              <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{navigate("dashboard")}}>
                Dashboard
              </button>
            {/* </Link> */}
            <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{navigate("employee")}}>
              Employees
            </button>
            <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{navigate("attendance")}}>
              Attendance
            </button>
            <button className="rounded-full px-4 py-2 hover:bg-slate-100" onClick={()=>{navigate("payroll")}}>
              Payroll
            </button>
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2 shadow-sm">
            <span className="text-sm font-medium">Admin</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-88px)] grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-base font-semibold text-slate-900">
            HRMS Menu
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {[
              "Dashboard",
              "Employee",
              "Attendance",
              "Leave Requests",
              "Payroll",
              "Performance",
              "Reports",
              "Settings",
            ].map((item) => (
              <button
                key={item}
                className="flex justify-start rounded-2xl px-4 py-3 hover:bg-slate-50 hover:text-slate-900"
              onClick={()=>{navigate(`/panel/${item.toLowerCase().replace(' ','-')}`)}}>
                {item}
              </button>
            ))}
          </ul>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}
