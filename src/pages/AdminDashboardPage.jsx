import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './AdminDashboardPage.css';

const recentEmails = [
  { date: '08 Aug 2026', sender: 'security@paypal-login.xyz', status: 'phishing', risk: 96 },
  { date: '08 Aug 2026', sender: 'support@gmail.com',         status: 'safe',     risk: 8 },
  { date: '07 Aug 2026', sender: 'admin@amazon.in',           status: 'warning',  risk: 48 },
  { date: '07 Aug 2026', sender: 'bank@canarabank.com',       status: 'safe',     risk: 5 },
];

const phishingAlerts = [
  { email: 'security-update@paypal-login.xyz', risk: 98 },
  { email: 'verify-account@bank-secure.net',   risk: 95 },
  { email: 'amazon-support@amazon-login.xyz',  risk: 82 },
  { email: 'office365@secure-login.info',      risk: 90 },
];

const quarantine = [
  { id: 'Q001', sender: 'support@paypal-login.xyz',     reason: 'DMARC Failed',   status: 'quarantined' },
  { id: 'Q002', sender: 'security@microsoft-login.xyz', reason: 'SPF Failed',     status: 'pending' },
  { id: 'Q003', sender: 'bank@secure-bank.info',        reason: 'High Risk Score', status: 'quarantined' },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const statusBadge = (status, risk) => {
    if (status === 'phishing') return <span className="badge badge-danger">Phishing</span>;
    if (status === 'safe')     return <span className="badge badge-safe">Safe</span>;
    return <span className="badge badge-warning">Medium</span>;
  };

  return (
    <Sidebar>
      <div className="page-header">
        <h1>Organization Dashboard</h1>
        <p>Monitor and manage organization-wide email security.</p>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        <div className="stat-card animate-in">
          <div className="stat-icon blue"><i className="fas fa-envelope"></i></div>
          <div className="stat-info"><h3>1,250</h3><p>Total Emails</p></div>
        </div>
        <div className="stat-card animate-in" style={{animationDelay:'0.05s'}}>
          <div className="stat-icon green"><i className="fas fa-check-circle"></i></div>
          <div className="stat-info"><h3>1,085</h3><p>Safe Emails</p></div>
        </div>
        <div className="stat-card animate-in" style={{animationDelay:'0.1s'}}>
          <div className="stat-icon red"><i className="fas fa-shield-virus"></i></div>
          <div className="stat-info"><h3>165</h3><p>Phishing Detected</p></div>
        </div>
        <div className="stat-card animate-in" style={{animationDelay:'0.15s'}}>
          <div className="stat-icon yellow"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="stat-info"><h3>21</h3><p>Today's Alerts</p></div>
        </div>
      </div>

      <div className="admin-grid">
        {/* Recent Analysis */}
        <div className="card animate-in">
          <div className="card-header">
            <h3>Recent Email Analysis</h3>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/history')}>
              View All
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Date</th><th>Sender</th><th>Status</th><th>Risk</th></tr>
              </thead>
              <tbody>
                {recentEmails.map((r, i) => (
                  <tr key={i}>
                    <td style={{color:'var(--text-muted)',fontSize:'0.83rem'}}>{r.date}</td>
                    <td><span className="mono-sm">{r.sender}</span></td>
                    <td>{statusBadge(r.status)}</td>
                    <td style={{fontWeight:700, color: r.risk >= 70 ? 'var(--danger)' : r.risk >= 40 ? 'var(--warning)' : 'var(--success)'}}>
                      {r.risk}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Summary */}
        <div className="card animate-in" style={{animationDelay:'0.1s'}}>
          <div className="card-header"><h3>Security Summary</h3></div>
          <div className="card-body">
            <div className="progress-group">
              <div className="prog-row">
                <span>Total Emails</span>
                <strong>1,250</strong>
              </div>
              <div className="prog-bar-wrap">
                <div className="prog-bar" style={{width:'100%', background:'var(--primary)'}}></div>
              </div>

              <div className="prog-row">
                <span>Safe Emails</span>
                <strong style={{color:'var(--success)'}}>1,085</strong>
              </div>
              <div className="prog-bar-wrap">
                <div className="prog-bar" style={{width:'87%', background:'var(--success)'}}></div>
              </div>

              <div className="prog-row">
                <span>Phishing Emails</span>
                <strong style={{color:'var(--danger)'}}>165</strong>
              </div>
              <div className="prog-bar-wrap">
                <div className="prog-bar" style={{width:'13%', background:'var(--danger)'}}></div>
              </div>

              <div className="prog-row">
                <span>Detection Accuracy</span>
                <strong style={{color:'var(--primary)'}}>96%</strong>
              </div>
              <div className="prog-bar-wrap">
                <div className="prog-bar" style={{width:'96%', background:'#6366f1'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts + Quarantine */}
      <div className="admin-grid-2 animate-in" style={{animationDelay:'0.2s'}}>
        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-exclamation-triangle" style={{color:'var(--danger)', marginRight:8}}></i>Recent Phishing Alerts</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Email</th><th>Risk</th></tr>
              </thead>
              <tbody>
                {phishingAlerts.map((a, i) => (
                  <tr key={i}>
                    <td><span className="mono-sm">{a.email}</span></td>
                    <td>
                      <span className={`badge ${a.risk >= 90 ? 'badge-danger' : 'badge-warning'}`}>
                        {a.risk}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-lock" style={{color:'var(--text-muted)', marginRight:8}}></i>Quarantine</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>ID</th><th>Sender</th><th>Reason</th><th>Action</th></tr>
              </thead>
              <tbody>
                {quarantine.map((q, i) => (
                  <tr key={i}>
                    <td><strong>{q.id}</strong></td>
                    <td><span className="mono-sm">{q.sender}</span></td>
                    <td style={{color:'var(--text-muted)',fontSize:'0.82rem'}}>{q.reason}</td>
                    <td>
                      <div style={{display:'flex', gap:4}}>
                        <button className="btn btn-success btn-sm">Release</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{textAlign:'center', marginTop:24}}>
        <button className="btn btn-primary" onClick={() => navigate('/reports')}>
          <i className="fas fa-chart-bar"></i> Generate Reports
        </button>
      </div>
    </Sidebar>
  );
}