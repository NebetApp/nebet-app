import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Funding() {
  const location = useLocation()
  const [patientData, setPatientData] = useState(null)
  const [fundingGoal, setFundingGoal] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [urgencyLevel, setUrgencyLevel] = useState('medium')
  const [treatmentDescription, setTreatmentDescription] = useState('')
  const [currentAmount, setCurrentAmount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fundingRequested, setFundingRequested] = useState(false)

  useEffect(() => {
    // First check if patient data is passed via navigation state
    if (location.state?.patient) {
      const patient = location.state.patient
      setPatientData(patient)
      setFundingGoal(patient.treatmentCost?.toString() || '')
      setCurrentAmount(patient.currentFunding || 0)
      // Only set fundingRequested if the patient has explicitly requested funding
      setFundingRequested(patient.fundingRequested || false)
      return
    }
    
    // If no patient in state, try to get from local storage
    const loadPatientData = async () => {
      try {
        const { getPatientProfile } = await import('../services/storage.js')
        const patientData = getPatientProfile()
        if (patientData) {
          setPatientData(patientData)
          setFundingGoal(patientData.treatmentCost?.toString() || '')
          setCurrentAmount(patientData.currentFunding || 0)
          // Only set fundingRequested if the patient has explicitly requested funding
          setFundingRequested(patientData.fundingRequested || false)
        }
      } catch (error) {
        console.error('Error loading patient data:', error)
      }
    }
    loadPatientData()
  }, [location.state])

  const handleRequestFunding = async () => {
    if (!fundingGoal || !targetDate) {
      alert('Please enter the funding amount and target date')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate smart contract connection with 5 second timeout
      alert('Creating funding request on blockchain... Please wait.')
      await new Promise(resolve => setTimeout(resolve, 5000))
      
      // Update patient profile with funding request
      const { updatePatientProfile } = await import('../services/storage.js')
      const updatedProfile = {
        ...patientData,
        treatmentCost: parseFloat(fundingGoal),
        currentFunding: currentAmount,
        fundingTargetDate: targetDate,
        fundingUrgency: urgencyLevel,
        treatmentDescription: treatmentDescription,
        fundingRequested: true,
        fundingRequestDate: new Date().toISOString()
      }
      
      const savedProfile = await updatePatientProfile(updatedProfile)
      setPatientData(savedProfile)
      setFundingRequested(true)
      
      alert('Funding request created successfully! Your request is now visible to donors.')
    } catch (error) {
      console.error('Error creating funding request:', error)
      alert('Error creating funding request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercentage = fundingGoal > 0 ? (currentAmount / parseFloat(fundingGoal)) * 100 : 0

  if (!patientData) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h2>Information Not Found</h2>
          <p>Please complete onboarding first</p>
          <Link to="/onboarding" className="btn-primary">Complete Onboarding</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="passport-container">
        <div className="funding-content">
          <div className="funding-main-container">
            {/* Medical Information (Read-only from onboarding) */}
            <div className="info-section">
            <h3>Medical Information</h3>
            <div className="info-item">
              <label>Disease</label>
              <div className="info-value">{patientData?.medicalHistory || 'Not specified'}</div>
            </div>
            <div className="info-item">
              <label>Required Treatment</label>
              <div className="info-value">{patientData?.medications || 'Not specified'}</div>
            </div>
          </div>

          {!fundingRequested ? (
            /* Funding Request Form */
            <div className="info-section">
              <h3>Request Funding for Your Treatment</h3>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                Fill out this form to request financial support for your medical treatment.
                Your information will be reviewed and made available to potential donors.
              </p>
              
              <div>
                <div className="field">
                  <label>Funding Amount Required (USD)*</label>
                  <input
                    type="number"
                    value={fundingGoal}
                    onChange={(e) => setFundingGoal(e.target.value)}
                    placeholder="Enter amount needed"
                    min="100"
                    step="100"
                    required
                  />
                </div>
                
                <div className="field">
                  <label>Target Date for Treatment*</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="field">
                  <label>Urgency Level</label>
                  <select
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value)}
                  >
                    <option value="low">Low - Can wait several months</option>
                    <option value="medium">Medium - Treatment needed within 1-3 months</option>
                    <option value="high">High - Urgent treatment needed</option>
                    <option value="critical">Critical - Life-threatening, immediate attention needed</option>
                  </select>
                </div>
                
                <div className="field">
                  <label>Treatment Description (Optional)</label>
                  <textarea
                    value={treatmentDescription}
                    onChange={(e) => setTreatmentDescription(e.target.value)}
                    placeholder="Please describe your treatment in detail..."
                    rows="3"
                  ></textarea>
                </div>
                
                <button
                  onClick={handleRequestFunding}
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  {isSubmitting ? 'Creating Request...' : 'Request Funding'}
                </button>
              </div>
            </div>
          ) : (
              /* Funding Status Display */
              <div>
                <div className="funding-status-container">
                  <div className="info-section">
                    <h3>Funding Status</h3>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="progress-text">
                        ${currentAmount.toLocaleString()} of ${parseFloat(fundingGoal).toLocaleString()} USD ({Math.round(progressPercentage)}%)
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <label>Target Date</label>
                      <div className="info-value">
                        {patientData.fundingTargetDate ? new Date(patientData.fundingTargetDate).toLocaleDateString() : 'Not set'}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <label>Urgency Level</label>
                      <div className="info-value">
                        {patientData.fundingUrgency ? patientData.fundingUrgency.charAt(0).toUpperCase() + patientData.fundingUrgency.slice(1) : 'Medium'}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <label>Treatment Description</label>
                      <div className="info-value">
                        {patientData.treatmentDescription || 'No description provided'}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <label>Request Date</label>
                      <div className="info-value">
                        {patientData.fundingRequestDate ? new Date(patientData.fundingRequestDate).toLocaleDateString() : 'Not set'}
                      </div>
                    </div>
                    
                    <div className="info-item">
                      <label>Days Remaining</label>
                      <div className="info-value">
                        {patientData.fundingTargetDate ? Math.max(0, Math.ceil((new Date(patientData.fundingTargetDate) - new Date()) / (1000 * 60 * 60 * 24))) : 'Not set'} days
                      </div>
                    </div>
                  </div>
                
                  <div className="info-section">
                    <h3>Share Your Funding Request</h3>
                    <p style={{ marginBottom: '1rem', color: '#666' }}>
                      Share your funding request with potential donors through social media or direct links.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button className="btn-secondary" style={{ flex: 1 }}>
                        Share on Twitter
                      </button>
                      <button className="btn-secondary" style={{ flex: 1 }}>
                        Share on Facebook
                      </button>
                      <button className="btn-secondary" style={{ flex: 1 }}>
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}  
          </div>
        </div>
      </div>
    </div>
  )
}
