import { Link } from 'react-router-dom'
import ConnectButton from '../components/ConnectButton.jsx'

export default function Home() {
  return (
    <section className="home">
      <h1 className="title">Nebet</h1>
      <p className="subtitle">Empowering health with trust and technology</p>
      <div className="cta">
        <ConnectButton />
      </div>
      <div className="onboarding-cta">
        <p>New here? Complete your health profile to get started.</p>
        <Link to="/onboarding" className="btn-primary">Start Onboarding</Link>
      </div>
    </section>
  )
}
