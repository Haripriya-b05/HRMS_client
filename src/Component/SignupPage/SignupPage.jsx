import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
let baseUrl=import.meta.env.VITE_BASE_URL


const SignupPage = () => {
  let [signData, setSignData] = useState({});
  let [error, setError] = useState({});
   const navigate = useNavigate();

  let handleSignChange = (e) => {
    // console.log("handle change");
    let { name, value } = e.target;
    setSignData({ ...signData, [name]: value });
    // console.log(signData);
  };

  let handleValidate = (signData) => {
    let formError = {}; 

    if (!signData.name) {
      formError.name = "name is required!";
    }
    else if (!signData.email) {
      formError.email = "email is required!";
    }
    else if (!signData.password) {
      formError.password = "password is required!";
    }
    else if (!signData.confirmPassword) {
      formError.confirmPassword = "confirm password is required!";
    }

    else if(signData.password!=signData.confirmPassword){
      formError.invalid="both password doesn't match!";

    }
    else  {
      axios.post(`${baseUrl}/signup`,signData).then((res)=>{
        alert("Sign up Successfully");
         navigate("/login")
       
      }).catch((error)=>{
        alert(error.response?.data?.message)
      })


      console.log("API data:", signData);
      // navigate("/login")

    }
    setError(formError); 
  };

  let handleClick = () => {
    handleValidate(signData); 
   

    // console.log(loginData);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div></div>

      <div className="flex justify-center mt-24">
        <div className="w-100 h-auto border border-gray-300 rounded-md shadow-xl p-8">
          <h1 className="text-center font-bold text-2xl mb-8">Sign Up</h1>

          <div>
            <div className="mb-4">
              <label className="font-bold text-sm block mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 h-10 px-3 rounded"
                placeholder="Enter your full name"
                onChange={handleSignChange}
                name="name"
              />
              {error.name && (<p className="text-red-500 text-sm">{error.name}</p>)}
            </div>

            <div className="mb-4">
              <label className="font-bold text-sm block mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 h-10 px-3 rounded"
                placeholder="Enter your email"
                onChange={handleSignChange}
                name="email"
              />
              {error.email && (<p className="text-red-500 text-sm">{error.email}</p>)}
            </div>

            <div className="mb-4">
              <label className="font-bold text-sm block mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 h-10 px-3 rounded"
                placeholder="Create a password"
                onChange={handleSignChange}
                name="password"
              />
              {error.password && (<p className="text-red-500 text-sm">{error.password}</p>)}
            </div>

            <div className="mb-6">
              <label className="font-bold text-sm block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 h-10 px-3 rounded"
                placeholder="Confirm your password"
                onChange={handleSignChange}
                name="confirmPassword"
              />
              {error.confirmPassword && (<p className="text-red-500 text-sm">{error.confirmPassword}</p>)}
              {error.invalid && (<p className="text-red-500 text-sm">{error.invalid}</p>)}
            </div>

            <button className="w-full h-10 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={handleClick}>
              Sign Up
            </button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default SignupPage;
