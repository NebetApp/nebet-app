import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Donations() {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for patients list
    const mockPatients = [
      {
        id: 1,
        fullName: 'Maria Garcia',
        catastrophicDisease: 'Breast Cancer',
        treatmentNeeded: 'Chemotherapy',
        treatmentCost: 15000,
        currentFunding: 8500
      },
      {
        id: 2,
        fullName: 'John Smith',
        catastrophicDisease: 'Leukemia',
        treatmentNeeded: 'Bone Marrow Transplant',
        treatmentCost: 25000,
        currentFunding: 12000
      },
      {
        id: 3,
        fullName: 'Ana Rodriguez',
        catastrophicDisease: 'Heart Disease',
        treatmentNeeded: 'Open Heart Surgery',
        treatmentCost: 30000,
        currentFunding: 18500
      },
      {
        id: 4,
        fullName: 'Carlos Martinez',
        catastrophicDisease: 'Kidney Failure',
        treatmentNeeded: 'Dialysis Treatment',
        treatmentCost: 8000,
        currentFunding: 3200
      },
      {
        id: 5,
        fullName: 'Laura Johnson',
        catastrophicDisease: 'Lung Cancer',
        treatmentNeeded: 'Radiation Therapy',
        treatmentCost: 20000,
        currentFunding: 9500
      }
    ]

    setTimeout(() => {
      setPatients(mockPatients)
      setLoading(false)
    }, 500)
  }, [])

  const handleDonate = (patient) => {
    navigate('/organization-dashboard', { state: { patient } })
  }

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div className="loading-spinner">Loading patients...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Organization Dashboard</h1>
          <p className="dashboard-subtitle">Review and donate to verified patients</p>
        </div>
      </div>
      <div className="passport-container">
        {/* Simple Patients List */}
        <div className="patients-simple-list">
          {patients.map((patient) => {
            const progressPercentage = (patient.currentFunding / patient.treatmentCost) * 100
            
            return (
              <div key={patient.id} className="patient-list-item">
                <div className="patient-basic-info">
                  <div className="patient-name">
                    <h3>{patient.fullName}</h3>
                    <span className="verification-badge">✓ Verified</span>
                  </div>
                  <div className="patient-diagnosis">
                    <strong>{patient.catastrophicDisease}</strong> - {patient.treatmentNeeded}
                  </div>
                </div>
                
                <div className="patient-funding">
                  <div className="funding-quick-info">
                    <span className="amount-raised">${patient.currentFunding.toLocaleString()}</span>
                    <span className="amount-goal">/ ${patient.treatmentCost.toLocaleString()}</span>
                    <span className="progress-percent">{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="quick-progress-bar">
                    <div 
                      className="quick-progress-fill" 
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={() => handleDonate(patient)}
                    className="btn-donate-small"
                  >
                    Donate
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
