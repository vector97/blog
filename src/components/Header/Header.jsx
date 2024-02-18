import styles from './Header.module.scss'

import userAvatar from '../../assets/avatar.svg'
import { logOut } from '../../store/slices/userSlice'
import { fetchArticles } from '../../store/thunks/articlesThunk'

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
    navigate('/')
  }

  return (
    <div className={styles.header__wrapper}>
      <Link to="/">
        <h6 className={styles.header__heading}>Realworld Blog</h6>
      </Link>

      {user ? (
        <div className={styles.auth}>
          <Link to="/new-article">
            <Button className={styles.createArticle} type="button">
              Create article
            </Button>
          </Link>

          <div className={styles.auth__user}>
            <Link to="/profile">
              <h6 className={styles.auth__userName}>{user.username}</h6>
            </Link>

            <Link to="/profile">
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
          <Link to="signIn">
            <Button type="button" className={styles.header__btn}>
              Sign In
            </Button>
          </Link>

          <Link to="signUp">
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
