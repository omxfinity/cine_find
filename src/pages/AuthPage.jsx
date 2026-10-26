import { useState } from 'react'
import { Footer, Navbar } from '../components/Site.jsx'

export default function AuthPage({ navigate, mode }) {
  const registering = mode === 'register'
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  function update(event) {
    setValues({ ...values, [event.target.name]: event.target.value })
    setMessage('')
  }

  function submit(event) {
    event.preventDefault()
    if (registering && !values.name.trim()) return setMessage('Please enter your full name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return setMessage('Please enter a valid email address.')
    if (values.password.length < 8) return setMessage('Your password must be at least 8 characters.')
    if (registering && values.password !== values.confirmPassword) return setMessage('Your passwords do not match.')
    setSuccess(true)
  }

  return (
    <>
      <Navbar navigate={navigate} activePage={mode} />
      <main className="auth-page">
        <div className="auth-card">
          <button className="back-link" onClick={() => navigate('/')}>← Back to home</button>
          <div className="auth-heading">
            <span className="auth-icon">✳</span>
            <p className="eyebrow">{registering ? 'JOIN THE CLUB' : 'WELCOME BACK'}</p>
            <h1>{registering ? 'Create your account' : 'Sign in to CineFind'}</h1>
            <p>Your next great movie night starts here.</p>
          </div>
          {success ? (
            <div className="form-success" role="status">
              <span>✓</span>
              <h2>{registering ? 'You’re on the list!' : 'Demo sign-in complete'}</h2>
              <p>This is a demo. No account or password was saved.</p>
              <button className="button button-primary full-button" onClick={() => navigate(registering ? '/login' : '/')}>
                {registering ? 'Continue to login' : 'Explore movies'}
              </button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={submit} noValidate>
              {registering && <div className="auth-field"><label htmlFor="full-name">Full name</label><input id="full-name" name="name" value={values.name} onChange={update} /></div>}
              <div className="auth-field"><label htmlFor="email-address">Email address</label><input id="email-address" name="email" type="email" value={values.email} onChange={update} placeholder="you@example.com" /></div>
              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <span className="password-wrap">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={update} placeholder="At least 8 characters" />
                  <button className="show-password" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
                </span>
              </div>
              {registering && <div className="auth-field"><label htmlFor="confirm-password">Confirm password</label><input id="confirm-password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={values.confirmPassword} onChange={update} /></div>}
              {message && <p className="form-error" role="alert">{message}</p>}
              <button className="button button-primary full-button" type="submit">{registering ? 'Create account' : 'Login'} →</button>
              <p className="demo-notice">Demo only. Your details are not sent or saved.</p>
              <p className="auth-switch">
                {registering ? 'Already have an account?' : 'New to CineFind?'}
                <button type="button" onClick={() => navigate(registering ? '/login' : '/register')}>{registering ? 'Log in' : 'Create an account'}</button>
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer navigate={navigate} />
    </>
  )
}
