import React, { useState } from "react";
import "../styles/login-page.scss";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";

const LoginPage = () => {
  useAuthRedirect();
  // State for form fields
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // State for error and logout alerts (can be fetched from props or context if needed)
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const logout = params.get("logout");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    // Basic validation
    if (!user.email || !user.password) {
      setError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      } else {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      }

      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Pattern */}
      <div className="bg-pattern"></div>

      {/* Floating Football Elements */}
      <svg
        className="floating-element football-1"
        width="50"
        height="50"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="white" />
        <path d="M50 5 L50 95 M5 50 L95 50" stroke="black" strokeWidth="2" />
      </svg>

      <svg
        className="floating-element football-2"
        width="40"
        height="40"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="45" fill="white" />
        <path d="M50 5 L50 95 M5 50 L95 50" stroke="black" strokeWidth="2" />
      </svg>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            {/* Alerts */}
            {error && (
              <div className="alert alert-danger">
                Invalid Email or Password
              </div>
            )}
            {logout && (
              <div className="alert alert-success">
                You have been logged out.
              </div>
            )}

            {/* Main Login Form */}
            <div className="glass-container">
              <div className="logo-container">
                <img
                  src="https://pbs.twimg.com/profile_images/1788231088302653440/5xKfAdI8_200x200.jpg"
                  alt="RPL Logo"
                />
              </div>
              <h1 className="form-title">Rwanda Premier League</h1>

              <form method="post" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {loading ? "Loading..." : "Sign In"}
                </button>

                <div className="links-container">
                  <a href="/register" className="text-white">
                    Create Account
                  </a>
                  <span className="text-white"> | </span>
                  <a href="/forgot-password" className="text-white">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
