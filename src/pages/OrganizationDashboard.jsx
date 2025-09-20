import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getAllPatients } from '../services/storage.js'

export default function OrganizationDashboard() {
  const location = useLocation()
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [donationAmount, setDonationAmount] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPatients = () => {
      try {
        // Check if patient data was passed from Donations page
        const passedPatient = location.state?.patient
        
        if (passedPatient) {
          // Use the passed patient data
          const patientWithVerification = {
            ...passedPatient,
            name: passedPatient.fullName, // Map fullName to name for consistency
            treatmentCost: passedPatient.treatmentCost,
            currentFunding: passedPatient.currentFunding,
            verified: true, // Patients from donations list are verified
            gender: 'Not specified',
            medicalHistory: passedPatient.catastrophicDisease,
            medications: passedPatient.treatmentNeeded,
            dateOfBirth: new Date(1990, 0, 1).toISOString() // Default date
          }
          setSelectedPatient(patientWithVerification)
          setPatients([patientWithVerification])
        } else {
          // Load all patients if no specific patient was passed
          const allPatients = getAllPatients()
          const patientsWithVerification = allPatients.map(patient => ({
            ...patient,
            treatmentCost: patient.treatmentCost || 10000,
            currentFunding: patient.currentFunding || Math.floor(Math.random() * 5000),
            verified: Math.random() > 0.3 // Simulate verification
          }))
          setPatients(patientsWithVerification)
        }
      } catch (error) {
        console.error('Error loading patients:', error)
      } finally {
        setLoading(false)
      }
    }

    // Simulate loading time
    setTimeout(loadPatients, 1000)
  }, [location.state])

  const handleDonate = (patientId) => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    
    // Wallet connection and transfer logic would go here
    alert(`Processing donation of ${donationAmount} USDC to patient ${patientId}...`)
    
    // Reset donation amount after processing
    setDonationAmount('')
    
    // Stay on the same page - do not navigate
    // Explicitly prevent any navigation
    return false
  }

  const getProgressPercentage = (current, goal) => {
    return goal > 0 ? (current / goal) * 100 : 0
  }

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="dashboard-loading">
            <div className="loading-spinner">Loading patients...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="container">
        <div className="organization-dashboard">

          {patients.length === 0 ? (
            <div className="no-patients">
              <h2>No Patients Available</h2>
              <p>No patients needing funding were found at this time.</p>
              <Link to="/" className="btn-primary">Back to Home</Link>
            </div>
          ) : (
            <div className="patients-grid">
              {patients.map((patient) => (
                <div key={patient.id} className="patient-card">
                  <div className="patient-header">
                    <div className="patient-info">
                      <h3>{patient.name}</h3>
                      <div className="patient-meta">
                        <span className={`verification-status ${patient.verified ? 'verified' : 'pending'}`}>
                          {patient.verified ? '✓ Verified' : '⏳ Pending'}
                        </span>
                        <span className="patient-age">
                          {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="patient-details">
                    <div className="detail-row">
                      <span className="label">Gender:</span>
                      <span className="value">{patient.gender}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Medical History:</span>
                      <span className="value">{patient.medicalHistory || 'Not specified'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Medications:</span>
                      <span className="value">{patient.medications || 'Not specified'}</span>
                    </div>
                  </div>

                  <div className="funding-section">
                    <h4>Funding Required</h4>
                    <div className="funding-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${getProgressPercentage(patient.currentFunding, patient.treatmentCost)}%` }}
                        ></div>
                      </div>
                      <div className="funding-amounts">
                        <div className="current-amount">
                          <strong>${patient.currentFunding.toLocaleString()}</strong>
                          <span>Raised</span>
                        </div>
                        <div className="goal-amount">
                          <strong>${patient.treatmentCost.toLocaleString()}</strong>
                          <span>Goal</span>
                        </div>
                      </div>
                      <div className="progress-percentage">
                        {getProgressPercentage(patient.currentFunding, patient.treatmentCost).toFixed(1)}%
                      </div>
                    </div>

                    <div className="donation-form">
                      <div className="donation-input">
                        <input
                          type="number"
                          placeholder="Amount in USDC"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          min="1"
                          step="1"
                        />
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDonate(patient.id)
                        }}
                        className="btn-primary btn-donate"
                        disabled={!patient.verified}
                        type="button"
                      >
                        {patient.verified ? 'Donate USDC' : 'Patient not verified'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
