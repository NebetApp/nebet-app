import { Link } from 'react-router-dom'
import ConnectButton from './ConnectButton.jsx'

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <Link to="/" className="brand-link">
            <img src="/nebetlogo.png" alt="Nebet Logo" className="logo" />
          </Link>
        </div>
        <div className="header-actions">
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
