import { useState } from 'react'
import { savePatientProfile } from '../services/storage.js'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    medicalHistory: '',
    medications: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.gender || !form.dateOfBirth) {
      setError('Please complete name, gender, and date of birth.')
      return
    }
    setSaving(true)
    try {
      await savePatientProfile({
        name: form.name.trim(),
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        medicalHistory: form.medicalHistory.trim(),
        medications: form.medications.trim(),
        treatmentCost: 10000, // Default treatment cost
        currentFunding: 4500 // Default initial funding
      })
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="onboarding">
      <h1 className="title">Create your health profile</h1>
      <p className="subtitle">Empowering health with trust and technology</p>
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Name</span>
          <input
            name="name"
            type="text"
            inputMode="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <div className="field">
          <span>Gender</span>
          <div className="gender-chips">
            {['Female', 'Male', 'Prefer not to say', 'Other'].map(option => (
              <button
                key={option}
                type="button"
                className={`chip ${form.gender === option.toLowerCase() ? 'selected' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, gender: option.toLowerCase() }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <label className="field">
          <span>Date of Birth</span>
          <input
            name="dateOfBirth"
            type="date"
            placeholder="YYYY-MM-DD"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
            className="date-input"
          />
        </label>

        <label className="field">
          <span>Medical history</span>
          <textarea
            name="medicalHistory"
            rows="4"
            placeholder="E.g. allergies, conditions, surgeries"
            value={form.medicalHistory}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          <span>Medications</span>
          <textarea
            name="medications"
            rows="3"
            placeholder="E.g. current prescriptions"
            value={form.medications}
            onChange={handleChange}
          />
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </section>
  )
}
