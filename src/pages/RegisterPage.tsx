import { useState } from "react";
import "../styles/register-page.scss";
import { API_URL } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";

const RegisterPage = () => {
  useAuthRedirect();

  // State for form fields and alerts
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate form fields
    const errors: any = {};
    if (!user.firstName) errors.firstName = "First name is required";
    if (!user.lastName) errors.lastName = "Last name is required";
    if (!user.email) errors.email = "Email is required";
    if (!user.password) errors.password = "Password is required";
    if (!user.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!user.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    setErrors(errors);

    // If there are errors, stop processing
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError("");

    // If no errors, submit the form
    fetch(API_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        window.scrollTo({top:0,behavior:"smooth"});
        if (data.success) {
       
          setSuccess(true);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to register");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="register-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://pbs.twimg.com/profile_images/1788231088302653440/5xKfAdI8_200x200.jpg"
              width="50"
              height="50"
              alt="rpl"
            />
            RWANDA PREMIER LEAGUE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="registration-card">
              <div className="card-header">
                <h2 className="text-center m-0">
                  <i className="fas fa-user-plus me-2"></i>
                  Join Rwanda Premier League
                </h2>
              </div>

              <div className="card-body">
                {/* Success Alert */}
                {success && (
                  <div className="alert alert-info">
                    <i className="fas fa-check-circle me-2"></i>
                    You have successfully registered to Rwanda Premier League!
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}{" "}
                  </div>
                )}

                <form method="post" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label className="form-label">
                        <i className="fas fa-user me-2"></i>First Name
                      </label>
                      <input
                        className="form-control"
                        name="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={user.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <p className="text-danger">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="col-md-6 form-group">
                      <label className="form-label">
                        <i className="fas fa-user me-2"></i>Last Name
                      </label>
                      <input
                        className="form-control"
                        name="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={user.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <p className="text-danger">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={user.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={user.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-phone me-2"></i>Phone Number
                    </label>
                    <input
                      className="form-control"
                      name="phoneNumber"
                      type="text"
                      placeholder="Enter phone number"
                      value={user.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                      <p className="text-danger">{errors.phoneNumber}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-calendar me-2"></i>Date of Birth
                    </label>
                    <input
                      className="form-control"
                      name="dateOfBirth"
                      type="date"
                      value={user.dateOfBirth}
                      onChange={handleChange}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-danger">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary w-100 mb-3"
                      type="submit"
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      {loading ? "Registering..." : "Register Now"}
                    </button>
                    <p className="mb-0">
                      Already have an account?{" "}
                      <a className="login-link" href="/login">
                        <i className="fas fa-sign-in-alt me-1"></i>Login here
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
