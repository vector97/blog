import styles from './SignUp.module.scss'

import { PATHS } from '../../components/App'
import { errorHandler } from '../../helpers/errorHandler'
import { setNewUser } from '../../store/thunks/authThunk'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function SignUp() {
  const dispatch = useDispatch()
  const userError = useSelector((state) => state.user.userError)
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || -1
  const {
    register,
    watch,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  })

  const onSubmit = (data) => {
    const { username, email, password } = data
    const newUser = JSON.stringify({ user: { username, email, password } })
    dispatch(setNewUser({ newUser, cb: () => navigate(from, { replace: true }) }))
  }

  return (
    <div className={styles.signUp__wrapper}>
      <form className={styles.signUp} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.signUp__title__wrapper}>
          <h1 className={styles.signUp__title}>Create new account</h1>
        </div>

        <label className={styles.signUp__label}>
          Username
          <input
            name="username"
            className={styles.signUp__input}
            type="text"
            placeholder="User name"
            {...register('username', {
              required: 'This input is required.',
              maxLength: {
                value: 20,
                message: 'You can use a maximum of 20 characters',
              },
              minLength: {
                value: 3,
                message: 'You can use a minimum of 3 characters',
              },
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
            })}
          />
          {errorHandler('username', errors)}
          {userError ? (
            <p>
              {userError.username ? getValues('username') : null} {userError.username}
            </p>
          ) : null}
        </label>

        <label className={styles.signUp__label}>
          Email address
          <input
            name="email"
            className={styles.signUp__input}
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
          {userError ? (
            <p>
              {userError.email ? getValues('email') : null} {userError.email}
            </p>
          ) : null}
        </label>

        <label className={styles.signUp__label}>
          Password
          <input
            name="password"
            className={styles.signUp__input}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'This input is required.',
              maxLength: {
                value: 40,
                message: 'You can use a maximum of 40 characters',
              },
              minLength: {
                value: 6,
                message: 'You can use a minimum of 6 characters',
              },
            })}
          />
          {errorHandler('password', errors)}
        </label>

        <label className={styles.signUp__label}>
          Repeat password
          <input
            name="repeatPassword"
            className={styles.signUp__input}
            type="password"
            placeholder="Repeat password"
            {...register('repeatPassword', {
              required: 'This input is required.',
              validate: (val) => {
                if (watch('password') !== val) {
                  return "Your passwords don't match"
                }
                return null
              },
            })}
          />
          {errorHandler('repeatPassword', errors)}
        </label>

        <label className={styles.signUp__agree__label}>
          <input
            name="agree"
            className={styles.signUp__agree}
            type="checkbox"
            {...register('agree', {
              required: 'This input is required.',
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errorHandler('agree', errors)}

        <button className={styles.signUp__submit} type="submit">
          Create
        </button>

        <div className={styles.account__wrapper}>
          <span className={styles.account}>
            Already have an account?
            <Link to={PATHS.SIGN_IN}> Sign In.</Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default SignUp
