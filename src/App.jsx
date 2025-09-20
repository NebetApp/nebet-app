import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Funding from './pages/Funding.jsx'
import OrganizationDashboard from './pages/OrganizationDashboard.jsx'
import Donations from './pages/Donations.jsx'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
          <Route path="/donations" element={<Donations />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 16 }}>
                <h2>Page not found</h2>
                <Link to="/">Go Home</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} Nebet</footer>
    </div>
  )
}

export default App
