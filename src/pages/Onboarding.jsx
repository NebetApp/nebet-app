import { useState } from 'react'
import { saveProfile } from '../services/storage.js'
import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    gender: '',
    age: '',
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
    if (!form.name || !form.gender || !form.age) {
      setError('Please complete name, gender, and age.')
      return
    }
    setSaving(true)
    try {
      await saveProfile({
        name: form.name.trim(),
        gender: form.gender,
        age: Number(form.age),
        medicalHistory: form.medicalHistory.trim(),
        medications: form.medications.trim(),
        updatedAt: new Date().toISOString()
      })
      navigate('/')
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

        <label className="field">
          <span>Gender</span>
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="" disabled>Select...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="field">
          <span>Age</span>
          <input
            name="age"
            type="number"
            min="0"
            max="150"
            inputMode="numeric"
            placeholder="Your age"
            value={form.age}
            onChange={handleChange}
            required
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
