import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "./Features/Employee/EmployeeSlice"

let store=configureStore({
    reducer:{
        employee:employeeReducer
    },
})

export default store;