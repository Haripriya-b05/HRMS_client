import React, { useState, useEffect } from "react";
import axios from "axios";
let baseUrl=import.meta.env.VITE_BASE_URL

// shadcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Employee = () => {
  let [formData, setFormData] = useState({});
  let [error, setError] = useState({});
  let [employeeData, setEmployeeData] = useState([]);
  let [openModel, setOpenModel] = useState(false);
  let [openEditModel, setOpenEditModel] = useState(false);

  let [editIndex, setEditIndex] = useState(null);

  let handleChange = (e) => {
    let { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let handleValidate = (formData) => {
    let formError = {};

    if (!formData.name) {
      formError.name = "Name is required!";
    }

    if (!formData.email) {
      formError.email = "Email is required!";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formError.email = "Enter valid email!";
    }
    if (!formData.mobile) {
      formError.mobile = "Mobile no is required!";
    }

    if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
      formError.mobile = "Mobile must be 10 digits!";
    }

    if (!formData.id) {
      formError.id = "Employee ID is required!";
    }

    if (!formData.designation) {
      formError.designation = "Designation is required!";
    }

    if (!formData.department) {
      formError.department = "Department is required!";
    }

    if (!formData.address) {
      formError.address = "Address is required!";
    }

    if (!formData.joiningDate) {
      formError.joiningDate = "Joining Date is required!";
    }

    if (!formData.salary) {
      formError.salary = "Salary is required!";
    }

    setError(formError);

    return Object.keys(formError).length === 0;
  };

  let handleClick = () => {
    let isValid = handleValidate(formData);

    if (isValid) {
      setEmployeeData([...employeeData, formData]);
      axios
        .post(`${baseUrl}/post/addEmployee`, formData)
        .then((res) => {
          
          alert("Added successfully");
        })
        .catch((error) => {
          alert(error.response?.data?.message);
        });
        

      setFormData({});
      setError({});
      setOpenModel(false)
     
      

      console.log("Submitted Data:", formData);
    }
  };

  const fetchEmployee = () => {
    axios
      .get(`${baseUrl}/get/fetchEmployee`)
      .then((res) => {
        setEmployeeData(res.data.data); // IMPORTANT
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchEmployee();
  }, []);

  
  
  
  let handleUpdate = () => {
    let isValid = handleValidate(formData);

    if (!isValid) return;
    axios
      .put(
        `${baseUrl}/put/updateEmployee/${formData.id}`,
        formData,
      )
      .then((res) => {

        setFormData({});
        setEditIndex(null);
        setError({});
        setOpenEditModel(false);

        fetchEmployee();
      })
      .catch((error) => {
        alert(error.response?.data?.message);
      });
  };


 const handleDelete = (id) => {

  if (!window.confirm("Are you sure you want to delete this employee?")) {
    return;
  }

  axios
    .delete(`${baseUrl}/delete/deleteEmployee/${id}`)
    .then((res) => {
      alert(res.data.message);
      fetchEmployee();
    })
    .catch((error) => {
      alert(error.response?.data?.message || "Failed to delete employee");
    });
};


  return (
    <>
      <div>
        <Dialog
          open={openModel}
          onOpenChange={() => {
            setOpenModel(true);
          }}
        >
          <div className="text-end">
            <DialogTrigger className="rounded-xl border-2 border-blue-600 px-6 py-2 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
              Add Employee
            </DialogTrigger>
          </div>
        </Dialog>

        <Dialog open={openModel}>
          <DialogContent className="!w-[95vw] !max-w-[1000px] max-h-[92vh] overflow-y-auto rounded-2xl border-0 bg-white shadow-2xl">
            {" "}
            <DialogHeader>
              <DialogTitle className="border-b pb-4 text-center text-2xl font-bold text-slate-800">
                Employee Form
              </DialogTitle>

              <div className="mt-2 text-center">
                <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                  HR Management System
                </span>
              </div>

              <DialogDescription asChild>
                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-black">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Employee ID */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Employee ID"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="id"
                        value={formData.id || ""}
                        onChange={handleChange}
                      />
                      {error.id && (
                        <p className="mt-1 text-xs text-red-500">{error.id}</p>
                      )}
                    </div>

                    {/* Employee Name */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Employee Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Employee Name"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                      />
                      {error.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {error.name}
                        </p>
                      )}
                    </div>

                    {/* Designation */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Designation
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Designation"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="designation"
                        value={formData.designation || ""}
                        onChange={handleChange}
                      />
                      {error.designation && (
                        <p className="mt-1 text-xs text-red-500">
                          {error.designation}
                        </p>
                      )}
                    </div>

                    {/* Department */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Department
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Department"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="department"
                        value={formData.department || ""}
                        onChange={handleChange}
                      />
                      {error.department && (
                        <p className="mt-1 text-xs text-red-500">
                          {error.department}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter Email"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                      />
                      {error.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {error.email}
                        </p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Mobile Number"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="mobile"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                      />
                      {error.mobile && (
                        <p className="mt-1 text-xs text-red-500">
                          {error.mobile}
                        </p>
                      )}
                    </div>

                    {/* Joining Date */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Date of Joining
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="joiningDate"
                        value={formData.joiningDate || ""}
                        onChange={handleChange}
                      />
                      {error.joiningDate && (
                        <p className="mt-1 text-xs text-red-500">
                          {error.joiningDate}
                        </p>
                      )}
                    </div>

                    {/* Salary */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Salary
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Salary"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        name="salary"
                        value={formData.salary || ""}
                        onChange={handleChange}
                      />
                      {error.salary && (
                        <p className="mt-1 text-xs text-red-500">
                          {error.salary}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Address
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter Address"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                    />
                    {error.address && (
                      <p className="mt-1 text-xs text-red-500">
                        {error.address}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex justify-end gap-3">
                    <button
                      className="rounded-xl border border-slate-300 px-5 py-2 font-medium hover:bg-slate-100"
                      onClick={() => {
                        setOpenModel(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleClick}
                      className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                    >
                      Save Employee
                    </button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <h2 className="mt-8 mb-4 text-xl font-bold text-slate-800">
          Employee List
        </h2>
        <div className="mt-8 max-h-[450px] overflow-y-auto overflow-x-auto rounded-xl border border-slate-200 shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="sticky top-0 bg-blue-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Designation</th>
                <th className="px-3 py-2 text-left">Department</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Mobile</th>
                <th className="px-3 py-2 text-left">Joining Date</th>
                <th className="px-3 py-2 text-left">Salary</th>
                <th className="px-3 py-2 text-left">Address</th>
                <th className="px-3 py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {employeeData.map((employee, index) => (
                <tr
                  key={index}
                  className="border-b transition hover:bg-slate-50"
                >
                  <td className="px-2 py-3">{employee.id}</td>
                  <td className="px-2 py-3">{employee.name}</td>
                  <td className="px-2 py-3">{employee.designation}</td>
                  <td className="px-2 py-3">{employee.department}</td>
                  <td className="px-2 py-3">{employee.email}</td>
                  <td className="px-2 py-3">{employee.mobile}</td>
                  <td className="px-2 py-3">{employee.joiningDate}</td>
                  <td className="px-2 py-3">₹{employee.salary}</td>
                  <td className="px-2 py-3">{employee.address}</td>
                  <td className="px-2 py-3">
                    <button>
                      <Dialog
                        open={openEditModel}
                        onOpenChange={() => {
                          setOpenEditModel(true);
                        }}
                      >
                        <div className="text-end">
                          <DialogTrigger
                            onClick={() => {
                              setFormData(employee);
                              setEditIndex(index);
                              setOpenEditModel(true);
                            }}
                            className="rounded-xl border-1 border-blue-600 px-2 py-1 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          >
                            Edit
                          </DialogTrigger>
                          <DialogContent className="!w-[95vw] !max-w-[1000px] max-h-[92vh] overflow-y-auto rounded-2xl border-0 bg-white shadow-2xl">
                            {" "}
                            <DialogHeader>
                              <DialogTitle className="border-b pb-4 text-center text-2xl font-bold text-slate-800">
                                Edit Employee Form
                              </DialogTitle>

                              <div className="mt-2 text-center">
                                <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
                                  HR Management System
                                </span>
                              </div>

                              <DialogDescription asChild>
                                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-black">
                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {/* Employee ID */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Employee ID
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter Employee ID"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="id"
                                        value={formData.id || ""}
                                        onChange={handleChange}
                                      />
                                      {error.id && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.id}
                                        </p>
                                      )}
                                    </div>

                                    {/* Employee Name */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Employee Name
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter Employee Name"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleChange}
                                      />
                                      {error.name && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.name}
                                        </p>
                                      )}
                                    </div>

                                    {/* Designation */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Designation
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter Designation"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="designation"
                                        value={formData.designation || ""}
                                        onChange={handleChange}
                                      />
                                      {error.designation && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.designation}
                                        </p>
                                      )}
                                    </div>

                                    {/* Department */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Department
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter Department"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="department"
                                        value={formData.department || ""}
                                        onChange={handleChange}
                                      />
                                      {error.department && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.department}
                                        </p>
                                      )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Email
                                      </label>
                                      <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                      />
                                      {error.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.email}
                                        </p>
                                      )}
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Mobile Number
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Enter Mobile Number"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="mobile"
                                        value={formData.mobile || ""}
                                        onChange={handleChange}
                                      />
                                      {error.mobile && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.mobile}
                                        </p>
                                      )}
                                    </div>

                                    {/* Joining Date */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Date of Joining
                                      </label>
                                      <input
                                        type="date"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="joiningDate"
                                        value={formData.joiningDate || ""}
                                        onChange={handleChange}
                                      />
                                      {error.joiningDate && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.joiningDate}
                                        </p>
                                      )}
                                    </div>

                                    {/* Salary */}
                                    <div>
                                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Salary
                                      </label>
                                      <input
                                        type="number"
                                        placeholder="Enter Salary"
                                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                        name="salary"
                                        value={formData.salary || ""}
                                        onChange={handleChange}
                                      />
                                      {error.salary && (
                                        <p className="mt-1 text-xs text-red-500">
                                          {error.salary}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Address */}
                                  <div className="mt-4">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                      Address
                                    </label>
                                    <textarea
                                      rows={2}
                                      placeholder="Enter Address"
                                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                                      name="address"
                                      value={formData.address || ""}
                                      onChange={handleChange}
                                    />
                                    {error.address && (
                                      <p className="mt-1 text-xs text-red-500">
                                        {error.address}
                                      </p>
                                    )}
                                  </div>

                                  {/* Buttons */}
                                  <div className="mt-5 flex justify-end gap-3">
                                    <button
                                      className="rounded-xl border border-slate-300 px-5 py-2 font-medium hover:bg-slate-100"
                                      onClick={() => {
                                        setOpenEditModel(false);
                                      }}
                                    >
                                      Cancel
                                    </button>

                                    <button
                                      onClick={handleUpdate}
                                      className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                                    >
                                      Update Employee
                                    </button>
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </div>
                      </Dialog>
                    </button>

                    <button onClick={() => handleDelete(employee.id)} className="rounded-xl border-1 border-red-600 px-2 py-1 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* {employeeData.length > 0 && (
          <div >
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              Employee Directory
            </h2>

            <div className="max-h-[500px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {employeeData.map((employee, index) => (
                  <div
                    key={index}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-bold text-white">
                        {employee.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          {employee.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {employee.designation}
                        </p>
                      </div>
                    </div>

                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-500">
                          Employee ID
                        </span>
                        <span className="font-semibold text-slate-700">
                          {employee.id}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-slate-500">
                          Department
                        </span>
                        <span className="font-semibold text-slate-700">
                          {employee.department}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-slate-500">
                          Mobile
                        </span>
                        <span className="font-semibold text-slate-700">
                          {employee.mobile}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-slate-500">
                          Salary
                        </span>
                        <span className="font-semibold text-green-600">
                          ₹{employee.salary}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-slate-500">
                          Email
                        </span>
                        <p className="mt-1 font-semibold text-slate-700">
                          {employee.email}
                        </p>
                      </div>

                      <div>
                        <span className="font-medium text-slate-500">
                          Address
                        </span>
                        <p className="mt-1 text-slate-700">
                          {employee.address}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          Joined: {employee.joiningDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Employee;
