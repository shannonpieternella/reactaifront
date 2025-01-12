import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="background">
      <div className="container login">
        <h1 className="title">Welcome Back!</h1>
        <div className="separator"></div>
        <p className="subtitle">Log in to continue enjoying our services.</p>
        <form className="form">
          <input
            type="email"
            className="input"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            required
          />
          <div className="options">
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="link">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="button shadowed-button">
            Login
          </button>
        </form>
        <p className="footer-text">
          Don’t have an account?{" "}
          <a href="#" className="link">
            Sign Up Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
