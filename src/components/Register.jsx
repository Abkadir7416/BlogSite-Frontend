import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      if (data.data.msg === "User already exists") {
        toast.warning("User already exists, please login.");
      } else {
        toast.success("Registration successfully! Please login.");
      }

      navigate("/login");
    } catch (error) {
      toast.error("Error registering user.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
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
        <button
          type="submit"
          className="w-full bg-slate-900 text-white p-2 rounded "
        >
          Register
        </button>
        <p className="mt-3">
          Already have account?{" "}
          <Link className="border-b border-b-blue-500 " to="/login">
            <b>Login here</b>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
