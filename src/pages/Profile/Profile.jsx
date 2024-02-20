import styles from './Profile.module.scss'

import { errorHandler } from '../../helpers/errorHandler'
import { getChangedData } from '../../helpers/getChangedData'
import { updateUser } from '../../store/thunks/authThunk'

import { message } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {
  const dispatch = useDispatch()
  const { userError, user, userLoading } = useSelector((state) => state.user)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: 'all',
  })
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (userLoading === 'succeeded') {
      messageApi.open({
        type: 'success',
        content: 'Your profile has been updated',
      })
    }
  }, [userLoading, messageApi])

  const onSubmit = (data) => {
    const changedData = getChangedData(data, user)
    const updatedUser = JSON.stringify({ user: changedData })
    dispatch(
      updateUser({
        updatedUser,
        token: user.token,
      })
    )
  }

  return user ? (
    <>
      {contextHolder}
      <div className={styles.profile__wrapper}>
        <form className={styles.profile} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.profile__title__wrapper}>
            <h1 className={styles.profile__title}>Edit Profile</h1>
          </div>

          <label className={styles.profile__label}>
            Username
            <input
              name="username"
              className={styles.profile__input}
              type="text"
              defaultValue={user.username}
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
            {userError ? <p>{userError.username}</p> : null}
          </label>

          <label className={styles.profile__label}>
            Email address
            <input
              name="email"
              className={styles.profile__input}
              type="text"
              placeholder="Email"
              defaultValue={user.email}
              {...register('email', {
                required: 'This input is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errorHandler('email', errors)}
            {userError ? <p>{userError.email}</p> : null}
          </label>

          <label className={styles.profile__label}>
            New password
            <input
              name="password"
              className={styles.profile__input}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: false,
                maxLength: {
                  value: 40,
                  message: 'maximum 40 charcters ',
                },
                minLength: {
                  value: 6,
                  message: 'You can use a minimum of 6 characters',
                },
              })}
            />
            {errorHandler('password', errors)}
            {userError ? <p>{userError.password}</p> : null}
          </label>

          <label className={styles.profile__label}>
            Avatar image (url)
            <input
              name="image"
              className={styles.profile__input}
              type="text"
              placeholder=" Avatar image"
              defaultValue={user.image ? user.image : ''}
              {...register('image', {
                required: false,
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: 'Please enter a valid url address',
                },
              })}
            />
            {errorHandler('image', errors)}
          </label>

          <button className={styles.profile__submit} type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  ) : null
}

export default Profile
