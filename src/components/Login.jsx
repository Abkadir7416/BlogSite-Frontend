import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            // setAuth(response.data.token);  // Store token in context or local storage
            console.log("respose:: ", response);
            console.log("respose data:: ", response.data);
            localStorage.setItem('token', response.data.token);  // Optional
            // alert("Login successful!");
            // toaster 
            console.log('navigating to home page.')
            navigate('/home');
        } catch (error) {
            console.error('Login error', error);
            alert("Invalid credentials.");
        }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
        />
        <button type="submit" className="w-full bg-slate-900 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
