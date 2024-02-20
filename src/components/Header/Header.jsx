import styles from './Header.module.scss'

import userAvatar from '../../assets/avatar.svg'
import { logOut } from '../../store/slices/userSlice'
import { fetchArticles } from '../../store/thunks/articlesThunk'
import { PATHS } from '../App'

import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  const logOutHandler = () => {
    localStorage.removeItem('user')
    dispatch(logOut())
    dispatch(fetchArticles({ offset: 0 }))
    navigate(PATHS.HOME)
  }

  return (
    <div className={styles.header__wrapper}>
      <Link to={PATHS.HOME}>
        <p className={styles.header__heading}>Realworld Blog</p>
      </Link>

      {user ? (
        <div className={styles.auth}>
          <Link to={PATHS.NEW_ARTICLE}>
            <Button className={styles.createArticle} type="button">
              Create article
            </Button>
          </Link>

          <div className={styles.auth__user}>
            <Link to={PATHS.PROFILE}>
              <p className={styles.auth__userName}>{user.username}</p>
            </Link>

            <Link to={PATHS.PROFILE}>
              <div className={styles.auth__avatar}>
                <img src={user.image ? user.image : userAvatar} alt="user avatar" />
              </div>
            </Link>
          </div>

          <Button
            type="button"
            className={`${styles.header__btn} ${styles.header__btn_logOut}`}
            onClick={() => logOutHandler()}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div className="no-auth">
          <Link to={PATHS.SIGN_IN}>
            <Button type="button" className={styles.header__btn}>
              Sign In
            </Button>
          </Link>

          <Link to={PATHS.SIGN_UP}>
            <Button type="button" className={`${styles.header__btn} ${styles.header__btn_success}`}>
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
