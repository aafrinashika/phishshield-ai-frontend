import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'individual'
  });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async e => {
  e.preventDefault();

  // Check passwords
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Check password length
  if (form.password.length < 8) {
    alert('Password must be at least 8 characters');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful!');
      navigate('/login');
    } else {
      alert(data.message || 'Registration failed');
    }

  } catch (error) {
    console.error('Registration error:', error);
    alert('Cannot connect to backend. Make sure Flask is running.');

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">🛡️ PhishShield AI</div>
        <h2>Join PhishShield AI</h2>
        <p>Set up your account in under a minute</p>
        <div className="auth-features">
          <div className="af-item"><i className="fas fa-check-circle"></i> Free to start</div>
          <div className="af-item"><i className="fas fa-check-circle"></i> No credit card required</div>
          <div className="af-item"><i className="fas fa-check-circle"></i> Instant access</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card animate-in">
          <div className="auth-card-header">
            <h1>Create Account</h1>
            <p>Start protecting your inbox today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field-group">
              <label>Full Name</label>
              <div className="field-input-wrap">
                <i className="fas fa-user field-icon"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label>Email Address</label>
              <div className="field-input-wrap">
                <i className="fas fa-envelope field-icon"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label>Password</label>
                <div className="field-input-wrap">
                  <i className="fas fa-lock field-icon"></i>
                  <input
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                    <i className={`fas fa-eye${showPw ? '-slash' : ''}`}></i>
                  </button>
                </div>
              </div>

              <div className="field-group">
                <label>Confirm Password</label>
                <div className="field-input-wrap">
                  <i className="fas fa-lock field-icon"></i>
                  <input
                    type={showPw ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="field-group">
              <label>Account Type</label>
              <div className="field-input-wrap">
                <i className="fas fa-user-shield field-icon"></i>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="individual">Individual User</option>
                  <option value="admin">Organization Admin</option>
                </select>
              </div>
            </div>

            <button type="submit" className={`auth-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? (
                <><i className="fas fa-spinner fa-spin"></i> Creating account...</>
              ) : (
                <><i className="fas fa-user-plus"></i> Create Account</>
              )}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}