import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  const items = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/records', label: 'Records', icon: '📄' },
    { to: '/share', label: 'Share', icon: '🔗' },
    { to: '/profile', label: 'Profile', icon: '👤' }
  ]
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map(i => (
        <NavLink key={i.to} to={i.to} className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <span className="icon" aria-hidden>{i.icon}</span>
          <span className="label">{i.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
