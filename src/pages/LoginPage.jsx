import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'individual' });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async e => {
  e.preventDefault();

  setLoading(true);

  try {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    });

    const data = await response.json();

    if (response.ok) {

      // Store logged-in user information
      localStorage.setItem(
        'phishshield_user',
        JSON.stringify(data.user)
      );

      alert('Login successful!');

      // Redirect based on actual database role
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } else {

      alert(data.message || 'Login failed');

    }

  } catch (error) {

    console.error('Login error:', error);

    alert(
      'Cannot connect to backend. Make sure Flask is running.'
    );

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">🛡️ PhishShield AI</div>
        <h2>Welcome back</h2>
        <p>Protecting your inbox with AI-powered precision</p>
        <div className="auth-features">
          <div className="af-item"><i className="fas fa-check-circle"></i> ML-powered detection</div>
          <div className="af-item"><i className="fas fa-check-circle"></i> SPF / DKIM / DMARC checks</div>
          <div className="af-item"><i className="fas fa-check-circle"></i> Real-time hop visualization</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card animate-in">
          <div className="auth-card-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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

            <div className="field-group">
              <label>Password</label>
              <div className="field-input-wrap">
                <i className="fas fa-lock field-icon"></i>
                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
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
              <label>Login As</label>
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
                <><i className="fas fa-spinner fa-spin"></i> Signing in...</>
              ) : (
                <><i className="fas fa-sign-in-alt"></i> Sign In</>
              )}
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}