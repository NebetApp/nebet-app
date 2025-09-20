import { Link, useNavigate } from 'react-router-dom'
import ConnectButton from '../components/ConnectButton.jsx'
import { saveOrganizationProfile, setCurrentRole, getPatientProfile } from '../services/storage.js'

export default function Home() {
  const navigate = useNavigate()

  const handleOrganizationLogin = async () => {
    try {
      // Set the current role to organization
      setCurrentRole('organization')
      
      // Create a basic organization profile
      await saveOrganizationProfile({
        name: 'Organization',
        type: 'organization',
        description: 'Company or foundation that donates to patients'
      })
      navigate('/donations')
    } catch (error) {
      console.error('Error creating organization profile:', error)
      alert('Error logging in as organization')
    }
  }

  const handlePatientLogin = () => {
    try {
      // Set the current role to patient
      setCurrentRole('patient')
      
      // Check if patient profile already exists
      const existingProfile = getPatientProfile()
      if (existingProfile) {
        // If profile exists, go directly to dashboard
        navigate('/dashboard')
      } else {
        // If no profile exists, go to onboarding
        navigate('/onboarding')
      }
    } catch (error) {
      console.error('Error checking patient profile:', error)
      // If there's an error, default to onboarding
      navigate('/onboarding')
    }
  }

  return (
    <section className="home">
      <h1 className="title">Nebet</h1>
      <p className="subtitle">Empowering health with trust and technology</p>
      
      <div className="role-selection">
        <h2>How would you like to enter?</h2>
        <p className="role-description">Choose your role to get started</p>
        
        <div className="role-buttons">
          <div className="role-card patient">
            <div className="role-icon">👤</div>
            <h3>Patient</h3>
            <p>Request funds for your medical treatment</p>
            <button onClick={handlePatientLogin} className="btn-primary btn-patient">Enter as Patient</button>
          </div>
          
          <div className="role-card organization">
            <div className="role-icon">🏢</div>
            <h3>Company / Foundation</h3>
            <p>Donate to verified and transparent patients</p>
            <button onClick={handleOrganizationLogin} className="btn-primary btn-organization">Enter as Organization</button>
          </div>
        </div>
      </div>
    </section>
  )
}
