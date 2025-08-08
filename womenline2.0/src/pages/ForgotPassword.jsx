import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => (
  <div className="card" style={{ maxWidth: 400, boxShadow: '0 6px 32px 0 rgba(123, 63, 63, 0.12)' }}>
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <h2 style={{ margin: 0, color: '#7b3f3f' }}>WOMENLINE</h2>
      <h3 style={{ margin: '0.5rem 0 1.5rem 0', color: '#222', fontWeight: 600 }}>Reset Your Password</h3>
      <p style={{ color: '#7b3f3f', fontSize: 15, marginBottom: 18 }}>
        Enter your email address and we'll send you a link to reset your password.
      </p>
    </div>
    <form>
      <label htmlFor="reset-email">Email Address</label>
      <input id="reset-email" type="email" placeholder="Enter your email" required />
      <button type="submit" style={{ width: '100%', marginTop: 8 }}>Send Reset Link</button>
    </form>
    <div style={{ textAlign: 'center', fontSize: 14, marginTop: 18 }}>
      <Link to="/login" style={{ color: '#7b3f3f', fontWeight: 600 }}>Back to Log in</Link>
    </div>
  </div>
);

export default ForgotPassword; 