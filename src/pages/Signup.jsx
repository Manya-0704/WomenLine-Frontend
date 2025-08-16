import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api";

const Signup = () => {
  const [form, setForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "", 
    confirm: "" 
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const errors = [];
    if (password.length < minLength) errors.push(`At least ${minLength} characters`);
    if (!hasUpperCase) errors.push("At least one uppercase letter");
    if (!hasLowerCase) errors.push("At least one lowercase letter");
    if (!hasNumbers) errors.push("At least one number");
    if (!hasSpecialChar) errors.push("At least one special character");
    
    return errors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Validation
    if (!agree) {
      setError("You must agree to the terms and policies.");
      return;
    }
    
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    
    const passwordErrors = validatePassword(form.password);
    if (passwordErrors.length > 0) {
      setError(`Password requirements: ${passwordErrors.join(", ")}`);
      return;
    }
    
    setLoading(true);
    try {
      const response = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      });
      
      if (response.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, boxShadow: '0 6px 32px 0 rgba(123, 63, 63, 0.12)', padding: '2.5rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, color: '#7b3f3f' }}>WOMENLINE</h2>
        <h3 style={{ margin: '0.5rem 0 1.5rem 0', color: '#222', fontWeight: 600 }}>Create Your Account</h3>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <label htmlFor="firstName" style={{ textAlign: 'left' }}>First Name</label>
        <input 
          id="firstName" 
          type="text" 
          placeholder="Enter your first name" 
          value={form.firstName} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        <label htmlFor="lastName" style={{ textAlign: 'left' }}>Last Name</label>
        <input 
          id="lastName" 
          type="text" 
          placeholder="Enter your last name" 
          value={form.lastName} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        <label htmlFor="email" style={{ textAlign: 'left' }}>Email Address</label>
        <input 
          id="email" 
          type="email" 
          placeholder="Enter your email" 
          value={form.email} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        <label htmlFor="password" style={{ textAlign: 'left' }}>Password</label>
        <input 
          id="password" 
          type="password" 
          placeholder="Create a password" 
          value={form.password} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Password must contain: 8+ characters, uppercase, lowercase, number, special character
        </div>
        <label htmlFor="confirm" style={{ textAlign: 'left' }}>Confirm Password</label>
        <input 
          id="confirm" 
          type="password" 
          placeholder="Confirm your password" 
          value={form.confirm} 
          onChange={handleChange} 
          required 
          disabled={loading}
        />
        <div className="checkbox-row" style={{ justifyContent: 'flex-start', width: '100%' }}>
          <input 
            type="checkbox" 
            id="agree" 
            checked={agree} 
            onChange={e => setAgree(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="agree">
            I agree to the <a href="#" style={{ color: '#7b3f3f', textDecoration: 'underline' }}>terms and policies</a>
          </label>
        </div>
        <button 
          type="submit" 
          style={{ width: '100%', marginTop: 8 }} 
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && <div style={{ color: 'red', marginTop: 6, textAlign: 'left' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 6, textAlign: 'left' }}>Registration successful! Redirecting to login...</div>}
      </form>
      <div style={{ textAlign: 'center', fontSize: 14, marginTop: 18 }}>
        Already have an account? <Link to="/login" style={{ color: '#7b3f3f', fontWeight: 600 }}>Log in</Link>
      </div>
    </div>
  );
};

export default Signup; 