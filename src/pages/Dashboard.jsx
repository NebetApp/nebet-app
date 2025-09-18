import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../services/storage.js'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        const savedProfile = getProfile()
        setProfile(savedProfile)
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  function formatDate(dateString) {
    if (!dateString) return 'Not provided'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return null
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Loading your health passport...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="dashboard-error">
        <h2>No Profile Found</h2>
        <p>Please complete your health profile first.</p>
        <Link to="/onboarding" className="btn-primary">Complete Profile</Link>
      </div>
    )
  }

  const age = calculateAge(profile.dateOfBirth)

  return (
    <div className="dashboard">
      <div className="passport-container">
        <div className="passport-header">
          <div className="passport-title">
            <h1>Health Passport</h1>
            <div className="passport-subtitle">Nebet Health Profile</div>
          </div>
          <div className="passport-logo">
            <div className="logo-placeholder">N</div>
          </div>
        </div>

        <div className="passport-body">
          <div className="passport-photo">
            <div className="photo-placeholder">
              <div className="avatar-icon">👤</div>
            </div>
          </div>

          <div className="passport-info">
            <div className="info-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <div className="info-value">{profile.name || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <label>Gender</label>
                  <div className="info-value">{profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <label>Date of Birth</label>
                  <div className="info-value">{formatDate(profile.dateOfBirth)}</div>
                </div>
                {age && (
                  <div className="info-item">
                    <label>Age</label>
                    <div className="info-value">{age} years</div>
                  </div>
                )}
              </div>
            </div>

            <div className="info-section">
              <h3>Health Information</h3>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Medical History</label>
                  <div className="info-value">{profile.medicalHistory || 'No medical history provided'}</div>
                </div>
                <div className="info-item full-width">
                  <label>Current Medications</label>
                  <div className="info-value">{profile.medications || 'No medications provided'}</div>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Passport Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Profile Created</label>
                  <div className="info-value">{formatDate(profile.updatedAt)}</div>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <div className="info-value status-active">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="passport-footer">
          <div className="passport-id">
            <span className="id-label">ID:</span>
            <span className="id-value">NEB-{Date.now().toString(36).toUpperCase()}</span>
          </div>
          <div className="passport-actions">
            <Link to="/onboarding" className="btn-secondary">Edit Profile</Link>
            <button className="btn-primary" onClick={() => window.print()}>Print Passport</button>
          </div>
        </div>
      </div>
    </div>
  )
}
