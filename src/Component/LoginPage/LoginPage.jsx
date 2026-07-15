import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

let baseUrl=import.meta.env.VITE_BASE_URL

const LoginPage = () => {
  let [loginData, setLoginData] = useState({});
  let [error, setError] = useState({});

  const navigate = useNavigate();

  let handleChange = (e) => {
    // console.log("handle change");
    let { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    // console.log(loginData);
  };

  let handleValidate = (loginData) => {
    let formError = {}; //ye error messages ko store karna keliye banaya gaya hai

    if (!loginData.email) {
      formError.email = "email is required!";
    }
    else if (!loginData.password) {
      formError.password = "password is required!";
    }
    else {
      axios.post(`${baseUrl}/login`,loginData).then((res)=>{

        localStorage.setItem("auth_token",res.data.token)

        alert("Welcome to dashboard");
        navigate("/panel")

      }).catch((error)=>{
        setError({message:error.response?.data?.message});
      })

      console.log("API data:", loginData);
    }
    setError(formError); // jo bhi form error oj=bj mein hai usko hum error wale state mein store kar rahe hai
  };

  let handleClick = () => {
    handleValidate(loginData); //jab login button click hoga toh pehle ye validatin check karega then hi data ko ko print karega console pe
    
    
  };

  

  return (
    <div className="grid grid-cols-3 gap-6">
      <div></div>

      <div className="flex justify-center mt-24">
        <div className="w-100 h-auto border border-gray-300 rounded-md shadow-xl p-8">
          <h1 className="text-center font-bold text-2xl mb-8">Login</h1>

          <div>
            <div className="mb-4">
              <label className="font-bold text-sm block mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 h-10 px-3 rounded"
                placeholder="Enter your email"
                onChange={handleChange}
                name="email"
              />
              {error.email && (<p className="text-red-500 text-sm">{error.email}</p>)}
            </div>

            <div className="mb-6">
              <label className="font-bold text-sm block mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 h-10 px-3 rounded"
                placeholder="Enter your password"
                onChange={handleChange}
                name="password"
              />
              {error.password && (<p className="text-red-500 text-sm">{error.password}</p>)}
            </div>

            
            {error.message && (<p className="text-red-500 text-sm">{error.message}</p>)}
            <button
              className="w-full h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleClick}
            >
              
              Login
              
            </button>
           

            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default LoginPage;
