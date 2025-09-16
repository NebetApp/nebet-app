import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Onboarding from './pages/Onboarding.jsx'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
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
