import { Link, useLocation } from 'react-router-dom'
import ConnectButton from './ConnectButton.jsx'
import { useState, useEffect } from 'react'

export default function Header() {
  const location = useLocation()
  const [userRole, setUserRole] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    // Get user role from localStorage
    const getCurrentRole = () => {
      try {
        return localStorage.getItem('nebet.current_role')
      } catch {
        return null
      }
    }
    
    const role = getCurrentRole()
    setUserRole(role)
  }, [])

  // Don't show navigation menu on landing page
  const showNavigation = location.pathname !== '/' && userRole

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <Link to="/" className="brand-link">
            <img src="/nebetlogo.png" alt="Nebet Logo" className="logo" />
          </Link>
        </div>
        
        {showNavigation && (
          <nav className="header-nav">
            {userRole === 'patient' && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Passport
                </Link>
                <Link 
                  to="/funding" 
                  className={`nav-link ${location.pathname === '/funding' ? 'active' : ''}`}
                >
                  Funding
                </Link>
              </>
            )}
            
            {userRole === 'organization' && (
              <Link 
                to="/donations" 
                className={`nav-link ${location.pathname === '/donations' ? 'active' : ''}`}
              >
                Donations
              </Link>
            )}
          </nav>
        )}
        
        <div className="header-actions">
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
