/* AccountView.jsx — the sign-in page.
   Props: setView (used to reach the Create Account page).

   Validated in JavaScript on submit, not by the browser:
     login     required
     password  required, and at least 8 characters

   One handler serves both inputs because each carries a `name` matching its key in
   `values`. validate() returns an object of problems; an empty object means the form
   is good. Every error prints directly under the field it belongs to.

   noValidate on the <form> is load-bearing: without it the browser runs its own
   checks first and pops its own bubble, and these messages never get a chance to
   appear. */

import { useState } from 'react'

function AccountView({ setView }) {
  const [values, setValues] = useState({ login: '', password: '' })
  const [errors, setErrors] = useState({})
  const [signedInAs, setSignedInAs] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function validate() {
    const found = {}

    if (!values.login.trim()) found.login = 'Login is required.'

    if (!values.password) {
      found.password = 'Password is required.'
    } else if (values.password.length < 8) {
      found.password = 'Password must be at least 8 characters.'
    }

    return found
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate()
    setErrors(found)

    // Object.keys().length === 0 means nothing went wrong.
    if (Object.keys(found).length === 0) {
      setSignedInAs(values.login)
      setValues({ login: '', password: '' })
    }
  }

  return (
    <section className="bk-section">
      <div className="container">
        <div className="bk-form-card">
          <h2 className="bk-section-title">Sign in</h2>
          <p className="bk-section-sub">Welcome back to Bay Kicks.</p>

          {signedInAs && <p className="bk-success">Signed in as {signedInAs}.</p>}

          <form onSubmit={handleSubmit} noValidate>
            <label className="form-label" htmlFor="ac-login">Login</label>
            <input
              id="ac-login"
              name="login"
              className="form-control"
              value={values.login}
              onChange={handleChange}
            />
            {errors.login && <p className="bk-error">{errors.login}</p>}

            <label className="form-label mt-3" htmlFor="ac-password">Password</label>
            <input
              id="ac-password"
              name="password"
              type="password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="bk-error">{errors.password}</p>}

            <button type="submit" className="btn btn-bk w-100 mt-3">
              Sign in
            </button>
          </form>

          <p className="bk-form-alt">
            No account yet?{' '}
            <button className="bk-link" onClick={() => setView('createAccount')}>
              Create one
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AccountView
