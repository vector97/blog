import styles from './SignIn.module.scss'

import { errorHandler } from '../../helpers/errorHandler'
import { setExistingUser } from '../../store/thunks/authThunk'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function SignIn() {
  const dispatch = useDispatch()
  const userError = useSelector((state) => state.user.userError)
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || -1
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  })

  const onSubmit = (data) => {
    const existingUser = JSON.stringify({ user: data })
    dispatch(
      setExistingUser({
        existingUser,
        cb: () => navigate(from, { replace: true }),
      })
    )
  }

  return (
    <div className={styles.signIn__wrapper}>
      <form className={styles.signIn} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signIn__title__wrapper}>
          <h1 className={styles.signIn__title}>Sign In</h1>
        </div>

        <label className={styles.signIn__label}>
          Email address
          <input
            name="email"
            className={styles.signIn__input}
            type="text"
            placeholder="Email"
            {...register('email', {
              required: 'This input is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errorHandler('email', errors)}
        </label>

        <label className={styles.signIn__label}>
          Password
          <input
            name="password"
            className={styles.signIn__input}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'This input is required.',
              maxLength: {
                value: 40,
                message: 'You can use a maximum of 40 characters ',
              },
              minLength: {
                value: 6,
                message: 'You can use a minimum of 6 characters ',
              },
            })}
          />
          {errorHandler('password', errors)}
          {userError ? <p>email or password {userError['email or password']}</p> : null}
        </label>

        <button type="submit" className={styles.signIn__submit}>
          Login
        </button>

        <div className={styles.account__wrapper}>
          <span className={styles.account}>
            Don’t have an account?
            <Link to="/signup"> Sign Up.</Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default SignIn
