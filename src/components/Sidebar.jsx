import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { icon: 'fa-home',      label: 'Dashboard',     path: '/dashboard' },
  { icon: 'fa-upload',    label: 'Analyze Email', path: '/upload' },
  { icon: 'fa-history',   label: 'History',       path: '/history' },
  { icon: 'fa-chart-bar', label: 'Reports',       path: '/reports' },
  { icon: 'fa-building',  label: 'Org Dashboard', path: '/admin' },
];

export default function Sidebar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          <span className="s-icon">🛡️</span>
          {!collapsed && (
            <span className="s-name">PhishShield <b>AI</b></span>
          )}
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            <i className={`fas fa-chevron-${collapsed ? 'right' : 'left'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`s-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <i className={`fas ${item.icon} s-link-icon`}></i>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="s-link logout-btn" onClick={() => navigate('/login')}>
            <i className="fas fa-sign-out-alt s-link-icon"></i>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}