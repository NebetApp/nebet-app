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
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Nebet</h1>
            <p className="hero-subtitle">Empowering health with trust and technology</p>
            <p className="hero-description">
              A decentralized platform connecting patients in need with compassionate donors, 
              ensuring transparency and security in medical funding.
            </p>
            <div className="hero-cta">
              <button onClick={handlePatientLogin} className="btn-primary btn-hero btn-patient">
                <img src="/undraw_verified_m721.png" alt="Medical Care" className="btn-image" />
                I Need Medical Funding
              </button>
              <button onClick={handleOrganizationLogin} className="btn-primary btn-hero btn-organization">
                <img src="/undraw_instant-support_oav0.png" alt="Help Support" className="btn-image" />
                I Want to Help
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">
              <div className="hero-icon">
                <img src="/nebetlogo.png" alt="Nebet Logo" className="hero-logo" />
              </div>
              <div className="hero-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>Why Choose Nebet?</h2>
          <p>Transforming medical funding through blockchain technology</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><img src="/undraw_security-on_3ykb.png" alt="Lock" /></div>
            <h3>Secure & Transparent</h3>
            <p>Blockchain-powered transactions ensure complete transparency and security for all donations.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon"><img src="/undraw_verified_m721.png" alt="Verified" /></div>
            <h3>Verified Patients</h3>
            <p>Every patient is thoroughly verified to ensure legitimate medical needs and proper fund usage.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon"><img src="/undraw_instant-support_oav0.png" alt="Lightning" /></div>
            <h3>Instant Access</h3>
            <p>Quick and easy access to medical funding when you need it most, without bureaucratic delays.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon"><img src="/undraw_world_bdnk.png" alt="Global Community" /></div>
            <h3>Global Community</h3>
            <p>Connect with donors worldwide who are ready to support your medical journey.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon"><img src="/undraw_real-time-analytics_50za.png" alt="Tracking" /></div>
            <h3>Real-time Tracking</h3>
            <p>Track funding progress and see exactly how your donations are making a difference.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon"><img src="/undraw_discount_igfl.png" alt="Low Fees" /></div>
            <h3>Low Fees</h3>
            <p>Minimal transaction fees ensure maximum funds reach the patients who need them.</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust">
        <div className="trust-content">
          <h2>Built on Trust</h2>
          <p>Our platform combines cutting-edge technology with human compassion to create a reliable medical funding ecosystem.</p>
          <div className="trust-stats">
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Transparent</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat">
              <div className="stat-number">0</div>
              <div className="stat-label">Hidden Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of patients and donors already using Nebet to transform healthcare funding.</p>
          <div className="cta-buttons">
            <button onClick={handlePatientLogin} className="btn-primary btn-cta btn-patient">
              Get Started as Patient
            </button>
            <button onClick={handleOrganizationLogin} className="btn-primary btn-cta btn-organization">
              Become a Donor
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
