import { Link } from 'react-router-dom'
import ConnectButton from './ConnectButton.jsx'

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <Link to="/" className="brand-link">
          <span className="brand-name">Nebet</span>
        </Link>
        <span className="brand-tagline">Empowering health with trust and technology</span>
      </div>
      <div className="header-actions">
        <ConnectButton />
      </div>
    </header>
  )
}
