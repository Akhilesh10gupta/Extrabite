import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom'; // ✅ Added Link here
import Nav from '../components/Header/Nav';
import Heading from '../components/Header/Heading';
import Footer from '../components/Footer/Footer';
import { isLoggedIn } from '../util/auth';
import { loginUser } from '../util/api';

function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      alert(res.message || 'Login successful!');
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('role', res.role);
      navigate('/home2');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (isLoggedIn()) return <Navigate to="/home2" />;

  return (
    <>
      <Heading />
      <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] to-[#0A1A3C] min-h-screen flex flex-col">
        <Nav />

        <div className="text-left mt-10 px-6 sm:px-10 md:px-20">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Welcome To Extra Bite</h1>
          <div className="w-full border-t-2 border-[#E87730] mt-1"></div>
        </div>

        <div className="flex flex-grow items-center justify-center py-10 px-10 pb-24">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-center text-xl sm:text-2xl font-bold text-[#E87730] mb-6">
              Sign In
            </h2>

            <div className="mx-7">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none"
                required
              />
            </div>

            <div className="mx-7">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mb-2 outline-none"
                required
              />
            </div>

            {/* 🔗 Forgot Password Link */}
            <div className="mx-7 text-right mb-4">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="mx-7">
              <button
                type="submit"
                className="bg-[#FF7401] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Login
              </button>
            </div>

            {/* 🆕 Sign Up Redirect */}
            <div className="mx-7 mt-4 text-center">
              <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
              <Link to="/signup" className="text-sm text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Signin;
